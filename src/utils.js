export const ISODateFormat = (date) => {
  const formattedDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  return formattedDate;
};
