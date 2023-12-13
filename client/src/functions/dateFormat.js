import { dateOption } from "../constants/dateOptions";

export const dateFormat = (date) => {
  return new Date(date)?.toLocaleString(undefined, dateOption);
};
