export type validatorReturn<T> = { [key in keyof T]?: true } | null;
