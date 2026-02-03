import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";
import { getMessages } from "@/lib/getMessages";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // تحميل الملف الصح حسب locale
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={openSans.variable}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
