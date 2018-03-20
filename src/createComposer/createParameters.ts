export function createParameters(src: string): any[] {
  const split = src.replace(/\"/g, "\"").split(",");
  const normalized = normalizeParameters(split);
  return normalized.map(parm => createParameter(parm));
}

function createParameter(src: string): any {
  if (src.startsWith("'")) {
    return src.substr(1, src.length - 2);
  }
  switch (src) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
    default:
      return +src;
  }
}

function normalizeParameters(split: string[]): string[] {
  const result = [];
  let cur = "";
  for (let parm of split) {
    cur += parm;
    if (cur.startsWith("\"") && !cur.endsWith("\"")) {
      continue;
    }
    result.push(cur);
    cur = "";
  }

  return result;
}
