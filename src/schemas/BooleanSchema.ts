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
		if (Number.isNaN(data)) {
			return {
				rule: 'type',
				code: 'INVALID_TYPE',
				message: `(${data}) is not a ${this.type}`,
				meta: { expected: this.type, received: typeof data },
			};
		}

		return super.validateType(data);
	}

	override validate(data: any): PrimitiveValidateFnReturnType {
		return super.validate(data);
	}
}

export { BooleanSchema };
