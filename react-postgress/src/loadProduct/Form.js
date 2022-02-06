import { Form, Row, Col, Input, Button } from "antd";

export default function LoadProductForm({ onSubmit, initialValues, visible }) {
  const [form] = Form.useForm();

  const onFinish = (data) => {
    console.log(data);
    onSubmit(data, form.resetFields);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      hideRequiredMark={true}
      name="new_loadproduct"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="loadid" name="loadid">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="productid" name="productid">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="qty" name="qty">
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
