import type { Check, ErrorObject, ReturnType, ValidateReturnType } from '../types.js';

class StringSchema {
	private checks: Array<Check> = [];

	validateType(data: any): ReturnType {
		return (
			typeof data === 'string' || {
				rule: 'type',
				message: `typeof ${data} is not string`,
				code: 'INVALID_TYPE',
				meta: {
					expected: 'string',
					received: typeof data,
				},
			}
		);
	}

	min(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data.length >= val || {
					rule: 'min',
					message: `length of ${data} is smaller than required ${val} length`,
					code: 'TOO_SHORT',
					meta: {
						expected: `min length of ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}
	max(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data.length <= val || {
					rule: 'max',
					message: `length of ${data} is bigger than required ${val} length`,
					code: 'TOO_LONG',
					meta: {
						expected: `max length of ${val}`,
						received: data.length,
					},
				},
		);

		return this;
	}

	validate(data: any): ValidateReturnType {
		const errors: ErrorObject[] = [];

		const answer = this.validateType(data);

		if (answer !== true) {
			errors.push(answer);

			return {
				isValid: false,
				errors,
			};
		}

		for (const check of this.checks) {
			const answer = check(data);

			if (answer !== true) {
				errors.push(answer);
			}
		}

		if (errors.length === 0) {
			return {
				isValid: true,
				data,
			};
		}

		return {
			isValid: false,
			errors,
		};
	}
}

export { StringSchema };
