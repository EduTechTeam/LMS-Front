import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "@/lib/getMessages";

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // تحميل الملف الصح حسب locale
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

