const express = require("express");
const app = express();
const port = 3001;
const model = require("./model");
app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/users", (req, res) => {
  model
    .getUsers()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});
/* app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
}) */

app.post("/users", (req, res) => {
  model
    .createUser(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/users/:id", (req, res) => {
  model
    .deleteUser(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/logininfo", (req, res) => {
  model
    .getLoginInfo()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/logininfo/:username", (req, res) => {
  model
    .deleteLoginInfo(req.params.username)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/address", (req, res) => {
  model
    .getAddress()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/address/:postalcode", (req, res) => {
  model
    .deleteAddress(req.params.postalcode)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/address", (req, res) => {
  model
    .createAddress(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/clientaddress", (req, res) => {
  model
    .getClientAddress()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/clientaddress/:postalcode/:nationalcode", (req, res) => {
  model
    .deleteClientAddress(req.params.postalcode, req.params.nationalcode)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/clientaddress", (req, res) => {
  model
    .createClientAddress(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/clientaddressview", (req, res) => {
  model
    .getClientAddressView()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/client", (req, res) => {
  model
    .getClient()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/client/:nationalcode", (req, res) => {
  model
    .deleteClient(req.params.nationalcode)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/client", (req, res) => {
  model
    .createClient(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/clientuser", (req, res) => {
  model
    .getClientUser()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/manager", (req, res) => {
  model
    .getManager()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/productCategory", (req, res) => {
  model
    .getProductCategory()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/product", (req, res) => {
  model
    .getProduct()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/comment", (req, res) => {
  model
    .getComment()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/load", (req, res) => {
  model
    .getLoad()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/loadProduct", (req, res) => {
  model
    .getLoadProduct()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/purchase", (req, res) => {
  model
    .getPurchase()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/discount", (req, res) => {
  model
    .getDiscount()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/deliveryManUser", (req, res) => {
  model
    .getDeliveryManUser()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/productComment", (req, res) => {
  model
    .getProductComment()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/userOrder", (req, res) => {
  model
    .getUserOrder()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/productCategory", (req, res) => {
  model
    .createProductCategory(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/product", (req, res) => {
  model
    .createProduct(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/comment", (req, res) => {
  model
    .createComment(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/load", (req, res) => {
  model
    .createLoad(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/loadProduct", (req, res) => {
  model
    .createLoadProduct(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/purchase", (req, res) => {
  model
    .createPurchase(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/discount", (req, res) => {
  model
    .createDiscount(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/productCategory/:name", (req, res) => {
  model
    .deleteProductCategory(req.params.name)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/product/:productId", (req, res) => {
  model
    .deleteProduct(req.params.productId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/comment/:commentId", (req, res) => {
  model
    .deleteComment(req.params.commentId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/load/:loadId", (req, res) => {
  model
    .deleteLoad(req.params.loadId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/loadProduct/:productId/:loadId", (req, res) => {
  model
    .deleteLoadProduct(req.params.productId, req.params.loadId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/purchase/:nationalcode/:orderId/:productId", (req, res) => {
  model
    .deletePurchase(
      req.params.nationalcode,
      req.params.orderId,
      req.params.productId
    )
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/discount/:discountId", (req, res) => {
  model
    .deleteDiscount(req.params.discountId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/userphone", (req, res) => {
  model
    .getUserPhone()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/address", (req, res) => {
  model
    .updateAddress(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
