import { validateParameterType } from '../helpers/helpers.js';
import type {
	CheckFn,
	CheckFnReturnType,
	Params,
	PrimitiveValidateFnReturnType,
} from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class StringSchema extends BasePrimitiveSchema {
	protected type: string = 'string';

	constructor(checks?: Array<CheckFn>, params?: Params) {
		super(checks, params);
	}

	protected override validateType(data: any): CheckFnReturnType {
		return super.validateType(data);
	}

	protected override clone(checks: Array<CheckFn>, params?: Params): this {
		return new StringSchema(checks, params) as this;
	}

	minLength(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'minLength',
			passedValue: val,
			typeOfParameterRequired: 'number',
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data.length >= val || {
					rule: 'minLength',
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
	}
	maxLength(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'maxLength',
			passedValue: val,
			typeOfParameterRequired: 'number',
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data.length <= val || {
					rule: 'maxLength',
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
	}
	length(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'length',
			passedValue: val,
			typeOfParameterRequired: 'number',
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data.length === val || {
					rule: 'length',
					message:
						customMessage ??
						`length of "${data}"(${data.length}) is not equal to ${val}`,
					code: customCode ?? 'NOT_EQUAL_LENGTH',
					meta: {
						expected: `same length ${val}`,
						received: data.length,
					},
				},
		);
	}
	startsWith(prefix: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'startsWith',
			passedValue: prefix,
			typeOfParameterRequired: 'string',
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data.startsWith(prefix) || {
					rule: 'startsWith',
					message: customMessage ?? `"${data}" is not starting with ${prefix}`,
					code: customCode ?? 'NOT_START_WITH',
					meta: {
						expected: `start with ${prefix}`,
						received: data,
					},
				},
		);
	}
	endsWith(suffix: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'endsWith',
			passedValue: suffix,
			typeOfParameterRequired: 'string',
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data.endsWith(suffix) || {
					rule: 'endsWith',
					message: customMessage ?? `"${data}" is not ending with ${suffix}`,
					code: customCode ?? 'NOT_END_WITH',
					meta: {
						expected: `end with ${suffix}`,
						received: data,
					},
				},
		);
	}
	includes(substring: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'includes',
			passedValue: substring,
			typeOfParameterRequired: 'string',
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data.includes(substring) || {
					rule: 'includes',
					message: customMessage ?? `"${data}" is not including ${substring}`,
					code: customCode ?? 'NOT_INCLUDE',
					meta: {
						expected: `${data} includes ${substring}`,
						received: data,
					},
				},
		);
	}
	uppercase(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data === data.toUpperCase() || {
					rule: 'uppercase',
					message:
						customMessage ?? `Not all characters of "${data}" are uppercase`,
					code: customCode ?? 'NOT_ALL_UPPERCASE',
					meta: {
						expected: `all uppercase`,
						received: data,
					},
				},
		);
	}
	lowercase(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				data === data.toLowerCase() || {
					rule: 'lowercase',
					message:
						customMessage ?? `Not all characters of "${data}" are lowercase`,
					code: customCode ?? 'NOT_ALL_LOWERCASE',
					meta: {
						expected: `all lowercase`,
						received: data,
					},
				},
		);
	}
	alphabets(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				/^\p{L}+$/u.test(data) || {
					rule: 'alphabets',
					message:
						customMessage ?? `Not all characters of "${data}" are alphabets`,
					code: customCode ?? 'NOT_ALL_ALPHABETS',
					meta: {
						expected: `all alphabets`,
						received: data,
					},
				},
		);
	}
	numbers(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				/^-?\d+(\.\d+)?$/.test(data) || {
					rule: 'numbers',
					message:
						customMessage ?? `Not all characters of "${data}" are numbers`,
					code: customCode ?? 'NOT_ALL_NUMBERS',
					meta: {
						expected: `all numbers`,
						received: data,
					},
				},
		);
	}

	override validate(data: any): PrimitiveValidateFnReturnType {
		return super.validate(data);
	}
}

export { StringSchema };
