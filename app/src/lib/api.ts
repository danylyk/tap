import ky from "ky";
import qs from "qs";

export const api = {
  async get<T>({url, query}: {url: string; query?: Record<string, unknown>}) {
    const response = await ky<T>(
      `https://content.combostreak.com/tap/${url}${qs.stringify(query, {
        addQueryPrefix: true,
      })}`,
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  },
};
