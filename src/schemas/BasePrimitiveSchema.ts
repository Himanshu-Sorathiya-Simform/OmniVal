import type { Check, ErrorObject, ReturnType, ValidateReturnType } from '../types.js';
import { NumberSchema } from './NumberSchema.js';
import { StringSchema } from './StringSchema.js';

class BasePrimitiveSchema {
	validateType(type: string, data: any): ReturnType {
		return (
			typeof data === type || {
				rule: 'type',
				message: `typeof (${data}) is not ${type}`,
				code: 'INVALID_TYPE',
				meta: {
					expected: type,
					received: typeof data,
				},
			}
		);
	}

	validate(checks: Check[], data: any): ValidateReturnType {
		const errors: ErrorObject[] = [];

		let answer: ReturnType = {
			rule: 'type',
			message: 'invalid type',
			code: 'INVALID TYPE',
			meta: {},
		};

		if (this instanceof NumberSchema || this instanceof StringSchema) {
			answer = this.validateType(data);
		}

		if (answer !== true) {
			errors.push(answer);

			return {
				isValid: false,
				errors,
			};
		}

		for (const check of checks) {
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

export { BasePrimitiveSchema };
