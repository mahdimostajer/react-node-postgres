import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import LoadProductForm from "./Form";

export default function LoadProduct() {
  const [loadProduct, setLoadProduct] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getLoadProduct();
  }, []);

  function getLoadProduct() {
    fetch("http://localhost:3001/loadproduct")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setLoadProduct(JSON.parse(data));
      });
  }

  function deleteLoadProduct(productid, loadid) {
    fetch(`http://localhost:3001/loadproduct/${productid}/${loadid}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getLoadProduct();
      });
  }

  function createLoadProduct(data) {
    fetch("http://localhost:3001/loadproduct", {
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
        getLoadProduct();
      });
  }

  const columns = [
    {
      title: "loadid",
      dataIndex: "loadid",
      key: "loadid",
    },
    {
      title: "productid",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "qty",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          onClick={() => deleteLoadProduct(record.productid, record.loadid)}
        >
          delete
        </Button>
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
        add load product
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new load product"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <LoadProductForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createLoadProduct(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={loadProduct} />
    </div>
  );
}
