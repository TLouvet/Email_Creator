import { describe, expect, it } from 'vitest';
import { chain } from '../../../src/_core/utils/chain';

describe('chain', () => {
  it('should chain functions', () => {
    function addOne(x: number) {
      return x + 1;
    }
    function multiplyByTwo(x: number) {
      return x * 2;
    }

    const result = chain(addOne, multiplyByTwo).withInitialArgs(1);
    expect(result).toBe(4);
  });

  it('should chain functions with multiple arguments', () => {
    function add(x: number, y: number) {
      return x + y;
    }

    function multiplyBy2(numberToMultiply: number) {
      return numberToMultiply * 2;
    }

    const result = chain(add, multiplyBy2).withInitialArgs(1, 2);
    expect(result).toBe(6);
  });
});
