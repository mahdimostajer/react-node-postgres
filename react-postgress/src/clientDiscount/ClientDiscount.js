import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import ClientDiscountForm from "./Form";

export default function ClientDiscount() {
  const [discount, setDiscount] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/clientdiscount")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setDiscount(JSON.parse(data));
      });
  }

  function deleteItem(discountid, nationalcode) {
    fetch(
      `http://localhost:3001/clientdiscount/${discountid}/${nationalcode}`,
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
    fetch("http://localhost:3001/clientdiscount", {
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
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          onClick={() => deleteItem(record.discountid, record.nationalcode)}
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
        add client discount
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new client discount"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <ClientDiscountForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createItem(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={discount} />
    </div>
  );
}
