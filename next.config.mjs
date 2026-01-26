import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

const withNextIntl = createNextIntlPlugin("./src/lib/i18n.js");

export default withNextIntl(nextConfig);
