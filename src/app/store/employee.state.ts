import { EmployeeModel } from './employee.model';

export const employeeState: EmployeeModel = {
  list: [],
  errorMessage: '',
  empObj: {
    id: 0,
    name: '',
    doj: new Date(),
    role: '',
    salary: 0,
  },
};
