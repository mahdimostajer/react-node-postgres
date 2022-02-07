import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import Modal from "antd/lib/modal/Modal";
import UserForm from "./Form";

export default function User() {
  const [users, setUsers] = useState();
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    fetch("http://localhost:3001/users")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setUsers(JSON.parse(data));
      });
  }

  const columns = [
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: "firstname",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "lastname",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteUser(record.nationalcode)}>delete</Button>
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

  function createUser(data) {
    fetch("http://localhost:3001/users", {
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
        getUser();
      });
  }

  function deleteUser(id) {
    fetch(`http://localhost:3001/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getUser();
      });
  }

  function updateUser(data) {
    fetch("http://localhost:3001/users", {
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
        getUser();
      });
  }

  const [visible, setVisible] = useState(false);

  return (
    <div>
      <>
        <Button
          className="create-button"
          type="primary"
          onClick={() => setVisible(true)}
        >
          add user
        </Button>
        <Modal
          style={{
            top: 20,
          }}
          title="new user"
          width={576}
          visible={visible}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <UserForm
            visible={visible}
            onSubmit={(data, resetForm) => {
              createUser(data);
              resetForm();
              setVisible(false);
            }}
          />
        </Modal>
      </>
      <Modal
        title="update user"
        style={{
          top: 20,
        }}
        width={576}
        visible={updateVisible}
        footer={null}
        onCancel={() => setUpdateVisible(false)}
      >
        <UserForm
          visible={updateVisible}
          initialValues={users?.find((item) => item?.nationalcode === selected)}
          onSubmit={(data, resetForm) => {
            updateUser(data);
            resetForm();
            setUpdateVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}
