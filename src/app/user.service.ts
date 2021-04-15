import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://jsonplaceholder.typicode.com/users';

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
