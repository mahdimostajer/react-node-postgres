import { Button, Modal, Table } from "antd";
import { useEffect, useState } from "react";
import LoginInfoForm from "./Form";
export default function LoginInfo() {
  const [logininfo, setLoginInfo] = useState();
  const [updateVisible, setUpdateVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    getLoginInfo();
  }, []);

  function getLoginInfo() {
    fetch("http://localhost:3001/logininfo")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setLoginInfo(JSON.parse(data));
      });
  }

  function deleteUser(username) {
    fetch(`http://localhost:3001/logininfo/${username}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getLoginInfo();
      });
  }

  function updateData(data) {
    fetch("http://localhost:3001/logininfo", {
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
        getLoginInfo();
      });
  }

  const columns = [
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteUser(record.username)}>delete</Button>
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
              setSelected(record.username);
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
        <LoginInfoForm
          visible={updateVisible}
          initialValues={logininfo?.find((item) => item?.username === selected)}
          onSubmit={(data, resetForm) => {
            updateData(data);
            resetForm();
            setUpdateVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={logininfo} />
    </div>
  );
}
