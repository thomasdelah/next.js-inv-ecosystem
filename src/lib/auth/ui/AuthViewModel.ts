"use client";

import { useMemo } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/lib/supabase/client";
import { loginFormSchema } from "../data/authSchemas";

export type AuthViewModel = ReturnType<typeof useAuthViewModel>;

export default function useAuthViewModel() {
  const supabase = useMemo(() => createClient(), [])
  const router = useRouter()
  const queryClient = useQueryClient()

  // React Hook Form for login form
  const {
    register,
    handleSubmit
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: undefined,
    }
  })

  // Login with Magic Link
  const onLogin: SubmitHandler<{ email: string }> = async (data) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/callback/auth?next=/profile`
      }
    })
    if (error) throw new Error(error.message)

    // @todo: Add toast to notify user that message has been sent / update login form with email sent card
  }

  // Tanstack query to retrieve auth user
  const { data: user } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    },
  })

  // Logout
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)

    queryClient.setQueryData(["auth", "user"], null)
    router.refresh()
  }

  return {
    register,
    handleSubmit,

    onLogin,
    onLogout,

    user,
  }
}
