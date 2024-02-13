export interface DefaultException {
  status: number;
  errors: {
    message?: string;
  };
}
