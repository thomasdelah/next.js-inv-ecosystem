import { z } from "zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createClient } from "@/lib/supabase/client";
import { loginFormSchema } from "../data/schemas";

export type AuthViewModel = ReturnType<typeof useAuthViewModel>;

export default function useAuthViewModel() {
  const supabase = createClient()
  const router = useRouter()

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
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL
      }
    })
    if (error) throw new Error(error.message)
  }

  // Logout
  const onLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw new Error(error.message)

    router.refresh()
  }

  return {
    register,
    handleSubmit,

    onLogin,
    onLogout,
  }
}
