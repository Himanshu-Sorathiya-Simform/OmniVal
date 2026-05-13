import type {
	CheckFn,
	CheckFnReturnType,
	ErrorObject,
	ValidateFnReturnType,
} from '../types.js';

abstract class BasePrimitiveSchema {
	protected abstract type: string;
	protected abstract checks: Array<CheckFn>;

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
}

export { BasePrimitiveSchema };
