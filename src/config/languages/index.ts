import * as en from './en';
import * as de from './de';
import * as pb from './pb';
import * as fr from './fr';
import * as hi from './hi';
const LANG = process.env.NEXT_PUBLIC_LANGUAGE || 'de';

const languages = { en, de, pb, fr, hi };

export const TEXT = languages[LANG as keyof typeof languages].TEXT;
export const SEO = languages[LANG as keyof typeof languages].SEO;
