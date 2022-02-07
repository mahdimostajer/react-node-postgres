const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "my_database",
  password: "1041018",
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
});

const getUsers = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM usersite", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, firstname, lastname, username, password } = body;
    pool.query(
      "Insert into logininfo (username, password) values ($1, $2)",
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          pool.query(
            "INSERT INTO usersite (nationalcode, firstname, lastname, username) VALUES ($1, $2, $3, $4);",
            [nationalcode, firstname, lastname, username],
            (error, results) => {
              if (error) {
                reject(error);
                console.log(error);
              } else {
                resolve(
                  `A new user has been added added: ${JSON.stringify(
                    results.rows[0]
                  )}`
                );
              }
            }
          );
        }
      }
    );
  });
};

const deleteUser = (merchantId) => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(merchantId);

    pool.query(
      "DELETE FROM usersite WHERE nationalcode = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Merchant deleted with ID: ${id}`);
        }
      }
    );
  });
};

const getLoginInfo = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM logininfo", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteLoginInfo = (username) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM logininfo WHERE username = $1",
      [username],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`logininfo deleted with username: ${username}`);
        }
      }
    );
  });
};

const getAddress = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM address", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteAddress = (postalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM address WHERE postalcode = $1",
      [postalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`address deleted with postalcode: ${postalcode}`);
        }
      }
    );
  });
};

const createAddress = (body) => {
  return new Promise(function (resolve, reject) {
    const { postalcode, state, city, street, vallay, plate, floor } = body;
    pool.query(
      "INSERT INTO address (postalcode, state, city, street, vallay, plate, floor) VALUES ($1, $2, $3, $4, $5, $6, $7);",
      [postalcode, state, city, street, vallay, plate, floor],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new address has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const updateAddress = (body) => {
  return new Promise(function (resolve, reject) {
    const { postalcode, state, city, street, vallay, plate, floor } = body;
    pool.query(
      "update address set state = $2, city = $3 , street =$4 , vallay =$5 , plate = $6, floor =$7 where postalcode = $1 ",
      [postalcode, state, city, street, vallay, plate, floor],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`address has been updated`);
        }
      }
    );
  });
};

const getClientAddress = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientaddress", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteClientAddress = (postalcode, nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM clientAddress WHERE postalcode = $1 and nationalcode = $2",
      [postalcode, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`clientaddress deleted with username: ${postalcode}`);
        }
      }
    );
  });
};

const createClientAddress = (body) => {
  return new Promise(function (resolve, reject) {
    const { postalcode, nationalcode } = body;
    pool.query(
      "INSERT INTO clientaddress (postalcode, nationalcode) VALUES ($1, $2);",
      [postalcode, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new clientAddress has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const getClientAddressView = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientaddressview", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getClient = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM client", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteClient = (nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM client WHERE nationalcode = $1",
      [nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`clientaddress deleted with nationalcode: ${nationalcode}`);
        }
      }
    );
  });
};

