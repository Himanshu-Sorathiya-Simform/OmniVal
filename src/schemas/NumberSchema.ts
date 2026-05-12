import type { Check, ErrorObject, ReturnType, ValidateReturnType } from '../types.js';

class NumberSchema {
	private checks: Array<Check> = [];

	validateType(data: any): ReturnType {
		return (
			typeof data === 'number' || {
				rule: 'type',
				message: `typeof ${data} is not number`,
				code: 'INVALID_TYPE',
				meta: {
					expected: 'number',
					received: typeof data,
				},
			}
		);
	}

	min(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data >= val || {
					rule: 'min',
					message: `${data} is smaller than ${val}`,
					code: 'TOO_SHORT',
					meta: {
						expected: `>= ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	max(val: number) {
		this.checks.push(
			(data: any): ReturnType =>
				data <= val || {
					rule: 'max',
					message: `${data} is bigger than ${val}`,
					code: 'TOO_LONG',
					meta: {
						expected: `<= ${val}`,
						received: data,
					},
				},
		);

		return this;
	}
	positive() {
		this.checks.push(
			(data: any): ReturnType =>
				data > 0 || {
					rule: 'positive',
					message: `${data} is not positive`,
					code: 'NOT_POSITIVE',
					meta: {
						expected: `> 0`,
						received: data,
					},
				},
		);

		return this;
	}
	negative() {
		this.checks.push(
			(data: any): ReturnType =>
				data < 0 || {
					rule: 'negative',
					message: `${data} is not negative`,
					code: 'NOT_NEGATIVE',
					meta: {
						expected: `< 0`,
						received: data,
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

export { NumberSchema };
