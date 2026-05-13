import type { Check, ReturnType, ValidateReturnType } from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class StringSchema extends BasePrimitiveSchema {
	protected type: string = 'string';
	protected checks: Array<Check> = [];

	protected override validateType(data: any): ReturnType {
		return super.validateType(data);
	}

	min(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data.length >= val || {
					rule: 'min',
					message: `length of ${data} is smaller than required ${val} length`,
					code: 'TOO_SHORT',
					meta: {
						expected: `min length of ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}
	max(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data.length <= val || {
					rule: 'max',
					message: `length of ${data} is bigger than required ${val} length`,
					code: 'TOO_LONG',
					meta: {
						expected: `max length of ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}

	override validate(data: any): ValidateReturnType {
		return super.validate(data);
	}
}

export { StringSchema };
