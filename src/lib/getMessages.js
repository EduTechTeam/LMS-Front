// Helper to load messages for a specific locale
export async function getMessages(locale) {
  try {
    const validLocale = locale === "ar" ? "ar" : "en";

    return {
      common: (await import(`@/messages/${validLocale}/common.json`)).default,
      auth: (await import(`@/messages/${validLocale}/auth.json`)).default,
      student: (await import(`@/messages/${validLocale}/student.json`)).default,
      instructor: (await import(`@/messages/${validLocale}/instructor.json`))
        .default,
      admin: (await import(`@/messages/${validLocale}/admin.json`)).default,
    };
  } catch (error) {
    console.error("Error loading messages:", error);
    // Fallback to English common messages at minimum to prevent total crash
    return {
      common: (await import("@/messages/en/common.json")).default,
      auth: (await import("@/messages/en/auth.json")).default,
    };
  }
}
