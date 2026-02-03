"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900"
    >
      <FaGlobe className="text-gray-500" />
      <span>{locale === "en" ? "العربية" : "English"}</span>
    </button>
  );
}
