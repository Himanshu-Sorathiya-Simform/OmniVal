import { NumberSchema } from './schemas/NumberSchema.js';
import { StringSchema } from './schemas/StringSchema.js';

const v = {
	string: () => new StringSchema(),
	number: () => new NumberSchema(),
};

export { v };
