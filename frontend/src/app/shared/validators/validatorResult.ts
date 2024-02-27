export type validatorResult<T> = { [key in keyof T]?: true } | null;
