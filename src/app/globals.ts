export const currentUserID: string | null = localStorage.getItem("userID");
export const groupID: string | null = localStorage.getItem("groupID");

export const generateRandomID = (): string => {
  const chars: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = "";
  for (let i = 0; i < 20; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const startDates: number[] = [];

export const fetchMonth = (date: any) => date.toDate().getMonth();
export const fetchYear = (date: any) => date.toDate().getFullYear();

export const currentYear: number = new Date().getFullYear();
export const currentMonth: number = new Date().getMonth();
