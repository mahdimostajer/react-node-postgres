import { Table } from "antd";
import { useEffect, useState } from "react";

export default function UserOrder() {
  const [data, setdata] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/userorder")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setdata(JSON.parse(data));
      });
  }

  const columns = [
    {
      title: "orderid",
      dataIndex: "orderid",
      key: "orderid",
    },
    {
      title: "status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "buydate",
      dataIndex: "buydate",
      key: "buydate",
    },

    {
      title: "description",
      dataIndex: "description",
      key: "description",
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
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
