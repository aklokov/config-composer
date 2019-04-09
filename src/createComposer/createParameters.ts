import { createComposer } from "./createComposer";

export function createParameters(src: string): any[] {
  let split = src.replace(/\"/g, "\"").split(",");

  let workingCopy = [],
     result = [],
     open = 0,
     close = 0;

  split.reverse().forEach( a => {
    open += occurrences(a, "(");
    close += occurrences(a, ")");
    workingCopy.push(a);
    if ( open === close ) {
      result.push(workingCopy.reverse().join());
      workingCopy = [];
    }
  });
  split = result.reverse().map(item => item.trim());

  const normalized = normalizeParameters(split);
  return normalized.map(parm => createParameter(parm));
}

function createParameter(src: string): any {
  if (src.startsWith("'")) {
    return src.substr(1, src.length - 2);
  }
  if (Number.isInteger(+src)) {
    return +src;
  }
  switch (src) {
    case "true":
      return true;
    case "false":
      return false;
    case "null":
      return null;
    default:
      return createComposer("${" + src + "}");
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

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 */
function occurrences(source: string, subString: string): number {

  source += "";
  subString += "";
  if (subString.length <= 0) {
    return (source.length + 1);
  }

  var n = 0,
      pos = 0,
      step = subString.length;

  while (true) {
      pos = source.indexOf(subString, pos);
      if (pos >= 0) {
          ++n;
          pos += step;
      } else {
        break;
      }
  }
  return n;
}
