import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {AddUpdateContactDto} from "../models/AddUpdateContactDto";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private baseUrl = 'https://localhost:7032/api';

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getAllContacts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Contacts`);
  }

  getContact(contactId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Contacts/${contactId}`);
  }

  deleteContact(contactId: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete(`${this.baseUrl}/Contacts/${contactId}`, { headers });
  }

  addContact(contact: AddUpdateContactDto): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.post(`${this.baseUrl}/Contacts`, contact, { headers });
  }

  updateContact(contactId: string, contact: AddUpdateContactDto): Observable<any> {
    const token = this.authService.getToken();
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.put(`${this.baseUrl}/Contacts/${contactId}`, contact, { headers });
  }

}
