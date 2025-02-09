import { ContactCategory } from './ContactCategory';

export interface AddUpdateContactDto {
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  category: ContactCategory;
  subCategory?: string;
  phoneNumber: string;
  birthDate: string;
}
