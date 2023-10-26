import React, { Dispatch, SetStateAction } from "react";
import { GridColDef } from "@mui/x-data-grid-pro";

export interface RenderRowsProps {
  setCurrentMonthRows: Dispatch<SetStateAction<Row[]>>;
  setCurrentUserDisplayName: Dispatch<SetStateAction<string | null>>;
  setFetchedRows: Dispatch<SetStateAction<boolean>>;
  currentMonth: number;
  currentYear: number;
}

export interface ColumnData {
  field: string;
  headerName: number;
  width: number;
}

export interface RenderBaseColumnsProps {
  slotColumnCommonFields: Partial<GridColDef>;
  setBaseColumns: Dispatch<SetStateAction<GridColDef[]>>;
}

export interface RenderExtraColumnsProps {
  currentYear: number;
  currentMonth: number;
  slotColumnCommonFields: Partial<GridColDef>;
  setExtraColumns: Dispatch<SetStateAction<GridColDef[]>>;
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

export interface FetchRowDataProps {
  currentMonth: number;
  currentYear: number;
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

export interface MonthProps {
  currentMonth: number;
  currentYear: number;
  setCurrentMonth: Dispatch<SetStateAction<number>>;
  setCurrentYear: Dispatch<SetStateAction<number>>;
}

export interface FlexContainerProps {
  children: React.ReactNode;
  display?: string;
  justifyContent?: string;
  marginTop?: string;
}

export interface NextMonthButtonProps {
  incrementMonth: () => void;
}

export interface PreviousMonthButtonProps {
  decrementMonth: () => void;
}

export interface EditContentProps {
  buttonText: string;
  form: React.ReactElement;
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
