import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "./Employee";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  API: string = 'http://api.crud.cl/';
  
  constructor(private clientHttp: HttpClient) { }

  InsertEmployee(employeeData: Employee): Observable<any> {
    return this.clientHttp.post(`${this.API}?insert=1`, employeeData);
  }

  ListEmployees() {
    return this.clientHttp.get(`${this.API}`);
  }

  DeleteEmployee(id:Number):Observable<any> {
    return this.clientHttp.get(`${this.API}?delete=${id}`);
  }

  GetEmployee(id:Number): Observable<any> {
    return this.clientHttp.get(`${this.API}?get=${id}`);
  }

  UpdateEmployee(id:Number, employeeData: Employee): Observable<any> {
    return this.clientHttp.post(`${this.API}?update=${id}`, employeeData);
  }

}
