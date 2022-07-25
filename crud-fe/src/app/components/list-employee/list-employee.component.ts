import { Component, OnInit } from '@angular/core';
import { CrudService } from "src/app/services/crud.service";
import { Employee } from 'src/app/services/Employee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.scss']
})
export class ListEmployeeComponent implements OnInit {
  employees!:Employee[];

  constructor(
    private crudService:CrudService
  ) { }

  ngOnInit(): void {
    this.crudService.ListEmployees().subscribe((response) => {
      console.log(response);
      this.employees = response as Employee[];
    });
  }

  deleteRegister(id:any, iControl:any) {
    console.log('id', id);
    console.log('iControl', iControl);
    if (window.confirm(`Are you sure to delete employee ${id}?`))
      this.crudService.DeleteEmployee(id).subscribe((response) => {
        this.employees.splice(iControl, 1)
      });
    
  }

}
