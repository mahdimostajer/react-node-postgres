import { Row, Form, Input, Col, Button } from "antd";
import { useEffect } from "react";
export default function UserForm({ onSubmit, initialValues, visible }) {
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
      name="new_user"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="nationalcode" name="nationalcode">
            <Input disabled={initialValues} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="firstname" name="firstname">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="lastname" name="lastname">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="username" name="username">
            <Input disabled={initialValues} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="password" name="password">
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
