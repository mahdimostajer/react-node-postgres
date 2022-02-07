import { Form, Row, Col, Input, Button } from "antd";
import { useEffect } from "react";

export default function NotificationForm({ onSubmit, initialValues, visible }) {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log(data);
    onSubmit(data, form.resetFields);
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark={true}
      name="new_notification"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="notifid" name="notifid">
            <Input disabled={initialValues} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="nationalcode" name="nationalcode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="seenstatus" name="seenstatus">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="text" name="text">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="date" name="date">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8} offset={16}>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              send
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}
