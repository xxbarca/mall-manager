interface BaseResult {
  code: number;
  message: string | string[];
}

export interface PageMeta {
  currentPage: number;
  itemCount: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface Response<T = any> extends BaseResult {
  data: T;
}

export interface PageResponse<T = any> extends BaseResult {
  data: {
    items: Array<T>;
    meta: PageMeta;
  };
}

export interface PageParamMeta {
  page: number;
  limit: number;
}
