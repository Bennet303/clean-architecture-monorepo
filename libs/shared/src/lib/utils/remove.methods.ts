type NonMethodKeys<T> = ({
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: T[P] extends Function ? never : P;
} & { [x: string]: never })[keyof T];
export type RemoveMethods<T> = Pick<T, NonMethodKeys<T>>;
