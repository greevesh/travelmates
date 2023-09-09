const formatDate = (timestamp: number): Date => {
  let formattedDate: Date = new Date(timestamp * 1000);
  return formattedDate;
};

export default formatDate;
