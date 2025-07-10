import * as en from './en';
import * as de from './de';

const LANG = process.env.NEXT_PUBLIC_LANGUAGE || 'de';

const languages = { en, de };

export const TEXT = languages[LANG as keyof typeof languages].TEXT;
export const SEO = languages[LANG as keyof typeof languages].SEO;
