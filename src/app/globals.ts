export const currentUserID: string | null = localStorage.getItem("userID");
export const groupID: string | null = localStorage.getItem("groupID");

export const generateRandomID = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 20; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const fetchMonth = (date: any) => date.toDate().getMonth();
export const fetchYear = (date: any) => date.toDate().getFullYear();
