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

export interface GeonameURLParams {
  username: string;
  q: string;
  maxRows: string;
  featureClass: string;
  orderBy: string;
  name_startsWith: string;
}
