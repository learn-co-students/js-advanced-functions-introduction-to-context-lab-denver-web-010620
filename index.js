// Your code here
const createEmployeeRecord = function(empData) {
   let employee = {};

   employee.firstName = empData[0];
   employee.familyName = empData[1];
   employee.title = empData[2];
   employee.payPerHour = empData[3];
   employee.timeInEvents = [];
   employee.timeOutEvents = [];    

   return employee;
}

const createEmployeeRecords = function(empDatas) {
   let employeeRecords = [] 
   for(let i = 0; i < empDatas.length; i++) {
      employeeRecords.push(createEmployeeRecord(empDatas[i]));    
   }
   return employeeRecords;
}

const createTimeInEvent = function(record, dateStamp) {
   const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(dateStamp.split(' ')[1]),
      date: dateStamp.split(' ')[0]
   };
   record.timeInEvents.push(timeInEvent);
   return record;
}

const createTimeOutEvent = function(record, dateStamp) {
   const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(dateStamp.split(' ')[1]),
      date: dateStamp.split(' ')[0]
   };
   record.timeOutEvents.push(timeOutEvent);
   return record;
}

const hoursWorkedOnDate = function(record, date) {
   const timeInEvent = record.timeInEvents.find(event => event.date === date);
   const timeOutEvent = record.timeOutEvents.find(event => event.date === date);
   return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

const wagesEarnedOnDate = function(record, date) {
   const hoursWorked = hoursWorkedOnDate(record, date);
   return hoursWorked * record.payPerHour;
}

const allWagesFor = function(record) {
   let total = 0;
   const dates = [];

   const timeInEvents = record.timeInEvents;

   for(let i = 0; i < timeInEvents.length; i++) {
      let date = timeInEvents[i].date;
      if(!dates.includes(date)) {
         dates.push(date);      
      }
   }

   for(let j = 0; j < dates.length; j++) {
      total += wagesEarnedOnDate(record, dates[j]);
   }

   return total;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
   for(let i = 0; i < srcArray.length; i++) {
      let employee = srcArray[i];
      if(employee.firstName === firstName) {
         return employee
      }
   }
   return null;
}

const calculatePayroll = function(array) {
   let total = 0;
   for(let i = 0; i < array.length; i++) {
      let employee = array[i];
      total += allWagesFor(employee);
   }
   return total;
}