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
  geonamesList: string[];
  handleChange: (value: string) => void;
  handleSelect: (selectedPlace: string) => void;
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
