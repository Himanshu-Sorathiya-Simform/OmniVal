import type { BooleanSchema } from './schemas/BooleanSchema.js';
import type { NumberSchema } from './schemas/NumberSchema.js';
import type { ObjectSchema } from './schemas/ObjectSchema.js';
import type { StringSchema } from './schemas/StringSchema.js';

interface ObjectShape {
	[key: string]: StringSchema | BooleanSchema | NumberSchema | ObjectSchema;
}

interface PrimitiveErrorObject {
	rule: string;
	message: string;
	code: string;
	meta: object;
}

interface NonPrimitiveErrorObject {
	path: string;
	errors: PrimitiveErrorObject[] | NonPrimitiveErrorObject[];
}

type PrimitiveValidateFnReturnType =
	| {
			isValid: boolean;
			data: any;
			errors?: never;
	  }
	| {
			isValid: boolean;
			errors: PrimitiveErrorObject[];
			data?: never;
	  };

type NonPrimitiveValidateFnReturnType =
	| {
			isValid: boolean;
			data: any;
			errors?: never;
	  }
	| {
			isValid: boolean;
			errors: NonPrimitiveErrorObject[];
			data?: never;
	  };

type CheckFnReturnType = true | PrimitiveErrorObject;

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
