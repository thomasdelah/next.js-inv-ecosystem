import LogoutButton from "@/lib/auth/ui/LogoutButton";
import routes from "@/lib/navigation/domain/routes";
import { redirect } from "next/navigation";

export default function HomePage() {
  // Create landing page on the HomePage

  return redirect(routes.ProfilePage());
}
