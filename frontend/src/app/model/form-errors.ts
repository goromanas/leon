export type FormErrors<T> = {
    [key in keyof T]?: string;
};
