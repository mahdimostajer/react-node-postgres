import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import NotificationForm from "./Form";

export default function Notification() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

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
      title: "notifid",
      dataIndex: "notifid",
      key: "notifid",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "seenstatus",
      dataIndex: "seenstatus",
      key: "seenstatus",
      render: (text, record) => (
        <span>{record.seenstatus ? "true" : "false"}</span>
      ),
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
        <Button onClick={() => deleteItem(record.notifid)}>delete</Button>
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
        add notification
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new notification"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <NotificationForm
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
        <NotificationForm
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
