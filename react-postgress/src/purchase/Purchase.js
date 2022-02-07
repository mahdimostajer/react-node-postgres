import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import PurchaseForm from "./Form";

export default function Purchase() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/purchase")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setData(JSON.parse(data));
      });
  }

  function deleteItem(nationalcode, orderid, productid) {
    fetch(
      `http://localhost:3001/purchase/${nationalcode}/${orderid}/${productid}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getData();
      });
  }

  function createItem(data) {
    fetch("http://localhost:3001/purchase", {
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
        getData();
      });
  }

  const columns = [
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "orderid",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "productid",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "productqty",
      dataIndex: "productqty",
      key: "productqty",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          onClick={() =>
            deleteItem(record.nationalcode, record.orderid, record.productid)
          }
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
        add purchase
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new purchase"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <PurchaseForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createItem(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
