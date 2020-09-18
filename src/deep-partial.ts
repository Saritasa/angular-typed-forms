/**
 * Same as `Partial` but sets properties on ALL nested levels to be partial.
 */
export type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> | null } : T;
