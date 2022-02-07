import { Table } from "antd";
import { useEffect, useState } from "react";

export default function OrderAddress() {
  const [address, setAddress] = useState();

  useEffect(() => {
    getAddress();
  }, []);

  function getAddress() {
    fetch("http://localhost:3001/orderaddress")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setAddress(JSON.parse(data));
      });
  }

  const columns = [
    {
      title: "orderid",
      dataIndex: "orderid",
      key: "orderid",
    },
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
  ];
  return (
    <div>
      <Table columns={columns} dataSource={address} />
    </div>
  );
}
