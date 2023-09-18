export interface ColumnData {
  field: string;
  headerName: number;
  width: number;
}

export interface Journeys {
  id: number;
  places: string[];
  startDate: number;
  endDate: number;
  name: string;
}

export interface CalendarDay {
  date: Date;
  day: string;
}

export interface Row {
  id: number;
  name: string;
  month: string;
  year: number;
  places: string[];
}

export type Months =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface NextMonthButtonProps {
  incrementMonth: () => void;
}

export interface PreviousMonthButtonProps {
  decrementMonth: () => void;
}
