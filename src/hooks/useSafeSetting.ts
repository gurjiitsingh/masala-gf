import { useMemo } from "react";
import { UseSiteContext } from "@/SiteContext/SiteContext";
import { TEXT } from "@/config/languages";

// Dynamically infer all keys in TEXT
type SafeSettingKey = keyof typeof TEXT;

export function useSafeSetting<K extends SafeSettingKey>(key: K): typeof TEXT[K] {
  const { settings } = UseSiteContext();

  return useMemo(() => {
    const value = settings?.[key];
    const fallback = TEXT[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value as typeof TEXT[K];
    }

    return (value ?? fallback) as typeof TEXT[K];
  }, [settings, key]);
}
