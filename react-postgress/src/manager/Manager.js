import { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import ManagerForm from "./Form";

export default function Manager() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/manager")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setData(JSON.parse(data));
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:3001/manager/${id}`, {
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
    fetch("http://localhost:3001/manager", {
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
    fetch("http://localhost:3001/manager", {
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
      title: "startdate",
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
        add manager
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new manager"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <ManagerForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createItem(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Modal
        title="update manager"
        style={{
          top: 20,
        }}
        width={576}
        visible={updateVisible}
        footer={null}
        onCancel={() => setUpdateVisible(false)}
      >
        <ManagerForm
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
