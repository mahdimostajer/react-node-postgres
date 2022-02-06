import { Form, Row, Col, Input, Button } from "antd";

export default function ProductForm({ onSubmit, initialValues, visible }) {
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
      name="new_product"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="productid" name="productid">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="name" name="name">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="price" name="price">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="qty" name="qty">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="photo1" name="photo1">
            <Input type="url" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="photo2" name="photo2">
            <Input type="url" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="photo3" name="photo3">
            <Input type="url" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="photo4" name="photo4">
            <Input type="url" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="photo5" name="photo5">
            <Input type="url" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="manufacturedate" name="manufacturedate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="expirationdate" name="expirationdate">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="categoryname" name="categoryname">
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
