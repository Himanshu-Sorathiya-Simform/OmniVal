import { validateParameterType } from '../helpers/helpers.js';
import type {
	CheckFn,
	CheckFnReturnType,
	Params,
	PrimitiveErrorObject,
	PrimitiveValidateFnReturnType,
} from '../types.js';

abstract class BasePrimitiveSchema {
	protected abstract type: string;
	protected checks: Array<CheckFn>;
	protected params: Params | undefined;

	constructor(checks?: Array<CheckFn>, params?: Params) {
		this.checks = checks ? [...checks] : [];
		this.params = params;
	}

	protected abstract clone(checks: Array<CheckFn>, params?: Params): this;

	protected createNextInstance(newCheck: CheckFn): this {
		return this.clone([...this.checks, newCheck], this.params);
	}

	protected validateType(data: any): CheckFnReturnType {
		const { customMessage, customCode } = this.getCustomProperties(this.params);

		return (
			typeof data === this.type || {
				rule: 'type',
				message:
					customMessage ?? `(${typeof data})(${data}) is not a ${this.type}`,
				code: customCode ?? 'INVALID_TYPE',
				meta: {
					expected: this.type,
					received: typeof data,
				},
			}
		);
	}

	equals(val: any, params?: Params) {
		const { customMessage, customCode } = this.getCustomProperties(params);

		validateParameterType({
			rule: 'equals',
			passedValue: val,
			typeOfParameterRequired: this.type,
		});

		return this.createNextInstance(
			(data: any): CheckFnReturnType =>
				Object.is(val, data) || {
					rule: 'equals',
					message: customMessage ?? `${data} is not equal to ${val}`,
					code: customCode ?? 'NOT_EQUAL',
					meta: {
						expected: `Equals to ${val}`,
						received: data,
					},
				},
		);
	}

	validate(data: any): PrimitiveValidateFnReturnType {
		const errors: PrimitiveErrorObject[] = [];

		const typeCheck = this.validateType(data);

		if (typeCheck !== true) {
			errors.push(typeCheck);

			return { isValid: false, errors };
		}

		for (const check of this.checks) {
			const isValid = check(data);

			if (isValid !== true) {
				errors.push(isValid);
			}
		}

		return errors.length === 0 ? { isValid: true, data } : { isValid: false, errors };
	}

	protected getCustomProperties(params?: Params) {
		const customMessage =
			params && (typeof params === 'string' ? params : params.message);
		const customCode = params && typeof params !== 'string' ? params.code : undefined;

		return { customMessage, customCode };
	}
}

export { BasePrimitiveSchema };
