/**
 * Allows to chain functions and pass the result of the previous function as an argument to the next one.
 * Takes an array of functions and returns an object with a `withInitialArgs` method that takes the initial arguments.
 * @example
 * ```ts
 * function addOne(x: number) {
 *  return x + 1;
 * }
 * function multiplyByTwo(x: number) {
 * return x * 2;
 * }
 *
 * const result = chain(addOne, multiplyByTwo).withInitialArgs(1); // 4 -> (1 + 1) * 2
 * ```
 * In the example above, the `addOne` function is called with the initial argument `1`, then the result is passed to the `multiplyByTwo` function.
 *
 * Note to self, feeling like a genius.
 * Note to self bis, documenting because I'll definitely forget how to use my own code.
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function chain(...fns: Function[]) {
  return {
    withInitialArgs: (...initialArgs: unknown[]) => {
      return fns.reduce((result, fn, index) => {
        // Use initialArgs as arguments for the first function
        if (index === 0) {
          return fn(...result);
        }

        // Use the result of the previous function as arguments for the next one
        return fn(result);
      }, initialArgs);
    },
  };
}
