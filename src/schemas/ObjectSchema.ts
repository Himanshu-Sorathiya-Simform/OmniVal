import type {
	CheckFnReturnType,
	NonPrimitiveErrorObject,
	NonPrimitiveValidateFnReturnType,
	ObjectShape,
} from '../types.js';

class ObjectSchema {
	protected type: string = 'object';
	shape: ObjectShape = {};

	constructor(shape: any) {
		this.shape = shape;
	}

	protected validateType(data: any): CheckFnReturnType {
		return (
			(typeof data === this.type && data !== null && !Array.isArray(data)) || {
				rule: 'type',
				message: `(${typeof data})(${data}) is not a valid ${this.type} type`,
				code: 'INVALID_TYPE',
				meta: {
					expected: this.type,
					received: typeof data,
				},
			}
		);
	}

	validate(data: any): NonPrimitiveValidateFnReturnType {
		const errors: NonPrimitiveErrorObject[] = [];

		const typeCheck = this.validateType(data);

		if (typeCheck !== true) {
			errors.push({ path: 'root', errors: [typeCheck] });

			return { isValid: false, errors };
		}

		const keysOfData = Object.keys(data);
		const keysOfShape = Object.keys(this.shape);

		if (
			keysOfData.length !== keysOfShape.length ||
			!keysOfData.every((key) => this.shape[key])
		) {
			errors.push({
				path: 'root',
				errors: [
					{
						rule: 'keys',
						message: `keys of [${keysOfData.join(', ')}] is not aligning with [${keysOfShape.join(', ')}] keys`,
						code: 'INVALID_KEYS',
						meta: {
							expected: `same keys`,
							received: data.keys,
						},
					},
				],
			});

			return { isValid: false, errors };
		}

		for (const key of keysOfData) {
			const ans = this.shape[key] && this.shape[key].validate(data[key]);

			if (ans && ans.isValid === false && ans.errors) {
				errors.push({
					path: key,
					errors: ans.errors,
				});
			}
		}

		return errors.length === 0 ? { isValid: true, data } : { isValid: false, errors };
	}
}

export { ObjectSchema };
