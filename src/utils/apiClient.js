import axios from "axios";

// Create a configured instance
const apiClient = axios.create({
  // Load base URL from environment variables or use a default
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://jsonplaceholder.typicode.com",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `[API] Sending ${config.method.toUpperCase()} request to ${config.url}`,
    );
    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor (Optional: global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[API] Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default apiClient;
