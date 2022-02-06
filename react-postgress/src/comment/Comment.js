import { useEffect, useState } from "react";
import { Button, Table, Modal } from "antd";
import CommentForm from "./Form";

export default function Comment() {
  const [comment, setComment] = useState();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getComment();
  }, []);

  function getComment() {
    fetch("http://localhost:3001/comment")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setComment(JSON.parse(data));
      });
  }

  function deleteComment(commentid) {
    fetch(`http://localhost:3001/comment/${commentid}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        alert(data);
        getComment();
      });
  }

  function createComment(data) {
    fetch("http://localhost:3001/comment", {
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
        getComment();
      });
  }

  const columns = [
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
    {
      title: "productid",
      dataIndex: "productid",
      key: "productid",
    },
    {
      title: "delete",
      key: "delete",
      render: (text, record) => (
        <Button onClick={() => deleteComment(record.commentid)}>delete</Button>
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
        add comment
      </Button>
      <Modal
        style={{
          top: 20,
        }}
        title="new comment"
        width={576}
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <CommentForm
          visible={visible}
          onSubmit={(data, resetForm) => {
            createComment(data);
            resetForm();
            setVisible(false);
          }}
        />
      </Modal>
      <Table columns={columns} dataSource={comment} />
    </div>
  );
}
