```sql
create domain pw as varchar(30) check (length(value) > 8);
create domain wallet as integer check (value >= 0);
create domain qty as integer check (value >= 0);


create table LoginInfo (username varchar(30), password PW, primary key(username));

create table usersite (nationalcode char(10), firstname varchar(30), lastname varchar(30) ,username varchar(30),
		       primary key(nationalcode), foreign key(username) references logininfo(username) on update cascade on delete cascade, check(length(nationalcode)=10) );


create table Client(nationalCode char(10), wallet wallet, primary key (nationalCode), foreign key(nationalCode) references usersite(nationalCode));
--
-- create table Client (nationalcode char(10), wallet wallet, primary key(nationalcode),
-- 					 foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade);

-- //UserPhone

create table Address (postalCode char(10), state varchar(12), city varchar(12), street varchar(12), vallay varchar(12), plate integer,
		      floor integer, primary key (postalCode));


create table ClientAddress (postalcode char(10), nationalcode char(10), primary key (postalcode, nationalcode),
			    foreign key (postalcode) references address(postalcode) on update cascade on delete cascade,
			    foreign key (nationalcode) references client(nationalcode) on update cascade on delete cascade);


create table StoreStatus (tdate date, poroductsQty integer, sellQty integer, primary key(tdate));



create table UserPhone(nationalCode char(10), phoneNo char(11), primary key(nationalCode, phoneNo), 
foreign key(nationalCode) references usersite(nationalCode));

-- //Notification
create table Notification(notifId char(10), date date, text varchar(1024), seenStatus boolean, nationalCode char(10), primary key(notifId), foreign key(nationalCode) references usersite(nationalCode));

-- //DeliveryMan
create table DeliveryMan(nationalCode char(10), salary integer, workHour integer,startDate Date, capacity integer, plateNo char(20), vehicleType varchar(15), primary key(nationalCode), foreign key(nationalCode) references usersite(nationalCode), check(salary>3000000 and 0 <= workhour and 12 <= workhour and 0 < capacity));

-- //Manager
create table Manager(nationalCode char(10), salary integer, workHour integer, startDate Date, primary key(nationalCode), foreign key (nationalCode) references usersite(nationalCode));

create table Discount(discountId char(10), nationalCode char(10), amount integer, max integer, endDate date,
	 primary key (discountId), foreign key (nationalCode) references Manager(nationalCode) on delete cascade on update cascade,
	 check(amount>0 and amount <= 100 and max>0));



-- //StoreKeeper
create table StoreKeeper(nationalCode char(10), salary integer, workHour integer, startDate Date, primary key(nationalCode), foreign key (nationalCode) references usersite(nationalCode));

create table Orders (orderId char(10), description varchar(200), status integer, price integer, buyDate date, nationalcode char(10), postalcode char(10), discountid char(10) unique,
				   primary key(orderId), foreign key (postalcode) references address(postalcode) on update cascade on delete cascade,
				   foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade,
				   foreign key (discountid) references discount(discountid) on update cascade on delete cascade, check (price >= 0), check(status In(0,1,2)));

-- //Delivery
create table Delivery(orderId char(10), deliveryMan char(10), storeKeeper char(10), primary Key(orderId, deliveryMan, storeKeeper),
foreign Key(orderId) references Orders(orderId), foreign Key(deliveryMan) references DeliveryMan(nationalCode), foreign Key(storeKeeper) references StoreKeeper(nationalCode));

--
-- create table Manager (nationalcode char(10) primary key, salary integer, workhour integer, startDate date,
-- 					 foreign key (nationalcode) references usersite(nationalcode) on update cascade on delete cascade);


create table clientdiscount (discountid char(10), nationalcode char(10), primary key(discountid, nationalcode),
					     foreign key (nationalcode) references client(nationalcode) on update cascade on delete cascade,
				             foreign key (discountid) references discount(discountid) on update cascade on delete cascade);









create table ProductCategory (name varchar(20), photourl varchar(2048), primary key (name));


create table Product (productId char(10), name varchar(20), price integer, qty qty,
	 	photo1 varchar(2048), photo2 varchar(2048), photo3 varchar(2048), photo4 varchar(2048), photo5 varchar(2048),
	  manufactureDate date, expirationDate date, categoryName varchar(20),
		primary key(productId), foreign key(categoryName) references ProductCategory(name) on update cascade on delete cascade ,
		check ((expirationDate > manufactureDate) and (price >= 0))
	);


create table Comment(commentId char(10), text varchar(1024), time date, productId char(10), nationalCode char(10), primary key(commentId), foreign key(nationalCode) references Client(nationalCode), foreign key(productId) references Product(productId) on update cascade on delete cascade);


create table Load(loadId char(10), date date, nationalCode char(10), primary key(loadId), foreign key(nationalCode) references Manager(nationalCode));


create table LoadProduct(productId char(10), loadId char(10), qty integer, primary key(productId, loadId), foreign key (productId) references Product(productId) on update cascade on delete cascade, foreign key (loadId) references Load(loadId) on delete cascade on update cascade);


create table Purchase(nationalCode char(10), orderId char(10), productId char(10), productQty qty,
	 primary key(nationalCode, orderId, productId),
	 foreign key(nationalCode) references Client(nationalCode), foreign key(orderId) references Orders(orderId),
	 foreign key(productId) references Product(productId));


	 
create view ClientAddressView as (select nationalCode, firstname, lastname, postalCode, state, city, street, vallay, plate, floor 
				  from (clientaddress natural join address) natural join usersite);


create view ClientUser as (select nationalCode, wallet, firstName, lastName, username 
			   from client natural join usersite);


create view OrderAddress as (select OrderId, postalCode, state, city, street, vallay, plate, floor
			     from orders natural join address);


create view ManagerUser as (select nationalCode, workHour, startDate , salary , firstName, lastName, username
			    from manager natural join usersite);

create view deliveryManUser as
  select usersite.nationalCode,deliveryMan.capacity, deliveryMan.plateNo, deliveryMan.vehicleType, deliveryMan.salary, deliveryMan.workHour, deliveryMan.startDate, usersite.firstName, usersite.lastName, usersite.username
  from (deliveryman join usersite on deliveryMan.nationalCode = usersite.nationalCode);

create view productComment as
  select product.productId, comment.commentId, comment.nationalCode, product.name as productName, comment.text, comment.time
  from (product join comment on product.productid = comment.productid);

create view userOrder as
  select orders.orderId, orders.description, orders.status, orders.price, orders.buyDate, usersite.firstname, usersite.lastname from (usersite join orders on usersite.nationalCode = orders.nationalCode);

create view ClientDiscountView as
  select ClientDiscount.discountId, ClientDiscount.nationalCode, Discount.amount, Discount.max, Discount.endDate
  from (ClientDiscount join Discount on ClientDiscount.discountId = Discount.discountId and ClientDiscount.nationalCode = Discount.nationalCode );

create view OrderProduct as
  select  Product.productId, Purchase.productQTY, Product.name as productName, Product.price as productPrice, Orders.orderId
  from (Product NATURAL JOIN Orders NATURAL JOIN Purchase);

create view Employee as
	select Manager.nationalCode, Manager.salary, Manager.workHour, Manager.startDate, Usersite.firstName, Usersite.lastName from(Manager NATURAL JOIN Usersite)
        UNION ALL
        select StoreKeeper.nationalCode, StoreKeeper.salary, StoreKeeper.workHour, StoreKeeper.startDate, Usersite.firstName, Usersite.lastName from(StoreKeeper NATURAL JOIN Usersite)
        UNION ALL
        select DeliveryMan.nationalCode, DeliveryMan.salary, DeliveryMan.workHour, DeliveryMan.startDate, Usersite.firstName, Usersite.lastName from(DeliveryMan NATURAL JOIN Usersite);

create view ProductSellCount as
	select Purchase.productId, Product.name, Product.qty
	from (Purchase Natural join Product);





create or replace function insertClientAddressProc() returns trigger as $psql$
begin
  insert into address values (new.postalCode, new.state,new.city, new.street,new.vallay,new.plate,new.floor);
  insert into clientAddress values (new.postalCode,new.nationalCode);
  return new;
end;
$psql$ language plpgsql;

create trigger insertClientAddress
  instead of insert on clientAddressView
  for each row
  execute procedure insertClientAddressProc();

create or replace function deleteClientAddressProc() returns trigger as $psql$
begin
  delete from clientAddress where clientAddress.nationalCode = old.nationalCode;
  return old;
end;
$psql$ language plpgsql;

create trigger deleteClientAddress
instead of delete on clientAddressView
for each row
execute procedure deleteClientAddressProc();


create or replace function updateClientAddressProc() returns trigger as $psql$
begin
  update Address set state = new.state, city = new.city, street = new.street, vallay = new.vallay, plate = new.plate, floor = new.floor where clientAddress.postalCode = old.postalCode;
  return old;
end;
$psql$ language plpgsql;

create trigger updateClientAddress
instead of update on clientAddressView
for each row
execute procedure updateClientAddressProc();


create or replace function updateClientUserProc() returns trigger as $psql$
begin
  update client set wallet = new.wallet where client.nationalCode = old.nationalCode;
  update usersite set firstname = new.firstname, lastName = new.lastName where usersite.nationalCode = old.nationalCode;
  return old;
end;
$psql$ language plpgsql;

create trigger updateClientUser
instead of update on ClientUser
for each row
execute procedure updateClientUserProc();


create or replace function updateManagerUserProc() returns trigger as $psql$
begin
  update manager set salary = new.salary, workHour = new.workHour, startDate = new.startDate where manager.nationalCode = old.nationalCode;
  update usersite set firstname = new.firstname, lastName = new.lastName where usersite.nationalCode = old.nationalCode;
  return old;
end;
$psql$ language plpgsql;

create trigger updateManagerUser
instead of update on ManagerUser
for each row
execute procedure updateManagerUserProc();


create or replace function insertPurchaseUpdateOrderPriceProc() returns trigger as $psql$
begin
  update orders set
    totalPrice = totalPrice + (new.productQty * (select price from product where new.productId = productId)),
    finalPrice = finalPrice + (new.productQty * (select price from product where new.productId = productId) * (select amount from discount where new.discountId = discountId)/100)
    where new.orderId = orderId;

  update product set qty = qty - new.productQty where new.productId = productId;

  if ((select (totalPrice - finalPrice) from orders where new.orderId = orderId )>(select max from discount where new.discountId = discountId)) THEN
      update orders set
        finalPrice = totalPrice - (select max from discount where new.discountId = discountId)
        where new.orderId = orderId;
  end if;
  return new;
end;
$psql$ language plpgsql;

create trigger insertPurchaseUpdateOrderPrice
  after insert on Purchase
  for each row
  execute procedure insertPurchaseUpdateOrderPriceProc();



create or replace function updateOrderPriceUpdateWalletProc() returns trigger as $psql$
begin
  if (new.finalPrice != old.finalPrice) then
  update client set
    wallet = wallet - (new.finalPrice - old.finalPrice)
    where new.nationalCode = nationalCode;
  end if;

  return new;
end;
$psql$ language plpgsql;

create trigger updateOrderPriceUpdateWallet
  after update on orders
  for each row
  execute procedure updateOrderPriceUpdateWalletProc();

create or replace function insertLoadProductUpdateProductQtyProc() returns trigger as $psql$
begin
update product set qty = qty + new.qty where productId = new.productId;
return new;
end;
$psql$ language plpgsql;

create trigger insertLoadProductUpdateProductQty
after insert on loadProduct
for each row
execute procedure insertLoadProductUpdateProductQtyProc();

create or replace function updateDeliveryManUserProc() returns trigger as $psql$
begin
  update DeliveryMan set salary = new.salary, workHour = new.workHour, startDate = new.startDate, capacity = new.capacity, plateNo = new.plateNo, vehicleType = new.vehicleType where DeliveryMan.nationalCode = old.nationalCode;
  update users set firstname = new.firstname, lastName = new.lastName where users.nationalCode = old.nationalCode;
  return old;
end;
$psql$ language plpgsql;

create trigger updateDeliveryManUser
instead of update on deliveryManUser
for each row
execute procedure updateDeliveryManUserProc();


create or replace function insertProductCommentProc() returns trigger as $psql$
begin
  insert into Product values (new.productId, new.productName, null, null, null, null, null, null, null, null, null, null);
  insert into Comment values (new.commentId, new.text, new.time, new.productId, new.nationalCode);
  return new;
end;
$psql$ language plpgsql;

create trigger insertProductComment
  instead of insert on ProductComment
  for each row
  execute procedure insertProductCommentProc();




create or replace function updateOrderStatusInsertNotifProc() returns trigger as $psql$
begin
  if new.status != old.status then
    if new.status = 0 then
      if old.status = 1 then
        raise exception 'cant change sent to processing';
      end if;
      if old.status = 2 then
        raise exception 'cant change delivered to processing';
      end if;
     insert into Notification (notifId, date, text, seenStatus, nationalCode) values ((SELECT substr(md5(random()::text),0,11)),now(),concat('status of order ',new.orderId,' has changed to processing'),0,new.nationalCode);
    end if;

    if new.status = 1 then
      if old.status = 2 then
        raise exception 'cant change delivered to sent';
      end if;
     insert into Notification (notifId, date, text, seenStatus, nationalCode) values ((SELECT substr(md5(random()::text),0,11)),now(),concat('status of order ',new.orderId,' has changed to sent'),0,new.nationalCode);
    end if;

    if new.status = 2 then
     insert into Notification (notifId, date, text, seenStatus, nationalCode) values ((SELECT substr(md5(random()::text),0,11)),now(),concat('status of order ',new.orderId,' has changed to delivered'),0,new.nationalCode);
    end if;

  end if;
  return new;
end;
$psql$ language plpgsql;

create trigger updateOrderStatusInsertNotif
  after update on orders
  for each row
  execute procedure updateOrderStatusInsertNotifProc();




create or replace function insertDeliveryUpdateOrderStatusProc() returns trigger as $psql$
begin
  update orders set status = 1 where orderId = new.orderId;
  return new;
end;
$psql$ language plpgsql;

create trigger insertDeliveryUpdateOrderStatus
  after insert on delivery
  for each row
  execute procedure insertDeliveryUpdateOrderStatusProc();






```
