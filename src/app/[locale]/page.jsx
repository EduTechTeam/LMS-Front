"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function Home() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    // Replace the current locale in the pathname with the new one
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-zinc-900">
      {/* Language Toggle Button */}
      <button
        onClick={toggleLocale}
        className="absolute top-4 right-4 rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 dark:bg-zinc-700 dark:text-gray-200 dark:hover:bg-zinc-600"
      >
        {locale === "en" ? "العربية" : "English"}
      </button>

      <main className="flex max-w-4xl flex-col items-center gap-8">
        <div className="relative flex place-items-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
            {t("welcome_title")}
          </h1>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
          {t("welcome_desc")}
        </p>

        <div className="mt-6 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            {t("get_started")}
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100"
          >
            {t("learn_more")} <span aria-hidden="true">→</span>
          </a>
        </div>
      </main>
    </div>
  );
}
