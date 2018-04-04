import { isConstant, isString, isConditional } from "./typeChecks";
import { ConstantComposer } from "../composers/constant-composer";
import { ArrayComposer } from "../composers/array-composer";
import { ValueComposer } from "../composers/value-composer";
import { ObjectComposer, FieldComposer } from "../composers/object-composer";
import { createProducersFromString } from "./createProducersFromString";
import { IMap, keys, get } from "@vlr/map-tools/objectMap";
import { IComposer } from "..";

export function createComposer(config: any): IComposer {
    if (isConstant(config)) {
        return new ConstantComposer(config);
    }

    if (Array.isArray(config)) {
        const array = config as any[];
        const children = array.map(item => createComposer(item));
        return new ArrayComposer(children);
    }

    if (isString(config)) {
        return new ValueComposer(createProducersFromString(config));
    }

    return new ObjectComposer(createObjectFieldComposers(config));
}

function createObjectFieldComposers(config: IMap<any>): IComposer[] {
    const fields = keys(config);
    return fields.map(field => createFieldComposer(config, field));
}

function createFieldComposer(config: IMap<any>, field: string): IComposer {
    const fieldVal = get(config, field);
    return new FieldComposer(field, createComposer(fieldVal), isConditional(fieldVal));
}



