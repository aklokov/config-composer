export function isConstant(value: any): boolean {
  return value === true || value === false
    || value === null || value === undefined
    || typeof value === "number";
}

export function isString(value: any): boolean {
  return typeof value === "string";
}

export function isConditional(value: any): boolean {
  return isConstant(value) || isString(value);
}
