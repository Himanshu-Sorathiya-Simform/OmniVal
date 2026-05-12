import { StringSchema } from './schemas/StringSchema.js';

const v = {
	string: () => new StringSchema(),
};

export { v };
