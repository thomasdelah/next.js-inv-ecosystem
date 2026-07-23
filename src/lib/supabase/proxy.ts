import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const updateSession = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Initialize Supabase
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    },
  );

  // Retrieve auth user data
  const { data: { user } } = await supabase.auth.getUser();
  const url = request.nextUrl.clone();

  // Define all accessible public routes
  const isPublicRoute =
    url.pathname.startsWith('/login') ||
    url.pathname.startsWith('/api/callback/auth');

  // Redirect to login when unauthenticated
  if (!user && !isPublicRoute) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard when logged in
  if (user && isPublicRoute) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
};
