import { validateParameterType } from '../helpers/helpers.js';
import type {
	CheckFn,
	CheckFnReturnType,
	Params,
	PrimitiveValidateFnReturnType,
} from '../types.js';
import { BasePrimitiveSchema } from './BasePrimitiveSchema.js';

class NumberSchema extends BasePrimitiveSchema {
	protected type: string = 'number';
	protected checks: Array<CheckFn> = [];

	protected override validateType(data: any): CheckFnReturnType {
		if (Number.isNaN(data) || !Number.isFinite(data)) {
			return {
				rule: 'type',
				code: 'INVALID_TYPE',
				message: `(${typeof data})(${data}) is not a valid ${this.type} type`,
				meta: { expected: this.type, received: typeof data },
			};
		}

		return super.validateType(data);
	}

	minValue(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'minValue',
			passedValue: val,
			typeOfParameterRequired: 'number',
		});

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data >= val || {
					rule: 'minValue',
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
	maxValue(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'maxValue',
			passedValue: val,
			typeOfParameterRequired: 'number',
		});

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data <= val || {
					rule: 'maxValue',
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
	integer(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		this.checks.push(
			(data: any): CheckFnReturnType =>
				Number.isInteger(data) || {
					rule: 'integer',
					message: customMessage ?? `${data} is not an integer`,
					code: customCode ?? 'NOT_INTEGER',
					meta: {
						expected: `an integer`,
						received: data,
					},
				},
		);

		return this;
	}
	multipleOf(step: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'multipleOf',
			passedValue: step,
			typeOfParameterRequired: 'number',
		});

		this.checks.push(
			(data: any): CheckFnReturnType =>
				data % step === 0 || {
					rule: 'multipleOf',
					message: customMessage ?? `${data} is not multiple of ${step}`,
					code: customCode ?? 'NOT_MULTIPLE_OF',
					meta: {
						expected: `multiple of ${step}`,
						received: data,
					},
				},
		);

		return this;
	}

	override validate(data: any): PrimitiveValidateFnReturnType {
		return super.validate(data);
	}
}

export { NumberSchema };
