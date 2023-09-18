import { FieldValue } from "firebase/firestore";
import React, { SetStateAction, Dispatch } from "react";

export interface Geoname {
  adminCode1: string;
  adminCodes1: { ISO3166_2: string };
  adminName1: string;
  countryCode: string;
  countryId: string;
  countryName: string;
  fcl: string;
  fclName: string;
  fcode: string;
  fcodeName: string;
  geonameId: number;
  lat: string;
  lng: string;
  name: string;
  population: number;
  toponymName: string;
}

export interface GeonameResponse {
  totalResultsCount: number;
  geonames: Geoname[];
}

export interface GeonameURLParams {
  username: string;
  q: string;
  maxRows: string;
  orderBy: string;
  name_startsWith: string;
  featureCode: string;
}

export interface LocationSearchProps {
  input: string;
  geonamesList: string[];
  handleChange: (value: string) => void;
  handleSelect: (selectedItem: string) => void;
}

export interface SelectedDate extends Date {
  $D: number;
  $H: number;
  $L: string;
  $M: number;
  $W: number;
  $d: Date;
  $m: number;
  $ms: number;
  $s: number;
  $u: undefined;
  $x: object;
  $y: number;
}

export interface DateRange {
  start: SelectedDate | null;
  end: SelectedDate | null;
}

export interface DateRangePickerComponentProps {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: (dateRange: SelectedDate[]) => void;
  disabledDateRanges: { start: Date; end: Date }[];
  setDisabledDateRanges: React.Dispatch<
    React.SetStateAction<
      {
        start: Date;
        end: Date;
      }[]
    >
  >;
}

export interface Timestamp {
  start: number | undefined;
  end: number | undefined;
}

export interface Journey {
  id: string | undefined;
  location: string | undefined;
  dateRange: {
    startDate: number | Date | undefined;
    endDate: number | Date | undefined;
  };
  userID?: string | null;
  created?: FieldValue;
}

export interface JourneysStateParams {
  setJourneys: React.Dispatch<React.SetStateAction<Journey[]>>;
  setJourneysLoaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateJourneyButtonProps {
  journey: Journey | null;
  handleSubmit: () => void;
  emptyInput: boolean;
  spinnerVisible: boolean;
  journeyCount: number;
}

export interface JourneyBadgeProps {
  location: string | undefined;
  startDate: string | undefined;
  endDate: string | undefined;
  journey: Journey | null;
  id: string | undefined;
  setJourneys: Dispatch<SetStateAction<Journey[]>>;
  journeys: Journey[];
}
