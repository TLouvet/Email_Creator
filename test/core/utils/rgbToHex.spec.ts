import { describe, it, expect } from 'vitest';
import { rgbToHex } from '../../../src/_core/utils/rgbToHex';

describe('rgbToHex', () => {
  it('should convert white rgb to hex', () => {
    const white = rgbToHex('rgb(255, 255, 255)');
    expect(white).toBe('#FFFFFF');
  });

  it('should convert black rgb to hex', () => {
    const black = rgbToHex('rgb(0, 0, 0)');
    expect(black).toBe('#000000');
  });

  it('should convert red rgb to hex', () => {
    const red = rgbToHex('rgb(255, 0, 0)');
    expect(red).toBe('#FF0000');
  });

  it('should convert rgba to hex', () => {
    const white = rgbToHex('rgba(255, 255, 255, 1)');
    expect(white).toBe('#FFFFFF');
  });

  it('should return original value if not rgb', () => {
    const value = rgbToHex('not rgb');
    expect(value).toBe('not rgb');
  });

  it('should return original value if not rgba', () => {
    const value = rgbToHex('not rgba');
    expect(value).toBe('not rgba');
  });
});
