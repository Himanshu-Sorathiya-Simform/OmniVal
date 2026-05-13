import type { Check, ReturnType, ValidateReturnType } from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class StringSchema extends BasePrimitiveSchema {
	private type: string = 'string';
	private checks: Array<Check> = [];

	override validateType(data: any): ReturnType {
		return super.validateType(this.type, data);
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
		return super.validate(this.checks, data);
	}
}

export { StringSchema };
