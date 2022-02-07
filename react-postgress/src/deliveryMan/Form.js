import { Form, Row, Col, Input, Button } from "antd";
import { useEffect } from "react";

export default function DeliveryManForm({ onSubmit, initialValues, visible }) {
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
      name="new_deliveryman"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="nationalcode" name="nationalcode">
            <Input disabled={initialValues} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="capacity" name="capacity">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="plateno" name="plateno">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="vehicletype" name="vehicletype">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="salary" name="salary">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="workhour" name="workhour">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="startDate" name="startDate">
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
