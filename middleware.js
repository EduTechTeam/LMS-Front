// middleware.js
import createMiddleware from "next-intl/middleware";

// Inline constants to avoid Edge Runtime path resolution issues on Vercel
const locales = ["en", "ar"];
const defaultLocale = "en";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
