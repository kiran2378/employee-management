import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Employee } from 'src/app/model/employee';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent implements OnInit {
    
  empDetail! : FormGroup
  empObj : Employee = new Employee();
  employeeData ! : any;
  showAdd! : boolean;
  showUpdate! : boolean;
  api: any;

  constructor(private formbuilder : FormBuilder,private empService : EmployeeService ) { }

  ngOnInit(): void {

    this.empDetail = this.formbuilder.group({
      name :[''],
      age :[''],
      department :[''],
      bloodtype :[''],
      phone : [''],
      address :[''],
      

    })

    this.getAllEmployee();
  }

  clickAddEmployee() {
    this.empDetail.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
        this.empObj.name = this.empDetail.value.name;
        this.empObj.age = this.empDetail.value.age;
        this.empObj.department = this.empDetail.value.department;
        this.empObj.bloodtype = this.empDetail.value.bloodtype;
        this.empObj.phone = this.empDetail.value.phone;
        this.empObj.address = this.empDetail.value.address;
        
debugger
        this.empService.postEmployee(this.empObj)
        .subscribe((Response: any)=>{
          console.log(Response);
          alert("Employee Added Successfully")
          let ref = document.getElementById('cancel')
          this.empDetail.reset();
          ref?.click();
          this.getAllEmployee(); /* once particular employee added it should be display */
        },(_error: any)=>{
          alert("Spmething went wrong")
        })
  }

  getAllEmployee() {
    this.empService.getEmployee(this.employeeData)
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

 
  deleteEmployee(row : any) {
    debugger  
   this.empService.deleteEmployee(row.id, row.number)
    .subscribe(_res=>{
      alert("Employee Deleted Successfully")
      this.getAllEmployee();
    })
  }

  onEdit(row : any) {

    this.showAdd = false;
    this.showUpdate = true;
    this.empObj.id = row.id;  /* store id value */
    this.empDetail.controls['name'].setValue(row.name)
    this.empDetail.controls['age'].setValue(row.age)
    this.empDetail.controls['department'].setValue(row.department)
    this.empDetail.controls['bloodtype'].setValue(row.bloodtype)
    this.empDetail.controls['phone'].setValue(row.phone)
    this.empDetail.controls['address'].setValue(row.address)
    
  }

  updateEmployeeDetails() {
    this.empObj.name = this.empDetail.value.name;
        this.empObj.age = this.empDetail.value.age;
        this.empObj.department = this.empDetail.value.department;
        this.empObj.bloodtype = this.empDetail.value.bloodtype;
        this.empObj.phone = this.empDetail.value.phone;
        this.empObj.address = this.empDetail.value.address;
        
        this.empService.updateEmployee(this.empObj, this.empObj.id)
        .subscribe(res=>{
          alert("Updated Successfully")
          let ref = document.getElementById('cancel')
          this.empDetail.reset();
          ref?.click();
          this.getAllEmployee(); /* once particular employee added it should be display */
        },(_error: any)=>{
          alert("Spmething went wrong")
        })

  }

}
