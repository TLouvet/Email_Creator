import { describe, it, expect } from 'vitest';
import { getValueFromTranslationData } from '../../src/_i18n/utils';

describe('get value from translation data', () => {
  it('should return a value located at the first level of the data object', () => {
    const data = { key: 'value' };
    const key = 'key';
    expect(getValueFromTranslationData(data, key)).toBe('value');
  });

  it('should return the key if the value is not found', () => {
    const data = { key: 'value' };
    const key = 'notFound';
    expect(getValueFromTranslationData(data, key)).toBe('notFound');
  });

  it('should return the value of the key nested in the data object', () => {
    const data = { a: { b: { c: 'value' } } };
    const key = 'a.b.c';
    expect(getValueFromTranslationData(data, key)).toBe('value');
  });

  it('should return the key if the nested key is not found', () => {
    const data = { a: { b: { c: 'value' } } };
    const key = 'a.b.d';
    expect(getValueFromTranslationData(data, key)).toBe('a.b.d');
  });
});
