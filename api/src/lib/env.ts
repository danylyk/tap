export function getEnv(key: string): string;
export function getEnv(key: string, type: "string"): string;
export function getEnv(key: string, type: "number"): number;
export function getEnv(key: string, type: "boolean"): boolean;

export function getEnv(
  key: string,
  type: "string" | "number" | "boolean" = "string"
) {
  const value = process.env[key];

  if (value === undefined) {
    throw new Error(`Environment variable "${key}" is not defined.`);
  }

  if (type === "number") {
    const val = Number(value);

    if (isNaN(val)) {
      throw new Error(`Environment variable "${key}" is not a valid number.`);
    }

    return val;
  }

  if (type === "boolean") {
    if (value.toLowerCase() === "true") {
      return true;
    }

    if (value.toLowerCase() === "false") {
      return false;
    }

    throw new Error(`Environment variable "${key}" is not a valid boolean.`);
  }

  return value;
}