const createClient = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, wallet } = body;
    pool.query(
      "INSERT INTO client (nationalcode, wallet) VALUES ($1, $2);",
      [nationalcode, wallet],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new clientAddress has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const getClientUser = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientuser", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getManagerUser = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM manageruser", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getManager = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM manager", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getProductCategory = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM productCategory", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getProduct = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM product", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getComment = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM comment", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getLoad = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM load", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getLoadProduct = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM loadProduct", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getPurchase = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM purchase", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getDiscount = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM discount", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getDeliveryManUser = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM deliveryManUser", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getProductComment = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM productComment", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getUserOrder = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM userOrder", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const createProductCategory = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, photourl } = body;
    pool.query(
      "Insert into productCategory (name, photourl) values ($1, $2)",
      [name, photourl],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new category has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const createProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      productid,
      name,
      price,
      qty,
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      manufacturedate,
      expirationdate,
      categoryname,
    } = body;
    pool.query(
      "Insert into product (productid, name, price, qty, photo1, photo2, photo3, photo4, photo5, manufacturedate, expirationdate, categoryname) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
      [
        productid,
        name,
        price,
        qty,
        photo1,
        photo2,
        photo3,
        photo4,
        photo5,
        manufacturedate,
        expirationdate,
        categoryname,
      ],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new product has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const createComment = (body) => {
  return new Promise(function (resolve, reject) {
    const { commentid, text, time, productid, nationalcode } = body;
    pool.query(
      "Insert into comment (commentid, text, time, productid, nationalcode) values ($1, $2, $3, $4, $5)",
      [commentid, text, time, productid, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new comment has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const createLoad = (body) => {
  return new Promise(function (resolve, reject) {
    const { loadid, date, nationalcode } = body;
    pool.query(
      "Insert into load (loadid, date, nationalcode) values ($1, $2, $3)",
      [loadid, date, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new load has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const createLoadProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const { productid, loadid, qty } = body;
    pool.query(
      "Insert into loadproduct (productid, loadid, qty) values ($1, $2, $3)",
      [productid, loadid, qty],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new loadProduct has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const createPurchase = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, orderid, productid, productqty } = body;
    pool.query(
      "Insert into purchase (nationalcode, orderid, productid, productqty) values ($1, $2, $3, $4)",
      [nationalcode, orderid, productid, productqty],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new purchase has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const createDiscount = (body) => {
  return new Promise(function (resolve, reject) {
    const { discountid, nationalcode, amount, max, enddate } = body;
    pool.query(
      "Insert into discount (discountid, nationalcode, amount, max, enddate) values ($1, $2, $3, $4, $5)",
      [discountid, nationalcode, amount, max, enddate],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new discount has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const deleteProductCategory = (name) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM ProductCategory WHERE name = $1",
      [name],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`ProductCategory deleted with name: ${name}`);
        }
      }
    );
  });
};

const deleteProduct = (productId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Product WHERE productId = $1",
      [productId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Product deleted with id: ${productId}`);
        }
      }
    );
  });
};

const deleteComment = (commentId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Comment WHERE commentid = $1",
      [commentId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Comment deleted with id: ${commentId}`);
        }
      }
    );
  });
};

const deleteLoad = (loadId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Load WHERE loadId = $1",
      [loadId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Load deleted with id: ${loadId}`);
        }
      }
    );
  });
};

const deleteLoadProduct = (productId, loadId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM LoadProduct WHERE productId = $1 and loadId = $2",
      [productId, loadId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            `LoadProduct deleted with productId: ${productId} and loadId: ${loadId}`
          );
        }
      }
    );
  });
};

const deletePurchase = (nationalCode, orderId, productId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Purchase WHERE nationalCode = $1 and orderId = $2 and productId = $3",
      [nationalCode, orderId, productId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Purchase deleted`);
        }
      }
    );
  });
};

const deleteDiscount = (discountId) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM Discount WHERE discountId = $1",
      [discountId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`Discount deleted with id: ${discountId}`);
        }
      }
    );
  });
};

const getUserPhone = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM userphone", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const getOrder = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM orders", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteOrder = (orderid) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM orders WHERE orderid = $1",
      [orderid],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`order deleted with orderid: ${orderid}`);
        }
      }
    );
  });
};

const createOrder = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      orderid,
      description,
      status,
      totalprice,
      buydate,
      nationalcode,
      postalcode,
      discountid,
      finalprice,
    } = body;
    pool.query(
      "INSERT INTO orders (orderid, description, status, totalprice, buydate, nationalcode, postalcode, discountid, finalprice) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);",
      [
        orderid,
        description,
        status,
        totalprice,
        buydate,
        nationalcode,
        postalcode,
        discountid,
        finalprice,
      ],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new order has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const getClientDiscount = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM clientdiscount", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteClientDiscount = (discountid, nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM clientdiscount WHERE discountid = $1 and nationalcode = $2",
      [discountid, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`clientdiscount deleted with username: ${discountid}`);
        }
      }
    );
  });
};

