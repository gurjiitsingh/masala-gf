import * as en from '@/config/languages/en';
import * as de from '@/config/languages/de';
import * as pb from '@/config/languages/pb';
import * as fr from '@/config/languages/fr';
import * as hi from '@/config/languages/hi';

export const languages = { en, de, pb, fr, hi };
export type LangKey = keyof typeof languages;

// Default language
export const DEFAULT_LANGUAGE: LangKey =
  (process.env.NEXT_PUBLIC_LANGUAGE as LangKey) || 'en';

// Available language list from env
export const AVAILABLE_LANGUAGES: LangKey[] = (
  process.env.NEXT_PUBLIC_AVAILABLE_LANGUAGES?.split(',') as LangKey[]
)?.filter((key) => key in languages) || (['en'] as LangKey[]);
