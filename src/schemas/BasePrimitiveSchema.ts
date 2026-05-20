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

	constructor(checks?: Array<CheckFn>) {
		this.checks = checks ? [...checks] : [];
	}

	protected abstract clone(checks: Array<CheckFn>): this;

	protected createNextInstance(newCheck: CheckFn): this {
		return this.clone([...this.checks, newCheck]);
	}

	protected validateType(data: any): CheckFnReturnType {
		return (
			typeof data === this.type || {
				rule: 'type',
				message: `(${typeof data})(${data}) is not a ${this.type}`,
				code: 'INVALID_TYPE',
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
