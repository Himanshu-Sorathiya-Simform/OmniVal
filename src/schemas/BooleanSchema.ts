import type {
	CheckFn,
	CheckFnReturnType,
	Params,
	PrimitiveValidateFnReturnType,
} from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class BooleanSchema extends BasePrimitiveSchema {
	protected type: string = 'boolean';

	constructor(checks?: Array<CheckFn>, params?: Params) {
		super(checks, params);
	}

	protected override clone(checks: Array<CheckFn>, params?: Params): this {
		return new BooleanSchema(checks, params) as this;
	}

	protected override validateType(data: any): CheckFnReturnType {
		return super.validateType(data);
	}

	override validate(data: any): PrimitiveValidateFnReturnType {
		return super.validate(data);
	}
}

export { BooleanSchema };
