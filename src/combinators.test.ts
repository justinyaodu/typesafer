import { optional, pipe, union, withPredicates } from "./combinators";
import { boolean, number, string } from "./terminals";
import { Transform } from "./transform";
import { Assert, Equivalent } from "./type-assert";

test("optional number", () => {
  const optionalNumber = optional(number);
  expect(optionalNumber(7)).toEqual(7);
  expect(optionalNumber(undefined)).toEqual(undefined);
  expect(() => optionalNumber(null)).toThrow();
});

test("pipe 2", () => {
  const isLongString = pipe(string, (s) => s.length > 3);
  type _ = Assert<
    Equivalent<typeof isLongString, Transform<unknown, boolean, string>>
  >;
  expect(isLongString("cool")).toBe(true);
  expect(isLongString("no")).toBe(false);
  expect(() => isLongString(7)).toThrow();
});

test("pipe 3", () => {
  const doublePlusTwo = pipe(
    (n: number) => n * 2,
    (n) => n + 1,
    (n) => n + 1
  );
  type _ = Assert<Equivalent<typeof doublePlusTwo, Transform<number, number>>>;
  expect(doublePlusTwo(3)).toEqual(8);
});

test("union of boolean and string", () => {
  const booleanOrString = union(boolean, string);
  type _ = Assert<
    Equivalent<
      typeof booleanOrString,
      Transform<unknown, string | boolean, string | boolean>
    >
  >;
  expect(booleanOrString(false)).toBe(false);
  expect(booleanOrString("apple")).toEqual("apple");
  expect(() => booleanOrString(7)).toThrow();
});

test("union of constant and function", () => {
  const subtractUnlessZero = union(0, (x: number) => x - 1);
  type _ = Assert<
    Equivalent<typeof subtractUnlessZero, Transform<number, number, number>>
  >;
  expect(subtractUnlessZero(0)).toEqual(0);
  expect(subtractUnlessZero(5)).toEqual(4);
});

test("withPredicates for object", () => {
  const adult = withPredicates({ age: number }, (p) => p.age >= 18);
  type _ = Assert<
    Equivalent<
      typeof adult,
      Transform<unknown, { age: number }, { age: number }>
    >
  >;
  expect(adult({ age: 18 })).toEqual({ age: 18 });
  expect(() => adult({ age: 5 })).toThrow();
});
