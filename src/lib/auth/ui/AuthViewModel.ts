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

  // Login with Magic Link
  const {
    register,
    handleSubmit
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: undefined,
    }
  })

  const onLogin: SubmitHandler<{ email: string }> = async (data) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: data.email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/callback/auth?next=/profile`
      }
    })
    if (error) throw new Error(error.message)
  }

  const { data: user } = useQuery({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    },
  })

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