const createClientDiscount = (body) => {
  return new Promise(function (resolve, reject) {
    const { discountid, nationalcode } = body;
    pool.query(
      "INSERT INTO clientdiscount (discountid, nationalcode) VALUES ($1, $2);",
      [discountid, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new clientdiscount has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const getOrderAddress = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM orderaddress", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const updateUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, firstname, lastname } = body;
    pool.query(
      "update usersite set firstname = $2, lastname = $3 where nationalcode = $1 ",
      [nationalcode, firstname, lastname],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`user has been updated`);
        }
      }
    );
  });
};

const updateLogininfo = (body) => {
  return new Promise(function (resolve, reject) {
    const { username, password } = body;
    pool.query(
      "update logininfo set password = $2 where username = $1 ",
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`logininfo has been updated`);
        }
      }
    );
  });
};

const updateOrder = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      orderid,
      description,
      status,
      totalprice,
      buydate,
      nationalcode,
      postalcode,
      discountid,
      finalprice,
    } = body;
    pool.query(
      "update orders set description = $2, status = $3 , totalprice =$4 , buydate =$5 , nationalcode = $6, postalcode =$7, discountid =$8, finalprice=$9 where orderid = $1 ",
      [
        orderid,
        description,
        status,
        totalprice,
        buydate,
        nationalcode,
        postalcode,
        discountid,
        finalprice,
      ],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`order has been updated`);
        }
      }
    );
  });
};

const deleteUserPhone = (nationalcode, phoneno) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM userphone WHERE nationalcode = $1 and phoneno = $2",
      [nationalcode, phoneno],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            `userphone deleted with nationalcode: ${nationalcode} and phoneno: ${phoneno}`
          );
        }
      }
    );
  });
};

const createUserPhone = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, phoneno } = body;
    pool.query(
      "INSERT INTO userphone (nationalcode, phoneno) VALUES ($1, $2);",
      [nationalcode, phoneno],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new userphone has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const updateUserPhone = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, phoneno } = body;
    pool.query(
      "update userphone set phoneno = $2 where nationalcode = $1 ",
      [nationalcode, phoneno],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`userphone has been updated`);
        }
      }
    );
  });
};

const getNotification = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM notification", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteNotification = (notifid) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM address WHERE notifid = $1",
      [notifid],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`notification deleted with notifid: ${notifid}`);
        }
      }
    );
  });
};

const createNotification = (body) => {
  return new Promise(function (resolve, reject) {
    const { notifid, date, text, seenstatus, nationalcode } = body;
    pool.query(
      "INSERT INTO notification ( notifid, date, text, seenstatus, nationalcode ) VALUES ($1, $2, $3, $4, $5);",
      [notifid, date, text, seenstatus, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new notification has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const updateNotification = (body) => {
  return new Promise(function (resolve, reject) {
    const { notifid, date, text, seenstatus, nationalcode } = body;
    pool.query(
      "update address set date = $2, text = $3 , seenstatus =$4 , nationalcode =$5 where notifid = $1 ",
      [notifid, date, text, seenstatus, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`notification has been updated`);
        }
      }
    );
  });
};

const getDeliveryMan = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM deliveryman", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteDeliveryMan = (nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM deliveryman WHERE nationalcode = $1",
      [nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`deliveryman deleted with nationalcode: ${nationalcode}`);
        }
      }
    );
  });
};

const createDeliveryMan = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      nationalcode,
      salary,
      workhour,
      startdate,
      capacity,
      plateno,
      vehicletype,
    } = body;
    pool.query(
      "INSERT INTO deliveryman (nationalcode, salary, workhour, startdate, capacity, plateno, vehicletype) VALUES ($1, $2, $3, $4, $5, $6, $7);",
      [
        nationalcode,
        salary,
        workhour,
        startdate,
        capacity,
        plateno,
        vehicletype,
      ],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new deliveryman has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const updateDeliveryMan = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      nationalcode,
      salary,
      workhour,
      startdate,
      capacity,
      plateno,
      vehicletype,
    } = body;
    pool.query(
      "update deliveryman set salary = $2, workhour = $3 , startdate =$4 , capacity =$5 , plateno = $6, vehicletype =$7 where nationalcode = $1 ",
      [
        nationalcode,
        salary,
        workhour,
        startdate,
        capacity,
        plateno,
        vehicletype,
      ],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`deliveryman has been updated`);
        }
      }
    );
  });
};

