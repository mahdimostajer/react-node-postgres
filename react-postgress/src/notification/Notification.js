import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import DiscountForm from "./Form";

export default function Notification() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/notification")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setData(JSON.parse(data));
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:3001/notification/${id}`, {
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
    fetch("http://localhost:3001/notification", {
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

  function updateItem(data) {
    fetch("http://localhost:3001/notification", {
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
      title: "discountid",
      dataIndex: "discountid",
      key: "discountid",
    },
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "max",
      dataIndex: "max",
      key: "max",
    },
    {
      title: "enddate",
      dataIndex: "enddate",
      key: "enddate",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteItem(record.discountid)}>delete</Button>
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
        add discount
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new discount"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <DiscountForm
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
