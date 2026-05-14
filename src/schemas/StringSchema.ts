import type {
	CheckFn,
	CheckFnReturnType,
	Params,
	ValidateFnReturnType,
} from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class StringSchema extends BasePrimitiveSchema {
	protected type: string = 'string';
	protected checks: Array<CheckFn> = [];

	protected override validateType(data: any): CheckFnReturnType {
		return super.validateType(data);
	}

	minLength(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.length >= val || {
					rule: 'min',
					message:
						customMessage ??
						`length of "${data}"(${data.length}) is smaller than required ${val} length`,
					code: customCode ?? 'TOO_SHORT',
					meta: {
						expected: `min length of ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}
	maxLength(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.length <= val || {
					rule: 'max',
					message:
						customMessage ??
						`length of "${data}"(${data.length}) is bigger than required ${val} length`,
					code: customCode ?? 'TOO_LONG',
					meta: {
						expected: `max length of ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}
	length(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.length === val || {
					rule: 'length',
					message: customMessage ?? `length of ${data} is not equal to ${val}`,
					code: customCode ?? 'NOT_EQUAL_LENGTH',
					meta: {
						expected: `same length ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}
	startsWith(prefix: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.startsWith(prefix) || {
					rule: 'startsWith',
					message: customMessage ?? `${data} is not starting with ${prefix}`,
					code: customCode ?? 'NOT_STARTS_WITH',
					meta: {
						expected: `start with ${prefix}`,
						received: data,
					},
				},
		);

		return this;
	}
	endsWith(suffix: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.endsWith(suffix) || {
					rule: 'endsWith',
					message: customMessage ?? `${data} is not ending with ${suffix}`,
					code: customCode ?? 'NOT_ENDS_WITH',
					meta: {
						expected: `end with ${suffix}`,
						received: data,
					},
				},
		);

		return this;
	}
	includes(substring: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.includes(substring) || {
					rule: 'includes',
					message: customMessage ?? `${data} is not including ${substring}`,
					code: customCode ?? 'NOT_INCLUDE',
					meta: {
						expected: `${data} includes ${substring}`,
						received: data,
					},
				},
		);

		return this;
	}
	uppercase(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.split('').every((char: string) => char === char.toUpperCase()) || {
					rule: 'includes',
					message:
						customMessage ?? `Not all characters of ${data} are uppercase`,
					code: customCode ?? 'NOT_ALL_UPPERCASE',
					meta: {
						expected: `all uppercase`,
						received: data,
					},
				},
		);

		return this;
	}
	lowercase(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.split('').every((char: string) => char === char.toLowerCase()) || {
					rule: 'includes',
					message:
						customMessage ?? `Not all characters of ${data} are lowercase`,
					code: customCode ?? 'NOT_ALL_LOWERCASE',
					meta: {
						expected: `all lowercase`,
						received: data,
					},
				},
		);

		return this;
	}
	alphabets(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				/^\p{L}+$/u.test(data) || {
					rule: 'alphabets',
					message:
						customMessage ?? `Not all characters of ${data} are alphabets`,
					code: customCode ?? 'NOT_ALL_ALPHABETS',
					meta: {
						expected: `all alphabets`,
						received: data,
					},
				},
		);

		return this;
	}
	numbers(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				/^-?\d+(\.\d+)?$/.test(data) || {
					rule: 'numbers',
					message: customMessage ?? `Not all characters of ${data} are numbers`,
					code: customCode ?? 'NOT_ALL_NUMBERS',
					meta: {
						expected: `all numbers`,
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

export { StringSchema };
