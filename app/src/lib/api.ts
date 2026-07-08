import ky from "ky";
import qs from "qs";

export const resource = {
  async get<T>({path, query}: {path: string; query?: Record<string, unknown>}) {
    const response = await ky<T>(
      `https://content.combostreak.com/tap/${path}${qs.stringify(query, {
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

export const backend = {
  async get<T>({
    path,
    token,
    query,
  }: {
    path: string;
    token?: string;
    query?: Record<string, unknown>;
  }) {
    const response = await ky<T>(
      `${process.env.EXPO_PUBLIC_API_URL}/${path}${qs.stringify(query, {
        addQueryPrefix: true,
      })}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  },
  async post<T>({
    path,
    token,
    json,
  }: {
    path: string;
    token?: string;
    json?: Record<string, unknown>;
  }) {
    const response = await ky.post<T>(
      `${process.env.EXPO_PUBLIC_API_URL}/${path}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
        json,
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    return response.json();
  },
};
