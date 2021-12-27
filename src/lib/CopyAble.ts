export interface CopyAble<T> {
  copy(): T;
}
export function isCopyAble<T>(value: any): value is CopyAble<T> {
  return typeof value.copy === "function";
}
