import { ListSearchParams } from "../types";

export const getPagination = ({
    sortParams,
    pagination: {
        limit,
        offset,
    }
  }: ListSearchParams) => {
    const sort = sortParams ? { [sortParams.field]: sortParams.order === "DESC" ? -1 : 1 } : {};
    return {
      sort,
      limit: limit,
      skip: offset
    };
  };