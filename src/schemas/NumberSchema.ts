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

	constructor(checks?: Array<CheckFn>, params?: Params) {
		super(checks, params);
	}

	protected override clone(checks: Array<CheckFn>, params?: Params): this {
		return new NumberSchema(checks, params) as this;
	}

	protected override validateType(data: any): CheckFnReturnType {
		if (Number.isNaN(data) || !Number.isFinite(data)) {
			return {
				rule: 'type',
				code: 'INVALID_TYPE',
				message: `(${typeof data})(${data}) is not a valid ${this.type}`,
				meta: { expected: 'valid number', received: data },
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

		return this.createNextInstance(
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
	}
	maxValue(val: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'maxValue',
			passedValue: val,
			typeOfParameterRequired: 'number',
		});

		return this.createNextInstance(
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
	}
	positive(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
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
	}
	negative(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
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
	}
	integer(params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		return this.createNextInstance(
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
	}
	multipleOf(step: number, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'multipleOf',
			passedValue: step,
			typeOfParameterRequired: 'number',
		});

		return this.createNextInstance(
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
	}

	override validate(data: any): PrimitiveValidateFnReturnType {
		return super.validate(data);
	}
}

export { NumberSchema };
