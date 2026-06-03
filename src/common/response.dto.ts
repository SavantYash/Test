export class ApiResponse<T> {
  status: number | undefined;
  message: string | undefined;
  data: T | undefined;
}