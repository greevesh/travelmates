export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

export interface UserData {
  id: string;
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  photoURL: string | null;
}

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

export interface SearchProps {
  input: string;
  geonamesList?: string[];
  filteredUsers?: UserResults[];
  handleChange: (value: string) => void;
  handleSelect: (selectedItem: string) => void;
}

export interface SelectedBadgeProps {
  selectedItem: string;
  handleDelete: () => void;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerComponentProps {
  startDate: Date | null;
  endDate: Date | null;
  handleDateChange: (dateRange: DateRange) => void;
}

export interface Timestamp {
  start: number | null;
  end: number | null;
}

export interface JourneyData {
  id: string;
  place: string;
  startDate: number | null;
  endDate: number | null;
  userID: string | undefined;
}

export interface CreateJourneyButtonProps {
  journey: JourneyData | null;
  handleSubmit: () => void;
  emptyInput: boolean;
  spinnerVisible: boolean;
}

export interface NextButtonProps {
  incrementStep: () => void;
}

export interface PreviousButtonProps {
  decrementStep: () => void;
}

export interface GroupData {
  id: string;
}

export interface CreateGroupButtonProps {
  group: GroupData | null;
  handleSubmit: () => void;
  emptyInput: boolean;
}

export interface GroupMembershipData {
  id: string;
  user_id: string | undefined;
  group_id: string;
}

export interface UserResults {
  id: string;
  photoURL: string;
  displayName: string;
}

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

export interface RootStyles {
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
