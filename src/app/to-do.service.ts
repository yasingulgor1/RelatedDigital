import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  constructor(private http:HttpClient) { }

  apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  getAllData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + "/" + id);
  }

  updateData(id : number,value : any) : Observable<any>{
    return  this.http.put<any>(this.apiUrl + "/" + id, value);
  }
}
