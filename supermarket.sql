CREATE TABLE `Items` (
  `ID` varchar(10),
  `Name` varchar(20),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Places` (
  `ID` varchar(10),
  `Name` varchar(20),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Vendors` (
  `ID` varchar(10),
  `Name` varchar(50),
  `Contact_No` int,
  `Role` varchar(20),
  `Place_ID` varchar(10),
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`Place_ID`) REFERENCES `Places`(`ID`)
);

CREATE TABLE `Records` (
  `ID` int,
  `Payment` varchar(20),
  `Date` date,
  `Report_ID` int,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Deels` (
  `ID` int,
  `Bill_ID` int,
  `Stock_ID` int,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Stock` (
  `ID` int,
  `Item_ID` varchar(10),
  `Place_ID` varchar(10),
  `Unit_Price` numeric(5,2),
  `Quantity` int,
  `Vendor_ID` varchar(10),
  `Record_ID` int,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`Vendor_ID`) REFERENCES `Vendors`(`ID`),
  FOREIGN KEY (`Record_ID`) REFERENCES `Records`(`ID`),
  FOREIGN KEY (`Place_ID`) REFERENCES `Places`(`ID`),
  FOREIGN KEY (`Item_ID`) REFERENCES `Items`(`ID`)
);

CREATE TABLE `Customers` (
  `ID` varchar(10),
  `Name` varchar(20),
  `Contact_No` int,
  `Join_Date` date,
  `Paid_Bill_Count` int,
  `Loan_Bill_Count` int,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Orders` (
  `ID` int,
  `Open_Date` date,
  `Close_Date` date,
  `Status` varchar(40),
  `Bill_ID` int,
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Users` (
  `ID` int,
  `Name` varchar(20),
  `Contact_No` int,
  `Address` varchar(100),
  `Join_Date` date,
  `User_Password` varchar(100),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Reports` (
  `ID` int,
  `Month` varchar(15),
  `Year` year,
  `User_ID` int,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`User_ID`) REFERENCES `Users`(`ID`)
);

CREATE TABLE `Bills` (
  `ID` int,
  `Status` varchar(20),
  `Date` date,
  `Total_Price` numeric(7,2),
  `Customer_ID` varchar(10),
  `Report_ID` int,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`Report_ID`) REFERENCES `Reports`(`ID`),
  FOREIGN KEY (`Customer_ID`) REFERENCES `Customers`(`ID`)
);

CREATE TABLE `Employees` (
  `ID` varchar(10),
  `Name` varchar(50),
  `Contact_No` int,
  `Address` varchar(100),
  PRIMARY KEY (`ID`)
);

CREATE TABLE `Sallary_Payments` (
  `ID` int,
  `Emp_ID` varchar(10),
  `Date` date,
  `Status` varchar(20),
  `Record_ID` int,
  PRIMARY KEY (`ID`),
  FOREIGN KEY (`Record_ID`) REFERENCES `Records`(`ID`),
  FOREIGN KEY (`Emp_ID`) REFERENCES `Employees`(`ID`)
);

