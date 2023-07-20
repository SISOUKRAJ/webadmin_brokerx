import React from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Button,
  Form,
  Input,
  message,
  Space,
} from "antd";
import DataTable from "./table";
import "./index.css";

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
    tags: ["nice", "developer"],
  });
}

const User = () => {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onFill = () => {
    form.setFieldsValue({
      url: "https://taobao.com/",
    });
  };
  return (
    <div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Master Data",
          },
          {
            title: "User",
          },
        ]}
      />

      <Row style={{ marginTop: 10, marginBottom: 10 }}>
        <Col md={8}>
          <div className="left-box">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="url"
                label="URL"
                rules={[
                  { required: true },
                  { type: "url", warningOnly: true },
                  { type: "string", min: 6 },
                ]}
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                  <Button htmlType="button" onClick={onFill}>
                    Fill
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col md={16}>
          <div className="right-box">
            {/* <Table columns={columns} dataSource={data} /> */}
            <DataTable />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default User;
