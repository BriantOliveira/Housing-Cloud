export interface ResponsePayload {
  status: string;
  success?: boolean;
  message: string;
  data?: Record<string, unknown>;
}

export interface ResponseOptions {
  message?: string;
  success?: boolean;
  data?: Record<string, unknown>;
}
