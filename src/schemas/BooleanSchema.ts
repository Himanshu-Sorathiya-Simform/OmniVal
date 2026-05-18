import type {
	CheckFn,
	CheckFnReturnType,
	PrimitiveValidateFnReturnType,
} from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class BooleanSchema extends BasePrimitiveSchema {
	protected type: string = 'boolean';
	protected checks: Array<CheckFn> = [];

	protected override validateType(data: any): CheckFnReturnType {
		return super.validateType(data);
	}

	override validate(data: any): PrimitiveValidateFnReturnType {
		return super.validate(data);
	}
}

export { BooleanSchema };
