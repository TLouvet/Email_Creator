import { AnyRecord } from '@app/_core/types';
import { locales } from './Locales';

export function isAcceptedLocale(locale: string): boolean {
  return locales.has(locale);
}

/**
 * Look for the locale in local storage, then in navigator, then return the default one if none found
 * If the default one is not in the accepted Locales, the "en" locale is returned and the app prints in english
 */
export function getLocale(defaultLang: string, localeStorageKey = 'locale'): string {
  // First local storage
  const locale = localStorage.getItem(localeStorageKey);
  if (locale && isAcceptedLocale(locale)) {
    return locale;
  }

  // then navigator
  const navigatorLocale = navigator.language.split('-')[0];
  if (isAcceptedLocale(navigatorLocale)) {
    return navigatorLocale;
  }

  // then default
  if (isAcceptedLocale(defaultLang)) {
    return defaultLang;
  }

  return 'en';
}

/**
 * Accepts a key formed such as "a.b.c" and returns the value of the key in the data object
 * admitting that the data object is a nested object with the keys a, b and c
 * @example getValueFromTranslationData({ a: { b: { c: 'value' } } }, 'a.b.c') // returns 'value'
 * @example getValueFromTranslationData({ a: { b: { c: 'value' } } }, 'a.b.d') // returns 'a.b.d'
 * @example getValueFromTranslationData({ a: { b: { c: 'value' } } }, 'a.b') // returns 'a.b'
 */
export function getValueFromTranslationData(data: AnyRecord, key: string): string {
  if (!data) {
    return key;
  }

  const value = parseKey(key).reduce<AnyRecord | string>((acc, val) => {
    // If we have a string, it's that either the value was found or we have a key that does not exist
    if (isString(acc)) {
      return acc;
    }

    // If at some point the key does not exists, we return the key so that we can see it in the UI
    if (!acc[val]) {
      return key;
    }

    // If we still have an object, we keep digging
    return acc[val] as AnyRecord;
  }, data);

  if (typeof value === 'string') {
    return value;
  }

  return key;
}

function parseKey(key: string): string[] {
  return key.split('.');
}

function isString(value: unknown): value is string {
  return typeof value === 'string';
}
