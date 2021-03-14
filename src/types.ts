export interface Pagination {
    limit: number;
    offset: number;
}

export interface Sort {
    field: string;
    order: "DESC" | "ASC";
}

export interface ListSearchParams {
    pagination: Pagination;
    searchValue?: string;
    sortParams?: Sort;
}