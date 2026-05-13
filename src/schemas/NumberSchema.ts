import type { CheckFn, CheckFnReturnType, ValidateFnReturnType } from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class NumberSchema extends BasePrimitiveSchema {
	protected type: string = 'number';
	protected checks: Array<CheckFn> = [];

	override validateType(data: any): CheckFnReturnType {
		return super.validateType(data);
	}

	min(val: number) {
		this.checks.push(
			(data: any): CheckFnReturnType =>
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
			(data: any): CheckFnReturnType =>
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
			(data: any): CheckFnReturnType =>
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
			(data: any): CheckFnReturnType =>
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

	override validate(data: any): ValidateFnReturnType {
		return super.validate(data);
	}
}

export { NumberSchema };
