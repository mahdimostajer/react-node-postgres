import { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import StoreKeeperForm from "./Form";

export default function StoreKeeper() {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/storekeeper")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setData(JSON.parse(data));
      });
  }

  function deleteItem(id) {
    fetch(`http://localhost:3001/storekeeper/${id}`, {
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
    fetch("http://localhost:3001/storekeeper", {
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
    fetch("http://localhost:3001/storekeeper", {
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
        add storekeeper
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new storekeeper"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <StoreKeeperForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createItem(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Modal
        title="update storekeeper"
        style={{
          top: 20,
        }}
        width={576}
        visible={updateVisible}
        footer={null}
        onCancel={() => setUpdateVisible(false)}
      >
        <StoreKeeperForm
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
