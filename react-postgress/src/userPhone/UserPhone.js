import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";

export default function UserPhone() {
  const [discount, setDiscount] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/userphone")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setDiscount(JSON.parse(data));
      });
  }

  function deleteItem(nationalcode, phoneno) {
    fetch(`http://localhost:3001/userphone/${nationalcode}/${phoneno}`, {
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
    fetch("http://localhost:3001/userphone", {
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
      title: "phoneno",
      dataIndex: "phoneno",
      key: "phoneno",
    },

    /* {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteItem(record.discountid)}>delete</Button>
      ),
    }, */
  ];

  return (
    <div>
      {/*  <Button
        className="create-button"
        type="primary"
        onClick={() => setVisible(true)}
      >
        add user phone
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new user phone"
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
      </Modal> */}
      <Table columns={columns} dataSource={discount} />
    </div>
  );
}