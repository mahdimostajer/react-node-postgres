import { Form, Row, Col, Input, Button } from "antd";
import { useEffect } from "react";

export default function DeliveryForm({ onSubmit, initialValues, visible }) {
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
      name="new_delivery"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="orderid" name="orderid">
            <Input disabled={initialValues} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="deliveryman" name="deliveryman">
            <Input disabled={initialValues} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="storekeeper" name="storekeeper">
            <Input disabled={initialValues} />
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
