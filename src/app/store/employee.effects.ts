import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import {
  addEmployee,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  emptyAction,
  loadEmployees,
  loadEmployeesFail,
  loadEmployeesSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from './employee.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class empEffects {
  // constructor(private actions$: Actions, private service: EmployeeService) {}

  actions$ = inject(Actions);
  service = inject(EmployeeService);
  toastr = inject(ToastrService);

  _loadEmployees = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      exhaustMap((action) => {
        return this.service.GetAll().pipe(
          map((data) => {
            return loadEmployeesSuccess({ list: data });
          }),
          catchError((err) => of(loadEmployeesFail({ errMsg: err.message })))
        );
      })
    )
  );

  _deleteEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      switchMap((action) => {
        return this.service.Delete(action.empId).pipe(
          switchMap((data) => {
            return of(
              deleteEmployeeSuccess({ empId: action.empId }),
              this.showAlert('Deleted Successfully.', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  _addEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      switchMap((action) => {
        return this.service.Create(action.data).pipe(
          switchMap((data) => {
            return of(
              addEmployeeSuccess({ data: action.data }),
              this.showAlert('Added successfully', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  _updateEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployee),
      switchMap((action) => {
        return this.service.Update(action.data).pipe(
          switchMap((data) => {
            return of(
              updateEmployeeSuccess({ data: action.data }),
              this.showAlert('Updated successfully', 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  showAlert(message: string, response: string) {
    if (response === 'pass') {
      this.toastr.success(message);
    } else {
      this.toastr.error(message);
    }
    return emptyAction();
  }
}
