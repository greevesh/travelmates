const formatDate = (timestamp: number | undefined): string => {
  if (timestamp !== undefined) {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleString("en-GB", options);
  }
  return "";
};

export default formatDate;
