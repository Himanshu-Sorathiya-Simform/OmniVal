# @himanshu-sorathiya/omnival

OmniVal is an all-in-one validator package designed for JavaScript and TypeScript with a
focus on developer experience. It provides a chainable, class-based API for validating
strings, numbers, and booleans with advanced customization options for error handling.

## Installation

```bash
npm install @himanshu-sorathiya/omnival
```

## Core Concepts

- **Type Safety:** Built with TypeScript to provide full autocomplete for all validation
  methods.
- **Fail-Fast Type Checking:** If the initial type check (string, number, boolean) fails,
  validation stops immediately to prevent side effects.
- **Aggregated Rule Validation:** Once the type is confirmed, all chained rules are
  executed. Even if one rule fails, the library continues checking the rest to provide a
  complete report of all violations.
- **Order Independent:** Methods can be chained in any order.

## Basic Usage

```typescript
import v from '@himanshu-sorathiya/omnival';

// Primitive validations

// Successful validation
const result = v.number().positive().max(15).validate(10);
// Returns: { isValid: true, data: 10 }

// Failed validation with multiple errors
const failure = v.number().max(15).positive().min(5).validate(-10);

/*
Returns:
{
  isValid: false,
  errors: [
    {
      rule: 'positive',
      message: '-10 is not a positive number',
      code: 'NOT_POSITIVE',
      meta: { ... }
    },
    {
      rule: 'min',
      message: '-10 is smaller than 5',
      code: 'TOO_SHORT',
      meta: { ... }
    }
  ]
}
*/

// Object validations

// Successful validation
const result = v
	.object({
		role: v.string().lowercase(),
		stars: v.number().positive(),
	})
	.validate({ role: 'admin', stars: 5 });
// Returns: { isValid: true, data: { role: 'admin', stars: 5 } }

// Failed validation with multiple errors
const failure = v
	.object({
		role: v.string().lowercase(),
		stars: v.number().positive(),
	})
	.validate({ role: 'ADMIN', stars: -3 });
/*
Returns:
{
  "isValid": false,
  "errors": [
    {
      "path": "role",
      "errors": [
        {
          "rule": "lowercase",
          "code": "NOT_LOWERCASE",
          "message": "ADMIN contains uppercase characters",
          "meta": { "expected": "lowercase string", "received": "ADMIN" }
        }
      ]
    },
    {
      "path": "stars",
      "errors": [
        {
          "rule": "positive",
          "code": "NOT_POSITIVE",
          "message": "-3 is not a positive number",
          "meta": { "expected": "> 0", "received": -3 }
        }
      ]
    }
  ]
}
*/
```

## API Reference

### `v.string()`

Starts a string validation chain.

- `.minLength(length)` - Checks if string length is >= length.
- `.maxLength(length)` - Checks if string length is <= length.
- `.equals(value)` - Checks for exact string match.
- `.length(value)` - Checks if the string length is exactly equal to value.
- `.startsWith(prefix)` - Checks if the string begins with the specified prefix.
- `.endsWith(suffix)` - Checks if the string ends with the specified suffix.
- `.includes(substring)` - Checks if the string contains the specified substring.
- `.uppercase()` - Checks if all alphabetic characters in the string are uppercase.
- `.lowercase()` - Checks if all alphabetic characters in the string are lowercase.
- `.alphabets()` - Checks if all characters in the string are alphabets.
- `.numbers()` - Checks if all characters in the string are numbers.

### `v.number()`

Starts a number validation chain.

- `.minValue(value)` - Checks if value is >= min.
- `.maxValue(value)` - Checks if value is <= max.
- `.positive()` - Checks if value is > 0.
- `.negative()` - Checks if value is < 0.
- `.equals(value)` - Checks for exact number match.
- `.integer()` - Checks if the value is a whole number without a decimal component.
- `.multipleOf(step)` - Checks if the value is perfectly divisible by the provided step.

### `v.boolean()`

Starts a boolean validation chain.

- `.equals(value)` - Checks for exact boolean match.

### `v.object(shape)`

Starts an object structural definition.

## Customizing Errors

Every validation method accepts an optional second argument. This allows you to override
the default error messages and codes to fit your application's error-handling strategy.

### Using a String

Pass a string to replace only the default message.

```typescript
v.number().positive('Value must be greater than zero');
```

### Using an Object

Pass an object to replace the message, the code, or both.

```typescript
v.number().min(5, {
	code: 'CUSTOM_MIN_ERROR',
	message: 'The value provided is too low',
});
```

## Error Object Structure

When validation fails, the errors array contains objects with the following structure:

| Property | Type   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| rule     | string | The name of the rule that failed.                     |
| message  | string | The error message (default or custom).                |
| code     | string | The error code for programmatic handling.             |
| meta     | object | Additional context (e.g., expected vs actual values). |

## License

MIT
