import { IComposerContext } from "./interfaces";
import { createComposer } from "./createComposer/createComposer";

export function compose<T = any>(existing: T, config: any, context: IComposerContext): T {
  const composer = createComposer(config);
  return composer.compose(existing, context);
}
