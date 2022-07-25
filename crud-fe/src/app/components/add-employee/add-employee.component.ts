import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { CrudService } from "src/app/services/crud.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  formEmployees: FormGroup;

  constructor(
    public form: FormBuilder,
    private crudService: CrudService,
    private router:Router
  ) {
    this.formEmployees = this.form.group({
      name: [''],
      email: ['']
    })
  }

  ngOnInit(): void {
  }

  sendData(): any {
    console.log("sendData", "initializing");
    console.log("sendData", this.formEmployees.value);
    this.crudService.InsertEmployee(this.formEmployees.value).subscribe((response) => {
      if (response.sucess == 1)
        this.router.navigateByUrl('/list-employee');
    });
  }

}
