import type {
	CheckFnReturnType,
	NonPrimitiveErrorObject,
	NonPrimitiveValidateFnReturnType,
	ObjectShape,
} from '../types.js';

class ObjectSchema {
	protected type: string = 'object';
	shape: ObjectShape;

	constructor(shape: any) {
		if (shape === undefined || shape === null) {
			throw new Error('Please provide a shape in object method.');
		}

		this.shape = shape;
	}

	protected validateType(data: any): CheckFnReturnType {
		if (data === null || Array.isArray(data)) {
			return {
				rule: 'type',
				message: `(${data}) is not a valid ${this.type} type`,
				code: 'INVALID_TYPE',
				meta: {
					expected: this.type,
					received: data,
				},
			};
		}

		return (
			typeof data === this.type || {
				rule: 'type',
				message: `(${typeof data})(${data}) is not a ${this.type} type`,
				code: 'INVALID_TYPE',
				meta: {
					expected: this.type,
					received: data,
				},
			}
		);
	}

	validate(data: any): NonPrimitiveValidateFnReturnType {
		const errors: NonPrimitiveErrorObject[] = [];

		const typeCheck = this.validateType(data);

		if (typeCheck !== true) {
			errors.push(typeCheck);

			return { isValid: false, errors };
		}

		const keysOfData = Object.keys(data);
		const keysOfShape = Object.keys(this.shape);

		if (
			keysOfData.length !== keysOfShape.length ||
			!keysOfData.every((key) => Object.hasOwn(this.shape, key))
		) {
			errors.push({
				rule: 'keys',
				message: `keys of provided object [${keysOfData.join(', ')}] are not aligning with keys of shape [${keysOfShape.join(', ')}]`,
				code: 'INVALID_KEYS',
				meta: {
					expected: `same keys`,
					received: Object.keys(data),
				},
			});

			return { isValid: false, errors };
		}

		for (const key of keysOfData) {
			const ans: NonPrimitiveValidateFnReturnType | undefined =
				this.shape[key] && this.shape[key].validate(data[key]);

			if (ans && ans.isValid === false) {
				errors.push(
					...ans.errors.map((err) => {
						const { path: oldPath, ...restErrorObj } = err;
						const currPath = oldPath ? `${key}.${oldPath}` : key;
						return { path: currPath, ...restErrorObj };
					}),
				);
			}
		}

		return errors.length === 0 ? { isValid: true, data } : { isValid: false, errors };
	}
}

export { ObjectSchema };
