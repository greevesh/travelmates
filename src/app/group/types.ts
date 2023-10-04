import { Dispatch, SetStateAction } from "react";
import { GridColDef } from "@mui/x-data-grid-pro";

export interface FetchGridDataProps {
  setColumns: Dispatch<SetStateAction<GridColDef[]>>;
  setCurrentMonthRows: Dispatch<SetStateAction<Row[]>>;
  setUserDisplayName: Dispatch<SetStateAction<string | null>>;
}

export interface ColumnData {
  field: string;
  headerName: number;
  width: number;
}

export interface RenderColumnsProps {
  currentYear: number;
  currentMonth: number;
  slotColumnCommonFields: Partial<GridColDef>;
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
  locations: string[];
}

export interface RenderRowsProps {
  currentMonthRows: Row[];
  months: Months[];
  currentMonth: number;
  currentYear: number;
  setCurrentMonthRows: Dispatch<SetStateAction<Row[]>>;
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

export interface JourneyStyles {
  width: string;
  "& .Cebu": {
    backgroundColor: string;
  };
  "& .Moalboal": {
    backgroundColor: string;
  };
  "& .Hanoi": {
    backgroundColor: string;
  };
  "& .Taipei": {
    backgroundColor: string;
  };
  "& .Brisbane": {
    backgroundColor: string;
  };
  "& .Tokyo": {
    backgroundColor: string;
  };
  "& .Singapore": {
    backgroundColor: string;
  };
}
