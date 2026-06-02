import { BooleanSchema } from './schemas/BooleanSchema.js';
import { NumberSchema } from './schemas/NumberSchema.js';
import { ObjectSchema } from './schemas/ObjectSchema.js';
import { StringSchema } from './schemas/StringSchema.js';
import type { Params } from './types.js';

const v = {
	string: (params?: Params) => new StringSchema([], params),
	number: (params?: Params) => new NumberSchema([], params),
	boolean: (params?: Params) => new BooleanSchema([], params),
	object: (shape: any) => new ObjectSchema(shape),
};

export { v };
