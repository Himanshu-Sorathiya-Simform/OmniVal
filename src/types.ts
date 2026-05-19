import type { BooleanSchema } from './schemas/BooleanSchema.js';
import type { NumberSchema } from './schemas/NumberSchema.js';
import type { ObjectSchema } from './schemas/ObjectSchema.js';
import type { StringSchema } from './schemas/StringSchema.js';

type ObjectShape = Record<
	string,
	StringSchema | BooleanSchema | NumberSchema | ObjectSchema
>;

interface PrimitiveErrorObject {
	rule: string;
	message: string;
	code: string;
	meta: object;
}

interface NonPrimitiveErrorObject extends PrimitiveErrorObject {
	path?: string;
}

type PrimitiveValidateFnReturnType =
	| {
			isValid: true;
			data: any;
			errors?: never;
	  }
	| {
			isValid: false;
			errors: PrimitiveErrorObject[];
			data?: never;
	  };

type NonPrimitiveValidateFnReturnType =
	| {
			isValid: true;
			data: any;
			errors?: never;
	  }
	| {
			isValid: false;
			errors: NonPrimitiveErrorObject[];
			data?: never;
	  };

type CheckFnReturnType = true | NonPrimitiveErrorObject;

type CheckFn = (...args: any[]) => CheckFnReturnType;

type Params = string | Partial<Pick<PrimitiveErrorObject, 'code' | 'message'>>;

export type {
	CheckFn,
	CheckFnReturnType,
	NonPrimitiveErrorObject,
	NonPrimitiveValidateFnReturnType,
	ObjectShape,
	Params,
	PrimitiveErrorObject,
	PrimitiveValidateFnReturnType,
};
