'use client'

import { Button } from "@/lib/components/ui/button"
import useAuthViewModel from "./AuthViewModel"

export default function LogoutButton() {
  const viewModel = useAuthViewModel()
  return (
    <Button onClick={viewModel.onLogout} variant='outline'>
      <span className="text-xs">Sign Out</span>
    </Button>
  )
}
