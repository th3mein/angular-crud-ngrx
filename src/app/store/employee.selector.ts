import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeModel } from './employee.model';

const getEmployeeState = createFeatureSelector<EmployeeModel>('emp');

export const getEmployeeList = createSelector(getEmployeeState, (state) => {
  return state.list;
});

// export const getEmployeeById = createSelector(getEmployeeState, (state) => {
//   return state.empObj;
// });

export const selectEmployeeById = (empId: number) =>
  createSelector(getEmployeeState, (state) =>
    state.list.find((o) => o.id == empId)
  );
