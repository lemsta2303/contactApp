import {ContactCategory} from "./ContactCategory";

export interface ContactDetailsDto {
  id: string;
  firsName: string;
  lastName: string;
  email: string;
  password: string;
  category: ContactCategory;
  subCategory?: string;
  phoneNumber: string;
  birthDate: Date;
}
