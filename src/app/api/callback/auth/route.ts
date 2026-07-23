import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');

  // Haal de 'next' parameter op (bijv. /profile), of gebruik '/' als fallback
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Wissel de tijdelijke code in voor een echte sessie (en zet HTTP-only cookies)
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Stuur de gebruiker door naar het opgegeven 'next' pad (bijv. /profile)
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Als er iets misging of er geen code was, stuur door naar een foutpagina of login
  return NextResponse.redirect(`${origin}/login?error=Could not authenticate user`);
}
