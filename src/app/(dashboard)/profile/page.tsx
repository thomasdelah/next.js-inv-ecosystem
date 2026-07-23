import { Metadata } from "next";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Profile",
  description: "",
};

export default function ProfilePage() {
  const t = useTranslations("Profile");

  return (
    <main className="flex flex-col items-center h-full p-3">
      <h1>{t("header")}</h1>
    </main>
  )
}
