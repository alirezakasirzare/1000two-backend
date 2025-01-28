export const DEFAULT_LIMIT = 10;

export const formatTargetPagination = (queryParams: { [key: string]: any }) => {
  let targetPage = queryParams.page ? Number(queryParams.page) : 1;
  let targetLimit = queryParams.limit
    ? Number(queryParams.limit)
    : DEFAULT_LIMIT;

  if (isNaN(targetPage)) {
    targetPage = 1;
  }

  if (isNaN(targetLimit)) {
    targetLimit = DEFAULT_LIMIT;
  }

  return { page: targetPage, limit: targetLimit };
};
