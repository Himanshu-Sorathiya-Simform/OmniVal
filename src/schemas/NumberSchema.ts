import type { Check, ReturnType, ValidateReturnType } from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class NumberSchema extends BasePrimitiveSchema {
	private type: string = 'number';
	private checks: Array<Check> = [];

	override validateType(data: any): ReturnType {
		return super.validateType(this.type, data);
	}

	min(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data >= val || {
					rule: 'min',
					message: `${data} is smaller than ${val}`,
					code: 'TOO_SHORT',
					meta: {
						expected: `>= ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	max(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data <= val || {
					rule: 'max',
					message: `${data} is bigger than ${val}`,
					code: 'TOO_LONG',
					meta: {
						expected: `<= ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	positive() {
		this.checks.push(
			(data: any): ReturnType =>
				data > 0 || {
					rule: 'positive',
					message: `${data} is not positive`,
					code: 'NOT_POSITIVE',
					meta: {
						expected: `> 0`,
						received: data,
					},
				},
		);

		return this;
	}
	negative() {
		this.checks.push(
			(data: any): ReturnType =>
				data < 0 || {
					rule: 'negative',
					message: `${data} is not negative`,
					code: 'NOT_NEGATIVE',
					meta: {
						expected: `< 0`,
						received: data,
					},
				},
		);

		return this;
	}

	override validate(data: any): ValidateReturnType {
		return super.validate(this.checks, data);
	}
}

export { NumberSchema };
