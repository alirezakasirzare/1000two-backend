export const NOT_FOUND_JSON = {
  success: false,
  error: "Not Found",
};

export const SERVER_ERROR_JSON = {
  success: false,
  error: "Server Error",
};

export const UNAUTHORIZED_ERROR_JSON = {
  success: false,
  error: "Unauthorized Error",
};

export const FORBIDDEN_ERROR_JSON = {
  success: false,
  error: "Forbidden Resource",
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
    data: {
      items: data,
      meta,
    },
  };
};
