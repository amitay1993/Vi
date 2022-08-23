import "dotenv/config";

export const apiService = {
  apiKeyName: process.env.API_KEY_NAME,
  apiKeyValue: process.env.API_KEY_VALUE,
  baseUrl: process.env.API_BASE_URL,
};
