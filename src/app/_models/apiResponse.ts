export class ApiResponse<T> {
    reqId: string;
    statusCode: string;
    body: T;
}
