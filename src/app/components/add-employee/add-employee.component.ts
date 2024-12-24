import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../../model/Employee';
// import { EmployeeService } from '../../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import {
  addEmployee,
  getEmployee,
  updateEmployee,
} from '../../store/employee.action';
import { selectEmployeeById } from '../../store/employee.selector';
// import { getEmployeeById } from '../../store/employee.selector';
@Component({
  selector: 'app-add-employee',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  isEdit = false;
  title = 'Add Employee';
  dialogData: any;
  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  // constructor(
  //   private service: EmployeeService,
  //   private ref: MatDialogRef<AddEmployeeComponent>,
  //   private toastr: ToastrService,
  //   @Inject(MAT_DIALOG_DATA) public data: any
  // ) {}
  constructor(
    private store: Store,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.dialogData = this.data;

    if (this.dialogData.code > 0) {
      this.title = 'Edit Employee';
      this.isEdit = true;

      // this.store.dispatch(getEmployee({ empId: this.dialogData.code }));
      // this.store.select(getEmployeeById).subscribe((item) => {
      //   let _data = item;
      //   if (_data != null) {
      //     this.empForm.setValue({
      //       id: _data.id,
      //       name: _data.name,
      //       role: _data.role,
      //       doj: _data.doj,
      //       salary: _data.salary,
      //     });
      //   }
      // });

      this.store
        .select(selectEmployeeById(this.dialogData.code))
        .subscribe((item) => {
          let _data = item;

          if (_data != null) {
            this.empForm.setValue({
              id: _data.id,
              name: _data.name,
              role: _data.role,
              doj: _data.doj,
              salary: _data.salary,
            });
          }
        });

      // this.service.Get(this.dialogData.code).subscribe((item) => {
      //   let _data = item;
      //   if (_data != null) {
      //     this.empForm.setValue({
      //       id: _data.id,
      //       name: _data.name,
      //       role: _data.role,
      //       doj: _data.doj,
      //       salary: _data.salary,
      //     });
      //   }
      // });
    }
  }

  saveEmployee() {
    if (this.empForm.valid) {
      // save employee
      let _data: Employee = {
        id: this.empForm.value.id as number,
        name: this.empForm.value.name as string,
        doj: this.empForm.value.doj as Date,
        role: this.empForm.value.role as string,
        salary: this.empForm.value.salary as number,
      };
      if (this.isEdit) {
        this.store.dispatch(updateEmployee({ data: _data }));
        // this.service.Update(_data).subscribe((item) => {
        //   this.toastr.success('Update Success', 'Employee Edit');
        //   this.closepop();
        // });
      } else {
        this.store.dispatch(addEmployee({ data: _data }));
        // this.service.Create(_data).subscribe((item) => {
        //   this.toastr.success('Save success', 'Employee Added');
        //   this.closepop();
        // });
      }
      this.closepop();
    }
  }

  closepop() {
    this.ref.close();
  }
}
