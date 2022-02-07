import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import DeliveryManForm from "./Form";

export default function DeliveryMan() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/deliveryman")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setData(JSON.parse(data));
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:3001/deliveryman/${id}`, {
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
    fetch("http://localhost:3001/deliveryman", {
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
    fetch("http://localhost:3001/deliveryman", {
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
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "plateno",
      dataIndex: "plateno",
      key: "plateno",
    },
    {
      title: "vehicletype",
      dataIndex: "vehicletype",
      key: "vehicletype",
    },

    {
      title: "salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "workhour",
      dataIndex: "workhour",
      key: "workhour",
    },
    {
      title: "startDate",
      dataIndex: "startdate",
      key: "startdate",
    },

    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteItem(record.nationalcode)}>delete</Button>
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
              setSelected(record.nationalcode);
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
        add delivery man
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new delivery man"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <DeliveryManForm
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
        <DeliveryManForm
          visible={updateVisible}
          initialValues={data?.find((item) => item?.nationalcode === selected)}
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
