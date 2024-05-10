// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');
const getRandomEmployeeBtn = document.querySelector('#get-random-employee-btn');

// Declare employees array and check for cached data
let employeesArray = []
const cache = localStorage.getItem('employees-array')
if (cache) {
  employeesArray = JSON.parse(cache)
}

// Collect employee data, push to employees array, and update cached data
const collectEmployees = () => {
  let firstName = '' 
  let lastName = ''
  let salary = ''
  while (firstName === '') {
    firstName = prompt("Enter first name:");
  }
  while (lastName === '') {
    lastName = prompt("Enter last name:");
  }
  while (salary === '' || isNaN(salary)) {
    salary = prompt("Enter salary:");
  }
  employeesArray.push({firstName, lastName, salary})
  localStorage.setItem('employees-array', JSON.stringify(employeesArray))
  displayEmployees(employeesArray)
  displayAverageSalary(employeesArray)
}

// Display the average salary
const displayAverageSalary = (employeesArray) => {
  // TODO: Calculate and display the average salary
  const salariesArray = employeesArray.map((employee) => {
    return employee.salary
  });
  let salariesSum = 0
  salariesArray.forEach(salary => {
    salariesSum += salary
  });
  const averageSalary = salariesSum/salariesArray.length
  document.getElementById('average-salary').innerHTML = `Average Salary: ${averageSalary}`
}

// Select a random employee
const getRandomEmployee = (employeesArray) => {
  // TODO: Select and display a random employee
  const randomEmployee = employeesArray[Math.floor(Math.random() * employeesArray.length)]
  alert(`First Name: ${randomEmployee.firstName}\nLast Name: ${randomEmployee.lastName}\nSalary: ${randomEmployee.salary}\n`)
}

// Display employee data in an HTML table
const displayEmployees = (employeesArray) => {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);

    displayAverageSalary(employeesArray)
  }
}

const trackEmployeeData = () => {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listeners to 'Add Employees' and 'Get Random Employee' button
addEmployeesBtn.addEventListener('click', () => collectEmployees());
getRandomEmployeeBtn.addEventListener('click', () => getRandomEmployee(employeesArray));

// Display cached data from local storage whenever page reloads
window.onload = () => {
  displayEmployees(employeesArray);
}