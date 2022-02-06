import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import LoadForm from "./Form";

export default function Load() {
  const [load, setLoad] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getLoad();
  }, []);

  function getLoad() {
    fetch("http://localhost:3001/load")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setLoad(JSON.parse(data));
      });
  }

  function deleteLoad(loadid) {
    fetch(`http://localhost:3001/load/${loadid}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getLoad();
      });
  }

  function createLoad(data) {
    fetch("http://localhost:3001/load", {
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
        getLoad();
      });
  }

  const columns = [
    {
      title: "loadid",
      dataIndex: "loadid",
      key: "loadid",
    },
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteLoad(record.loadid)}>delete</Button>
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
        add Load
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new load"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <LoadForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createLoad(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={load} />
    </div>
  );
}
