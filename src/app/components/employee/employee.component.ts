import { Component } from '@angular/core';

// UI imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    CommonModule,
  ],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  empList: Employee[] = [];
  dataSource!: MatTableDataSource<Employee>;
  displayedColumns: string[] = [
    'id',
    'name',
    'role',
    'doj',
    'salary',
    'action',
  ];

  subscription = new Subscription();
  constructor(private dialog: MatDialog, private service: EmployeeService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    let sub = this.service.GetAll().subscribe((item) => {
      this.empList = item;
      this.dataSource = new MatTableDataSource(this.empList);
    });
    this.subscription.add(sub);
  }

  addEmployee() {
    this.openpopup();
  }

  DeleteEmployee(empId: number) {
    if (confirm('Are you sure?')) {
      let sub = this.service.Delete(empId).subscribe((item) => {
        this.getAllEmployees();
      });
      this.subscription.add(sub);
    }
  }

  EditEmployee(empId: number) {
    this.openpopup(empId);
  }

  openpopup(empId: number = 0) {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        exitAnimationDuration: '1000ms',
        enterAnimationDuration: '1000ms',
        data: {
          code: empId,
        },
      })
      .afterClosed()
      .subscribe((o) => {
        this.getAllEmployees();
      });
  }
}
