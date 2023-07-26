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
  Upload
} from "antd";
import {  UploadOutlined } from '@ant-design/icons';
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

  const onFinish = (e) => {
    console.log("aaa", e)
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

  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
                name="user_name"
                label="Name"
                rules={[
                  { required: true, message: "Please input Name!" },
                  { type: "string", warningOnly: true },
                  { type: "string", min: 2 },
                ]}
              >
                <Input placeholder="input your name" />
              </Form.Item>
              <Form.Item
                name="user_surname"
                label="Surname"
                rules={[
                  { required: true, message: "Please input Surname!" },
                  { type: "string", warningOnly: true },
                  { type: "string", min: 2 },
                ]}
              >
                <Input placeholder="input your surname" />
              </Form.Item>
              <Form.Item
                name="user_nickname"
                label="Nickname"
                rules={[
                  { required: true, message: "Please input Nickname!" },
                  { type: "string", warningOnly: true },
                  { type: "string", min: 2 },
                ]}
              >
                <Input placeholder="input your nickname" />
              </Form.Item>

              <Form.Item
                name="user_phone"
                label="Phone Number"
                rules={[
                  { required: true, message: "Please input Phone!" },
                  { type: "string", warningOnly: true, message: "Please input number!" },
                  { type: "string", min: 8, message: "cannot be less than 8 in length" },
                  { type: "string", max: 15, message: "cannot be more than 15 in length" },
                ]}
              >
                <Input allowClear placeholder="input your phone" />
              </Form.Item>
              
              <Form.Item
                name="upload"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="Image profile"
                rules={[
                  { required: true, message: "Please input image!" },
                  { type: "array", max: 1 },
                ]}
              >
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
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
