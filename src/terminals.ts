import { Transform, UnknownTransformSpec } from "./transform";

// TODO: implement bigint and symbol

const boolean: Transform<unknown, boolean, boolean> = (input) => {
  if (typeof input === "boolean") {
    return input;
  }
  throw new Error("Not a boolean");
};

const number: Transform<unknown, number, number> = (input) => {
  if (typeof input === "number") {
    return input;
  }
  throw new Error("Not a number");
};

const string: Transform<unknown, string, string> = (input) => {
  if (typeof input === "string") {
    return input;
  }
  throw new Error("Not a string");
};

function identity<T>(input: T): T {
  return input;
}

const placeholder: UnknownTransformSpec = (_input) => {
  throw new Error("Placeholder not replaced");
};

const remove: Transform<unknown, undefined> = (_input) => undefined;

const unknown: Transform<unknown, unknown> = (input) => input;

export { boolean, identity, number, placeholder, remove, string, unknown };
