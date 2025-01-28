export const NOT_FOUND_JSON = {
  success: false,
  error: "Not Found",
};

export const SERVER_ERROR_JSON = {
  success: false,
  error: "Server Error",
};

export const formatBadRequestJsonError = (detail: any) => {
  return {
    success: false,
    error: "Invalid Data",
    detail,
  };
};

export const formatOkJsonResponse = (data: any) => {
  return { success: true, data };
};

export const formatPaginationResponse = (
  data: any,
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: null | number;
    nextPage: null | number;
    pageCount: number;
    totalCount: number;
  }
) => {
  return {
    success: true,
    data,
    meta: {
      is_first_page: meta.isFirstPage,
      is_last_page: meta.isLastPage,
      current_page: meta.currentPage,
      previous_page: meta.previousPage,
      next_page: meta.nextPage,
      page_count: meta.pageCount,
      total_count: meta.totalCount,
    },
  };
};
