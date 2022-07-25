import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { CrudService } from "src/app/services/crud.service";
import { Employee } from 'src/app/services/Employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employeeId:any;
  formEmployee:FormGroup;

  constructor(
    private activeRoute:ActivatedRoute,
    private crudService:CrudService,
    public form:FormBuilder,
    private router:Router
  ) {
    this.employeeId = this.activeRoute.snapshot.paramMap.get('id');
    console.log('employeeId', this.employeeId);

    this.crudService.GetEmployee(this.employeeId).subscribe((response) => {
      if (response.success != 0) {
        console.log(response);
        this.formEmployee.setValue({
          name: response[0].name,
          email: response[0].email
        });
      }
    });
    this.formEmployee = this.form.group({
      name:[''],
      email:['']
    });
  }

  ngOnInit(): void {
  }

  sendData():any {
    console.log(this.employeeId);
    console.log(this.formEmployee.value);
    this.crudService.UpdateEmployee(this.employeeId, this.formEmployee.value).subscribe((response) => {
      if(response.success == 1)
        this.router.navigateByUrl('/list-employee');
    })
    
  }

}
