export interface User {
  id: number;
  name: string;
  gender: string;
  balance: number;
  hashEmail: string;
  emailDomain: string;
  password: string;
  joinAt: string;
  lastUpdated: string;
  lastLogin: string[];
  color?: string;
}