const deleteManager = (nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM manager WHERE nationalcode = $1",
      [nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`manager deleted with nationalcode: ${nationalcode}`);
        }
      }
    );
  });
};

const createManager = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, salary, workhour, startdate } = body;
    pool.query(
      "INSERT INTO manager (nationalcode, salary, workhour, startdate) VALUES ($1, $2, $3, $4);",
      [nationalcode, salary, workhour, startdate],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new manager has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const updateManager = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, salary, workhour, startdate } = body;
    pool.query(
      "update manager set salary = $2, workhour = $3 , startdate =$4 where nationalcode = $1 ",
      [nationalcode, salary, workhour, startdate],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`manager has been updated`);
        }
      }
    );
  });
};

const getStoreKeeper = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM storekeeper", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deletestorekeeper = (nationalcode) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM storekeeper WHERE nationalcode = $1",
      [nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(`storekeeper deleted with nationalcode: ${nationalcode}`);
        }
      }
    );
  });
};

const createStoreKeeper = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, salary, workhour, startdate } = body;
    pool.query(
      "INSERT INTO manager (nationalcode, salary, workhour, startdate) VALUES ($1, $2, $3, $4);",
      [nationalcode, salary, workhour, startdate],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new storekeeper has been added: ${JSON.stringify(
              results.rows[0]
            )}`
          );
        }
      }
    );
  });
};

const updateStorekeeper = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, salary, workhour, startdate } = body;
    pool.query(
      "update storekeeper set salary = $2, workhour = $3 , startdate =$4 where nationalcode = $1 ",
      [nationalcode, salary, workhour, startdate],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`storekeeper has been updated`);
        }
      }
    );
  });
};

const getDelivery = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM delivery", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results.rows);
      }
    });
  });
};

const deleteDelivery = (orderid, deliveryman, storekeeper) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "DELETE FROM delivery WHERE orderid = $1 and deliveryman = $2 and storekeeper = $3",
      [orderid, deliveryman, storekeeper],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            `delivery deleted with orderid: ${orderid} and deliveryman: ${deliveryman} and storekeeper: ${storekeeper}`
          );
        }
      }
    );
  });
};

const createDelivery = (body) => {
  return new Promise(function (resolve, reject) {
    const { orderid, deliveryman, storekeeper } = body;
    pool.query(
      "INSERT INTO delivery (orderid, deliveryman, storekeeper) VALUES ($1, $2, $3);",
      [orderid, deliveryman, storekeeper],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(
            `A new delivery has been added: ${JSON.stringify(results.rows[0])}`
          );
        }
      }
    );
  });
};

const updateProductCategory = (body) => {
  return new Promise(function (resolve, reject) {
    const { photourl } = body;
    pool.query(
      "update productcategory set photourl = $1",
      [photourl],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`productCategory has been updated`);
        }
      }
    );
  });
};

const updateProduct = (body) => {
  return new Promise(function (resolve, reject) {
    const { name, price, qty, photo1, photo2, photo3, photo4, photo5, manufacturedate, expirationdate, categoryname } = body;
    pool.query(
      "update product set name = $1, price = $2, qty = $3, photo1 = $4, photo2 = $5, photo3 = $6, photo4 = $7, photo5 = $8, manufactureDate = $9, expirationDate = $10, categoryName = $11",
      [name, price, qty, photo1, photo2, photo3, photo4, photo5, manufacturedate, expirationdate, categoryname],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`product has been updated`);
        }
      }
    );
  });
};

const updateComment = (body) => {
  return new Promise(function (resolve, reject) {
    const { text, time, productid, nationalcode } = body;
    pool.query(
      "update comment set text = $1, time = $2, productId = $3, nationalCode = $4 ",
      [text, time, productdd, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`comment has been updated`);
        }
      }
    );
  });
};

const updateLoad = (body) => {
  return new Promise(function (resolve, reject) {
    const { date, nationalcode } = body;
    pool.query(
      "update load set date = $1, nationalcode = $2",
      [date, nationalcode],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`load has been updated`);
        }
      }
    );
  });
};

const updatePurchase = (body) => {
  return new Promise(function (resolve, reject) {
    const { productqty } = body;
    pool.query(
      "update purchase set productqty = $1",
      [productqty],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`purchase has been updated`);
        }
      }
    );
  });
};

const updateDiscount = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalcode, amount, max, enddate } = body;
    pool.query(
      "update discount set nationalCode = $1, amount = $2, max = $3, endDate = $4 ",
      [nationalcode, amount, max, enddate],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`discount has been updated`);
        }
      }
    );
  });
};

const updateDeliveryManUser = (body) => {
  return new Promise(function (resolve, reject) {
    const {  capacity, plateNo, vehicleType ,salary, workHour, startDate, firstName, lastName, username } = body;
    pool.query(
      "update deliveryManUser set capacity = $1, plateNo = $2, vehicleType = $3 ,salary = $4, workHour = $5, startDate = $6, firstName = $7, lastName = $8, username = $9 ",
      [ capacity, plateNo, vehicleType ,salary, workHour, startDate, firstName, lastName, username],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`deliveryManUser has been updated`);
        }
      }
    );
  });
};

const updateProductComment = (body) => {
  return new Promise(function (resolve, reject) {
    const { nationalCode, productName,text, time } = body;
    pool.query(
      "update ProductComment set nationalCode = $1, productName = $2, text = $3, time = $4 ",
      [nationalCode, productName,text, time],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`ProductComment has been updated`);
        }
      }
    );
  });
};

const updateClientOrder = (body) => {
  return new Promise(function (resolve, reject) {
    const { description, status, price, buyDate, firstName, lastName } = body;
    pool.query(
      "update ClientOrder set description = $1, status = $2, price = $3, buyDate = $4, firstName = $5, lastName = $6 ",
      [description, status, price, buyDate, firstName, lastName],
      (error, results) => {
        if (error) {
          reject(error);
          console.log(error);
        } else {
          resolve(`ClientOrder has been updated`);
        }
      }
    );
  });
};



module.exports = {
  getUsers,
  createUser,
  deleteUser,
  getLoginInfo,
  deleteLoginInfo,
  getAddress,
  deleteAddress,
  createAddress,
  getClientAddress,
  deleteClientAddress,
  createClientAddress,
  getClientAddressView,
  getClient,
  deleteClient,
  createClient,
  getClientUser,
  getManager,
  getProductCategory,
  getProduct,
  getComment,
  getLoad,
  getLoadProduct,
  getPurchase,
  getDiscount,
  getDeliveryManUser,
  getProductComment,
  getUserOrder,
  createProductCategory,
  createProduct,
  createComment,
  createLoad,
  createLoadProduct,
  createPurchase,
  createDiscount,
  deleteProductCategory,
  deleteProduct,
  deleteComment,
  deleteLoad,
  deleteLoadProduct,
  deletePurchase,
  deleteDiscount,
  getUserPhone,
  updateAddress,
  getManagerUser,
  getOrder,
  deleteOrder,
  createOrder,
  getClientDiscount,
  deleteClientDiscount,
  createClientDiscount,
  getOrderAddress,
  updateUser,
  updateLogininfo,
  updateOrder,
  deleteUserPhone,
  createUserPhone,
  updateUserPhone,
  getNotification,
  deleteNotification,
  createNotification,
  updateNotification,
  getDeliveryMan,
  deleteDeliveryMan,
  createDeliveryMan,
  updateDeliveryMan,
  deleteManager,
  createManager,
  updateManager,
  getStoreKeeper,
  deletestorekeeper,
  createStoreKeeper,
  updateStorekeeper,
  getDelivery,
  deleteDelivery,
  createDelivery,
  updateProductCategory,
  updateProduct,
  updateComment,
  updateLoad,
  updatePurchase,
  updateDiscount,
  updateDeliveryManUser,
  updateProductComment,
  updateClientOrder,
};
