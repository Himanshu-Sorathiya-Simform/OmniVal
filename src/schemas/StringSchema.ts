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

	min(val: number, params?: Params) {
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
	max(val: number, params?: Params) {
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
	startsWith(val: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.startsWith(val) || {
					rule: 'startsWith',
					message: customMessage ?? `${data} is not starting with ${val}`,
					code: customCode ?? 'NOT_STARTS_WITH',
					meta: {
						expected: `start with ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	endsWith(val: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.endsWith(val) || {
					rule: 'endsWith',
					message: customMessage ?? `${data} is not ending with ${val}`,
					code: customCode ?? 'NOT_ENDS_WITH',
					meta: {
						expected: `end with ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	includes(val: string, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data.includes(val) || {
					rule: 'includes',
					message: customMessage ?? `${data} is not including ${val}`,
					code: customCode ?? 'NOT_INCLUDE',
					meta: {
						expected: `${data} includes ${val}`,
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
