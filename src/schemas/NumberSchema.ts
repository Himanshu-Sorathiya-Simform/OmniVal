import type {
	CheckFn,
	CheckFnReturnType,
	Params,
	ValidateFnReturnType,
} from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class NumberSchema extends BasePrimitiveSchema {
	protected type: string = 'number';
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

	min(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data >= val || {
					rule: 'min',
					message: customMessage ?? `${data} is smaller than ${val}`,
					code: customCode ?? 'TOO_SHORT',
					meta: {
						expected: `>= ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	max(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data <= val || {
					rule: 'max',
					message: customMessage ?? `${data} is bigger than ${val}`,
					code: customCode ?? 'TOO_LONG',
					meta: {
						expected: `<= ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	equals(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data === val || {
					rule: 'equals',
					message: customMessage ?? `${data} is not equal to ${val}`,
					code: customCode ?? 'NOT_EQUAL',
					meta: {
						expected: `Equals to ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	positive(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data > 0 || {
					rule: 'positive',
					message: customMessage ?? `${data} is not a positive number`,
					code: customCode ?? 'NOT_POSITIVE',
					meta: {
						expected: `> 0`,
						received: data,
					},
				},
		);

		return this;
	}
	negative(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data < 0 || {
					rule: 'negative',
					message: customMessage ?? `${data} is not a negative number`,
					code: customCode ?? 'NOT_NEGATIVE',
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
