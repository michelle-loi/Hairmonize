create schema salon_database;

create table account
(
   Username     varchar(32)  not null
       primary key,
   Password     varchar(128) not null,
   CreationDate date         null,
   EID          int          null,
   CID          int          null,
   AccountType  int          null,
   constraint CID
       unique (CID),
   constraint EID
       unique (EID),
   constraint account_client_CID_fk
       foreign key (CID) references client (CID)
           on update cascade on delete cascade,
   constraint account_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete cascade
);

create table administrator
(
   EID int not null
       primary key,
   constraint administrator_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete cascade
);

create table appointment
(
   CID         int  not null,
   Date        date not null,
   Time        time not null,
   Stylist_EID int  not null,
   Service_SID int  null,
   primary key (CID, Date, Time),
   constraint appointment_employee_EID_fk
       foreign key (Stylist_EID) references employee (EID)
           on update cascade on delete cascade,
   constraint appointment_service_SID_fk
       foreign key (Service_SID) references service (SID)
           on update cascade on delete set null
);

create index Stylist_EID
   on appointment (Stylist_EID);

create table client
(
   CID   int auto_increment
       primary key,
   FName varchar(100) not null,
   MName varchar(100) null,
   LName varchar(100) not null,
   EID   int          null,
   constraint client_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete set null
);

create index EID
   on client (EID);

create table client_email
(
   CID   int          not null,
   Email varchar(100) not null,
   primary key (CID, Email),
   constraint client_email_client_CID_fk
       foreign key (CID) references client (CID)
           on update cascade on delete cascade
);

create table client_phone
(
   CID   int    not null,
   Phone bigint not null,
   primary key (CID, Phone),
   constraint client_phone_client_CID_fk
       foreign key (CID) references client (CID)
           on update cascade on delete cascade
);

create table employee
(
   EID        int auto_increment
       primary key,
   FName      varchar(100) not null,
   MName      varchar(100) null,
   LName      varchar(100) null,
   SalaryType varchar(10)  null
);

create table employee_email
(
   EID   int          not null,
   EMAIL varchar(100) not null,
   primary key (EID, EMAIL),
   constraint employee_email_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete cascade
);

create table employee_email
(
   EID   int          not null,
   EMAIL varchar(100) not null,
   primary key (EID, EMAIL),
   constraint employee_email_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete cascade
);

create table expense
(
   ExID        int auto_increment
       primary key,
   Date        date          null,
   Time        time          null,
   Amount      double        not null,
   Description varchar(1000) null,
   EID         int           null,
   constraint expense_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete set null
);

create index EID
   on expense (EID);

create table has
(
   Order_ID     int not null,
   Product_code int not null,
   primary key (Order_ID, Product_code),
   constraint has_inventory_Product_code_fk
       foreign key (Product_code) references inventory (Product_code)
           on update cascade on delete cascade,
   constraint has_order_Order_ID_fk
       foreign key (Order_ID) references `order` (Order_ID)
           on update cascade on delete cascade
);

create index Product_code
   on has (Product_code);

create table inventory
(
   Product_code   int auto_increment
       primary key,
   Product_name   varchar(255) not null,
   Price          double       not null,
   Quantity       int          not null,
   Is_Merchandise tinyint(1)   not null,
   Is_Supply      tinyint(1)   not null
);

create table `order`
(
   Order_ID int auto_increment
       primary key,
   Date     date null,
   Time     time null,
   SuID     int  null,
   EID      int  null,
   constraint order_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete set null,
   constraint order_supplier_SuID_fk
       foreign key (SuID) references supplier (SuID)
           on update cascade on delete set null
);

create index EID
   on `order` (EID);

create index SuID
   on `order` (SuID);

create table service
(
   SID    int auto_increment
       primary key,
   SPrice float        not null,
   SName  varchar(255) not null
);

create table stylist
(
   EID int not null
       primary key,
   constraint stylist_employee_EID_fk
       foreign key (EID) references employee (EID)
           on update cascade on delete cascade
);

create table supplier
(
   SuID    int auto_increment
       primary key,
   SName   varchar(100) not null,
   Email   varchar(100) not null,
   Address varchar(100) not null,
   Phone   varchar(14)  null,
   Fax     varchar(14)  null
);

create table supplies
(
   SuID         int not null,
   Product_code int not null,
   primary key (SuID, Product_code),
   constraint supplies_inventory_Product_code_fk
       foreign key (Product_code) references inventory (Product_code)
           on update cascade on delete cascade,
   constraint supplies_supplier_SuID_fk
       foreign key (SuID) references supplier (SuID)
           on update cascade on delete cascade
);

create index Product_code
   on supplies (Product_code);

create table transaction
(
   Transaction_ID    int auto_increment
       primary key,
   Date              date         not null,
   Time              time         not null,
   Amount            float        not null,
   Method_of_payment varchar(225) not null
);
