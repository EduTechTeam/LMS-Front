// middleware.js
import createMiddleware from "next-intl/middleware";

// Inline constants to avoid Edge Runtime path resolution issues on Vercel
const LOCALES = ["en", "ar"];
const DEFAULT_LOCALE = "en";

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // لو root "/", اعمل redirect مباشر للـ default locale
  if (pathname === "/") {
    return new Response(null, {
      status: 307,
      headers: { Location: `/${DEFAULT_LOCALE}` },
    });
  }

  // أي URL تاني يمر على next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/:locale(en|ar)/:path*"],
};
