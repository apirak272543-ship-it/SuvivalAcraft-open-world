export interface CommandResult<T> {
  ok: boolean;
  error?: string;
  value?: T;
}

export function fail<T>(error: string): CommandResult<T> {
  return { ok: false, error };
}

export function ok<T>(value: T): CommandResult<T> {
  return { ok: true, value };
}
