import { createNavigation } from "next-intl/navigation";
import { LOCALES } from "./constants/locales";

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: LOCALES,
});
