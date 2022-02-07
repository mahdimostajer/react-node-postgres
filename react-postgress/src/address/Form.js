import { Row, Form, Input, Col, Button } from "antd";
import { useEffect } from "react";

export default function AddressForm({ onSubmit, initialValues, visible }) {
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
      name="new_address"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="postalcode" name="postalcode">
            <Input disabled={initialValues ? true : false} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="state" name="state">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="city" name="city">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="street" name="street">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="vallay" name="vallay">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="plate" name="plate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="floor" name="floor">
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
