import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import DeliveryForm from "./Form";

export default function Delivery() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/delivery")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setData(JSON.parse(data));
      });
  }

  function deleteItem(orderid, deliveryman, storekeeper) {
    fetch(
      `http://localhost:3001/delivery/${orderid}/${deliveryman}/${storekeeper}`,
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
    fetch("http://localhost:3001/delivery", {
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
    fetch("http://localhost:3001/delivery", {
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
      title: "deliveryman",
      dataIndex: "deliveryman",
      key: "deliveryman",
    },
    {
      title: "storekeeper",
      dataIndex: "storekeeper",
      key: "storekeeper",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          onClick={() =>
            deleteItem(record.orderid, record.deliveryman, record.storekeeper)
          }
        >
          delete
        </Button>
      ),
    },
    /*  {
      title: "update",
      key: "update",
      render: (text, record) => (
        <>
          <Button
            onClick={() => {
              setUpdateVisible(true);
              setSelected({ orderid: record.orderid });
            }}
            size="small"
            type="primary"
            ghost
          >
            update
          </Button>
        </>
      ),
    }, */
  ];

  return (
    <div>
      <Button
        className="create-button"
        type="primary"
        onClick={() => setVisible(true)}
      >
        add delivery
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new delivery"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <DeliveryForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createItem(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Modal
        title="update notification"
        style={{
          top: 20,
        }}
        width={576}
        visible={updateVisible}
        footer={null}
        onCancel={() => setUpdateVisible(false)}
      >
        <DeliveryForm
          visible={updateVisible}
          initialValues={data?.find((item) => item?.notifid === selected)}
          onSubmit={(data, resetForm) => {
            updateItem(data);
            resetForm();
            setUpdateVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
