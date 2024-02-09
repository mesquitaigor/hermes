import { passwordErrors } from 'src/app/shared/validators/passwordErrors';

export type validatorReturn<T> = { [key in keyof T]?: true } | null;
