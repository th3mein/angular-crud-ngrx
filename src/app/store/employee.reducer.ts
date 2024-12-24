import { createReducer, on } from '@ngrx/store';
import { employeeState } from './employee.state';
import {
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  getEmployee,
  loadEmployeesFail,
  loadEmployeesSuccess,
  updateEmployeeSuccess,
} from './employee.action';

const _employeeReducer = createReducer(
  employeeState,
  on(loadEmployeesSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(loadEmployeesFail, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errMsg,
    };
  }),
  on(deleteEmployeeSuccess, (state, action) => {
    const _newdata = state.list.filter((o) => o.id != action.empId);
    return {
      ...state,
      list: _newdata,
      errormessage: '',
    };
  }),
  on(addEmployeeSuccess, (state, action) => {
    const _newData = { ...action.data };
    return {
      ...state,
      list: [...state.list, _newData],
      errorMessage: '',
    };
  }),
  on(updateEmployeeSuccess, (state, action) => {
    const _newData = state.list.map((o) => {
      return o.id === action.data.id ? action.data : o;
    });
    return {
      ...state,
      list: _newData,
      errorMessage: '',
    };
  }),
  on(getEmployee, (state, action) => {
    const _newData =
      state.list.find((o) => {
        return o.id === action.empId;
      }) || state.empObj;
    // if (_newData == null) {
    //   _newData = state.embObj;
    // }
    return {
      ...state,
      empObj: _newData,
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
