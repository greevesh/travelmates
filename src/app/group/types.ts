import React, { Dispatch, SetStateAction } from "react";
import { GridColDef } from "@mui/x-data-grid-pro";
import { Journey } from "../create-journey/types";

export interface ColumnData {
  field: string;
  headerName: number;
  width: number;
}

export interface RenderRowsParams {
  setCurrentMonthRows: Dispatch<SetStateAction<Row[]>>;
  setCurrentUserDisplayName: Dispatch<SetStateAction<string | null>>;
  setFetchedRows: Dispatch<SetStateAction<boolean>>;
  currentMonth: number;
  currentYear: number;
}

export interface RenderBaseColumnsParams {
  slotColumnCommonFields: Partial<GridColDef>;
  setBaseColumns: Dispatch<SetStateAction<GridColDef[]>>;
}

export interface RenderExtraColumnsParams {
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
  photoURL: string;
  name: string;
  month: string;
  year: number;
  locations: string[];
}

export interface GroupMemberRow {
  memberId: string | null | undefined;
  journeys: Journey[];
}

export interface FetchRowDataParams {
  currentMonth: number;
  currentYear: number;
}

export interface ProcessDateRangesParams {
  startDates: number[];
  threeMonthsOrMoreDateRanges: Date[];
  startFromFirstIndex: boolean;
  lastDayOfPreviousMonth: number;
}

export interface ProcessLocationsParams {
  filteredJourneys: Journey[];
  dateRangeLengths: number[];
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

export interface MonthParams {
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
  "& .journey-1": {
    backgroundColor: string;
  };
  "& .journey-2": {
    backgroundColor: string;
  };
  "& .journey-3": {
    backgroundColor: string;
  };
  "& .journey-4": {
    backgroundColor: string;
  };
  "& .journey-5": {
    backgroundColor: string;
  };
}
