import { Table } from "antd";
import { useEffect, useState } from "react";

export default function DeliveryManUser() {
  const [data, setdata] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/deliveryManUser")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setdata(JSON.parse(data));
      });
  }

  const columns = [
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
    {
      title: " capacity",
      dataIndex: " capacity",
      key: " capacity",
    },
    {
      title: "plateno",
      dataIndex: "plateno",
      key: "plateno",
    },
    {
      title: "vehicletype",
      dataIndex: "vehicletype",
      key: "vehicletype",
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
      title: "startDate",
      dataIndex: "startdate",
      key: "startdate",
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
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
