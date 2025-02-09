import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7032/api/Auth';

  private http = inject(HttpClient);

  register(data: {username: string; password: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data)
  }

  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  //check if user logged in
  isAuthenticated(): boolean {
    return !!this.getToken();
  }



}
