import { useEffect, useState } from "react";
import { Table } from "antd";

export default function ManagerUser() {
  const [manageruser, setManagerUser] = useState();
  useEffect(() => {
    getManagerUser();
  }, []);

  function getManagerUser() {
    fetch("http://localhost:3001/manageruser")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setManagerUser(JSON.parse(data));
      });
  }

  /*   function deleteClientAddress(postalcode, nationalcode) {
    fetch(`http://localhost:3001/clientaddress/${postalcode}/${nationalcode}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getClientAddress();
      });
  }

  function createAddress(data) {
    fetch("http://localhost:3001/clientaddress", {
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
        getClientAddress();
      });
  } */

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
      title: "salary",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },

    /*     {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button
          onClick={() =>
            deleteClientAddress(record.postalcode, record.nationalcode)
          }
        >
          delete
        </Button>
      ),
    }, */
  ];

  return (
    <div>
      <Table columns={columns} dataSource={manageruser} />
    </div>
  );
}
