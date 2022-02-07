import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import OrderForm from "./Form";

export default function Order() {
  const [order, setOrder] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/order")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setOrder(JSON.parse(data));
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:3001/order/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getData();
      });
  }

  function createItem(data) {
    fetch("http://localhost:3001/order", {
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

  function updateOrder(data) {
    fetch("http://localhost:3001/order", {
      method: "PUT",
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
      title: "orderid",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "buydate",
      dataIndex: "buydate",
      key: "buydate",
    },
    {
      title: "postalcode",
      dataIndex: "postalcode",
      key: "postalcode",
    },
    {
      title: "discountid",
      dataIndex: "discountid",
      key: "discountid",
    },
    {
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteItem(record.orderid)}>delete</Button>
      ),
    },
    {
      title: "update",
      key: "update",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              setUpdateVisible(true);
              setSelected(record.orderid);
            }}
            size="small"
            type="primary"
            ghost
          >
            update
          </Button>
        </>
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
        add order
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new order"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <OrderForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createItem(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Modal
        title="update user"
        style={{
          top: 20,
        }}
        width={576}
        visible={updateVisible}
        footer={null}
        onCancel={() => setUpdateVisible(false)}
      >
        <OrderForm
          visible={updateVisible}
          initialValues={order?.find((item) => item?.orderid === selected)}
          onSubmit={(data, resetForm) => {
            updateOrder(data);
            resetForm();
            setUpdateVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={order} />
    </div>
  );
}
