export class QueryResultResponse<T> {
    sort: {
        sortField: string,
        sortAscending: boolean
    };
    totalRecord: number;
    totalPages: number;
    currentPage: number;
    result: T[];
}
