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
      price,
      buydate,
      nationalcode,
      postalcode,
      discountid,
    } = body;
    pool.query(
      "INSERT INTO orders (orderid, description, status, price, buydate, nationalcode, postalcode, discountid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);",
      [
        orderid,
        description,
        status,
        price,
        buydate,
        nationalcode,
        postalcode,
        discountid,
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
      price,
      buydate,
      nationalcode,
      postalcode,
      discountid,
    } = body;
    pool.query(
      "update orders set description = $2, status = $3 , price =$4 , buydate =$5 , nationalcode = $6, postalcode =$7, discountid =$8 where orderid = $1 ",
      [
        orderid,
        description,
        status,
        price,
        buydate,
        nationalcode,
        postalcode,
        discountid,
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
};
