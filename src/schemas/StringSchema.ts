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

	override validate(data: any): ValidateFnReturnType {
		return super.validate(data);
	}
}

export { StringSchema };
