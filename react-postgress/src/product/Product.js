import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import ProductForm from "./Form";

export default function Product() {
  const [product, setProduct] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  function getProduct() {
    fetch("http://localhost:3001/product")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setProduct(JSON.parse(data));
      });
  }

  function deleteProduct(productid) {
    fetch(`http://localhost:3001/product/${productid}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getProduct();
      });
  }

  function createProduct(data) {
    fetch("http://localhost:3001/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getProduct();
      });
  }

  const columns = [
    {
      title: "productid",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "photo1",
      dataIndex: "photo1",
      key: "photo1",
    },
    {
      title: "photo2",
      dataIndex: "photo2",
      key: "photo2",
    },
    {
      title: "photo3",
      dataIndex: "photo3",
      key: "photo3",
    },
    {
      title: "photo4",
      dataIndex: "photo4",
      key: "photo4",
    },
    {
      title: "photo5",
      dataIndex: "photo5",
      key: "photo5",
    },
    {
      title: "manufacturedate",
      dataIndex: "manufacturedate",
      key: "manufacturedate",
    },
    {
      title: "expirationdate",
      dataIndex: "expirationdate",
      key: "expirationdate",
    },
    {
      title: "categoryname",
      dataIndex: "categoryname",
      key: "categoryname",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteProduct(record.productid)}>delete</Button>
      ),
    },
  ];

  return (
    <div>
      <Button
        className="create-button"
        type="primary"
        onClick={() => setVisible(true)}
      >
        add product
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new product"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <ProductForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createProduct(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={product} />
    </div>
  );
}
