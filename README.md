```sql
create table LoginInfo (username varchar(30), password varchar(30), primary key(username),check (length(password) > 8));


create table usersite (nationalcode char(10), firstname varchar(30), lastname varchar(30) ,username varchar(30),
		       primary key(nationalcode), foreign key(username) references logininfo(username) on update cascade on delete cascade ,check (length(nationalcode) = 10));


create table Address (postalCode char(10), state varchar(12), city varchar(12), street varchar(12), vallay varchar(12), plate integer,
		      floor integer, primary key (postalCode), check (length(postalCode) = 10));


create table ClientAddress (postalcode char(10), nationalcode char(10), primary key (postalcode, nationalcode),
			    foreign key (postalcode) references address(postalcode) on update cascade on delete cascade,
			    foreign key (nationalcode) references client(nationalcode) on update cascade on delete cascade);


create table StoreStatus (tdate date, poroductsQty integer, sellQty integer, primary key(tdate));




create table Client(nationalCode char(10), wallet integer, primary key (nationalCode), foreign key(nationalCode) references usersite(nationalCode));
--
-- create table Client (nationalcode char(10), wallet integer, primary key(nationalcode),
-- 					 foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade);

-- //UserPhone
create table UserPhone(nationalCode char(10), phoneNo integer, primary key(nationalCode, phoneNo), foreign key(nationalCode) references usersite(nationalCode));

-- //Notification
create table Notification(notifId char(10), date date, text varchar(1024), seenStatus boolean, nationalCode char(10), primary key(notifId), foreign key(nationalCode) references usersite(nationalCode));

-- //DeliveryMan
create table DeliveryMan(nationalCode char(10), salary integer, workHour integer,startDate date, capacity integer, plateNo char(20), vehicleType varchar(15), primary key(nationalCode), foreign key(nationalCode) references usersite(nationalCode));

-- //Manager
create table Manager(nationalCode char(10), salary integer, workHour integer, startDate Date, primary key(nationalCode), foreign key (nationalCode) references usersite(nationalCode));

create table Discount(discountId char(10), nationalCode char(10), amount integer, max integer, endDate date,
	 primary key (discountId), foreign key (nationalCode) references Manager(nationalCode) on delete cascade on update cascade,
	 check(amount>0 and amount <= 100 and max>0));



-- //StoreKeeper
create table StoreKeeper(nationalCode char(10), salary integer, workHour integer, startDate Date, primary key(nationalCode), foreign key (nationalCode) references usersite(nationalCode));

create table Orders (orderId char(10), description varchar(200), status varchar(15), price integer, buyDate date, nationalcode char(10), postalcode char(10), discountid char(10) unique,
				   primary key(orderId), foreign key (postalcode) references address(postalcode) on update cascade on delete cascade,
				   foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade,
				   foreign key (discountid) references discount(discountid) on update cascade on delete cascade, check (price >= 0), check(status In('processing','sending','delivered')));

-- //Delivery
create table Delivery(orderId char(10), deliveryMan char(10), storeKeeper char(10), primary Key(orderId, deliveryMan, storeKeeper),
foreign Key(orderId) references Orders(orderId), foreign Key(deliveryMan) references DeliveryMan(nationalCode), foreign Key(storeKeeper) references StoreKeeper(nationalCode));

--
-- create table Manager (nationalcode char(10) primary key, salary integer, workhour integer, startDate date,
-- 					 foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade);


create table clientdiscount (discountid char(10), nationalcode char(10), primary key(discountid, nationalcode),
					     foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade,
				             foreign key (discountid) references discount(discountid) on update cascade on delete cascade);









create table ProductCategory (name varchar(20), photourl varchar(2048), primary key (name));


create table Product (productId char(10), name varchar(20), price integer, qty integer,
	 	photo1 varchar(2048), photo2 varchar(2048), photo3 varchar(2048), photo4 varchar(2048), photo5 varchar(2048),
	  manufactureDate date, expirationDate date, categoryName varchar(20),
		primary key(productId), foreign key(categoryName) references ProductCategory(name) on update cascade on delete cascade ,
		check ((expirationDate > manufactureDate) and (qty >= 0) and (price >= 0))
	);


create table Comment(commentId char(10), text varchar(1024), time date, productId char(10), nationalCode char(10), primary key(commentId), foreign key(nationalCode) references Client(nationalCode));


create table Load(loadId char(10), date date, nationalCode char(10), primary key(loadId), foreign key(nationalCode) references Manager(nationalCode));


create table LoadProduct(productId char(10), loadId char(10), qty integer, primary key(productId, loadId), foreign key (productId) references Product(productId) on update cascade on delete cascade, foreign key (loadId) references Load(loadId) on delete cascade on update cascade);


create table Purchase(nationalCode char(10), orderId char(10), productId char(10), productQty integer,
	 primary key(nationalCode, orderId, productId),
	 foreign key(nationalCode) references Client(nationalCode), foreign key(orderId) references Orders(orderId),
	 foreign key(productId) references Product(productId), check(productQty>=0));
```
