// Helper to load messages for a specific locale
export async function getMessages(locale) {
  try {
    if (locale === "ar") {
      return {
        common: (await import("@/messages/ar/common.json")).default,
      };
    }
    // Default to English
    return {
      common: (await import("@/messages/en/common.json")).default,
    };
  } catch (error) {
    console.error("Error loading messages:", error);
    return {
      common: (await import("@/messages/en/common.json")).default,
    };
  }
}
