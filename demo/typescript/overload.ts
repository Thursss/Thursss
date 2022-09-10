function overload(params: string, b: boolean): string;
function overload(params: number): number;
function overload(
  params: string | number,
  b?: boolean
): string | number | undefined {
  if (typeof params === "string") return "params";
  if (typeof params === "number") return 11;
  return 1;
}

const a = overload('1', true);
