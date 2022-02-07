import { Table } from "antd";
import { useEffect, useState } from "react";

export default function ProductComment() {
  const [data, setdata] = useState();

  useEffect(() => {
    getAddress();
  }, []);

  function getAddress() {
    fetch("http://localhost:3001/productcomment")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setdata(JSON.parse(data));
      });
  }

  const columns = [
    {
      title: "productid",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "productname",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "commentid",
      dataIndex: "commentid",
      key: "commentid",
    },
    {
      title: "text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "nationalcode",
      dataIndex: "nationalcode",
      key: "nationalcode",
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}
