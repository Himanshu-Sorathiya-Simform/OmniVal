interface validateParameterTypeFnProps {
	rule: string;
	passedValue: any;
	typeOfParameterRequired: string;
}

function validateParameterType({
	rule,
	passedValue,
	typeOfParameterRequired,
}: validateParameterTypeFnProps) {
	const isValid = typeof passedValue === typeOfParameterRequired;

	if (!isValid)
		throw new Error(
			`${rule} function only accepts ${typeOfParameterRequired}. (${typeof passedValue})(${passedValue}) is not of type ${typeOfParameterRequired}.`,
		);

	return;
}

export { validateParameterType };
