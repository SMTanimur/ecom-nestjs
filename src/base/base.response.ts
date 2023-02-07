export class BaseResponse<T> {
  doc?: T;

  docs?: Array<T>;

  totalDocs?: number;

  limit?: number;

  totalPages?: number;

  page?: number;

  pagingCounter?: number;

  hasPrevPage?: boolean;

  hasNextPage?: boolean;

  prevPage?: any;

  nextPage?: any;
}
