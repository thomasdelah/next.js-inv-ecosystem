import NextIntlProvider from "./NextIntlProvider";
import QueryProvider from "./QueryProvider";

export default function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <NextIntlProvider>
        {children}
      </NextIntlProvider>
    </QueryProvider>
  )
}
