import { BooleanSchema } from './schemas/BooleanSchema.js';
import { NumberSchema } from './schemas/NumberSchema.js';
import { ObjectSchema } from './schemas/ObjectSchema.js';
import { StringSchema } from './schemas/StringSchema.js';

const v = {
	string: () => new StringSchema(),
	number: () => new NumberSchema(),
	boolean: () => new BooleanSchema(),
	object: (shape: any) => new ObjectSchema(shape),
};

export { v };
