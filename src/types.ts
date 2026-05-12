interface ErrorObject {
	rule: string;
	message: string;
	code: string;
	meta: object;
}

type ValidateReturnType =
	| {
			isValid: boolean;
			data: any;
			errors?: never;
	  }
	| {
			isValid: boolean;
			errors: ErrorObject[];
			data?: never;
	  };

type ReturnType = true | ErrorObject;

type Check = (...args: any[]) => ReturnType;

export type { Check, ErrorObject, ReturnType, ValidateReturnType };
