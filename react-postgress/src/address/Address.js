import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import AddressForm from "./Form";

export default function Address() {
  const [address, setAddress] = useState();
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();
  useEffect(() => {
    getAddress();
  }, []);

  function getAddress() {
    fetch("http://localhost:3001/address")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setAddress(JSON.parse(data));
      });
  }

  function deleteAddress(postalcode) {
    fetch(`http://localhost:3001/address/${postalcode}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getAddress();
      });
  }

  function createAddress(data) {
    fetch("http://localhost:3001/address", {
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
        getAddress();
      });
  }

  function updateAddress(data) {
    fetch("http://localhost:3001/address", {
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
        getAddress();
      });
  }

  const columns = [
    {
      title: "postalcode",
      dataIndex: "postalcode",
      key: "postalcode",
    },
    {
      title: "state",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "city",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "street",
      dataIndex: "street",
      key: "street",
    },
    {
      title: "vallay",
      dataIndex: "vallay",
      key: "vallay",
    },
    {
      title: "plate",
      dataIndex: "plate",
      key: "plate",
    },
    {
      title: "floor",
      dataIndex: "floor",
      key: "floor",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteAddress(record.postalcode)}>delete</Button>
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
              setSelected(record.postalcode);
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
        add address
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new address"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <AddressForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createAddress(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>

      <Modal
        title="update address"
        style={{
          top: 20,
        }}
        width={576}
        visible={updateVisible}
        footer={null}
        onCancel={() => setUpdateVisible(false)}
      >
        <AddressForm
          visible={updateVisible}
          initialValues={address?.find((item) => item?.postalcode === selected)}
          onSubmit={(data, resetForm) => {
            updateAddress(data);
            resetForm();
            setUpdateVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={address} />
    </div>
  );
}
