import { getRequestConfig } from "next-intl/server";
import { LOCALES, DEFAULT_LOCALE } from "../constants/locales";

export default getRequestConfig(async ({ requestLocale }) => {
  // In next-intl v4, requestLocale is a Promise
  let locale = await requestLocale;

  if (!locale || !LOCALES.includes(locale)) {
    locale = DEFAULT_LOCALE;
  }

  return {
    locale,
    messages: {
      common: (await import(`../messages/${locale}/common.json`)).default,
      auth: (await import(`../messages/${locale}/auth.json`)).default,
      student: (await import(`../messages/${locale}/student.json`)).default,
      instructor: (await import(`../messages/${locale}/instructor.json`))
        .default,
      admin: (await import(`../messages/${locale}/admin.json`)).default,
    },
  };
});
