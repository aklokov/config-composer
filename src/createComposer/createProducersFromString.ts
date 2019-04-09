import { IValueProducer } from "../interfaces";
import { regexToArray } from "@vlr/array-tools";
import { createParameters } from "./createParameters";
import { StringProducer, PropertyGetProducer, MethodCallProducer } from "../composers/value-composer";

const fullRegex = /\$\{.*?\)\}/g;

export function createProducersFromString(src: string): IValueProducer[] {
  const matches = regexToArray(fullRegex, src);
  const result = [];
  let currentIndex = 0;
  for (let match of matches) {
    const matchText = match[0];
    const matchIndex = src.indexOf(matchText, currentIndex);
    const constant = src.substr(currentIndex, matchIndex - currentIndex);
    if (constant.length) {
      result.push(new StringProducer(constant));
    }
    result.push(createFunctionProducer(matchText));
    currentIndex = matchIndex + matchText.length;
  }
  const constant = src.substr(currentIndex);
  if (constant.length) {
    result.push(new StringProducer(constant));
  }

  return result;
}

const partsRegex = /([^\{\(]*)\((.*)\)/;

function createFunctionProducer(src: string): IValueProducer {
  const match = partsRegex.exec(src);
  if (!match) {
    return new PropertyGetProducer(src.substr(2, src.length - 3));
  }

  return new MethodCallProducer(match[1], createParameters(match[2]));
}
