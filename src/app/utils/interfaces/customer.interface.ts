export interface Customer {
  id: string;
  document: string;
  name: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  createdAt?: Date;
  updatedAt?: Date;
}
