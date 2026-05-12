interface ErrorObject {
	rule: string;
	message: string;
	code: string;
	meta: object;
}

type Return = true | ErrorObject;

interface Check {
	(...args: any[]): Return;
}

class StringSchema {
	private checks: Check[] = [];

	constructor() {
		this.checks.push(
			(data: any) =>
				typeof data === 'string' || {
					rule: 'type',
					message: `typeof ${data} is not string`,
					code: 'INVALID_TYPE',
					meta: {
						expected: 'string',
						received: typeof data,
					},
				},
		);
	}

	min(val: number) {
		this.checks.push(
			(data: any) =>
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
			(data: any) =>
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

	validate(data: any) {
		const errors = [];

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
