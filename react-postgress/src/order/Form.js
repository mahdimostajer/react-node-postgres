import { Form, Row, Col, Input, Button } from "antd";
import { useEffect } from "react";

export default function OrderForm({ onSubmit, initialValues, visible }) {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log(data);
    onSubmit(data, form.resetFields);
  };

  useEffect(() => {
    form.setFieldsValue({ price: "0" });
  });

  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark={true}
      name="new_Order"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="orderid" name="orderid">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="status" name="status">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="discountid" name="discountid">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="nationalcode" name="nationalcode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="postalcode" name="postalcode">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="price" name="price">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="buydate" name="buydate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="description" name="description">
            <Input.TextArea rows={4} maxLength={200} showCount />
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
