import moment from "moment";

export const dateTimeChange = (val) => {
  return moment(val).format("DD.MM.YYYY HH:mm");
};
