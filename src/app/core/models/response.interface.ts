export interface ResponseInterface<T = unknown> {
  data?: T;
  errors?: string[];
  message: string;
  status: number;
}
