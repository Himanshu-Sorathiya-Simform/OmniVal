interface ErrorObject {
	rule: string;
	message: string;
	code: string;
	meta: object;
}

type ValidateFnReturnType =
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

type CheckFnReturnType = true | ErrorObject;

type CheckFn = (...args: any[]) => CheckFnReturnType;

export type { CheckFn, CheckFnReturnType, ErrorObject, ValidateFnReturnType };
