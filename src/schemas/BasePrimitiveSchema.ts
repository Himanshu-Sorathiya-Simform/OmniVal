import type {
	CheckFn,
	CheckFnReturnType,
	ErrorObject,
	Params,
	ValidateFnReturnType,
} from '../types.js';

abstract class BasePrimitiveSchema {
	protected abstract type: string;
	protected abstract checks: Array<CheckFn>;

	protected validateType(data: any): CheckFnReturnType {
		return (
			typeof data === this.type || {
				rule: 'type',
				message: `(${typeof data})(${Object.is(data, -0) ? '-0' : data}) is not a ${this.type}`,
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

		this.checks.push(
			(data: any): CheckFnReturnType =>
				Object.is(val, data) || {
					rule: 'equals',
					message:
						customMessage ??
						`${Object.is(data, -0) ? '-0' : data} is not equal to ${val}`,
					code: customCode ?? 'NOT_EQUAL',
					meta: {
						expected: `Equals to ${val}`,
						received: data,
					},
				},
		);

		return this;
	}

	validate(data: any): ValidateFnReturnType {
		const errors: ErrorObject[] = [];

		const typeCheck = this.validateType(data);

		if (typeCheck !== true) {
			errors.push(typeCheck);

			return { isValid: false, errors };
		}

		for (const check of this.checks) {
			const answer = check(data);

			if (answer !== true) {
				errors.push(answer);
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
