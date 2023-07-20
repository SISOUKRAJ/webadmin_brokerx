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

const Cities = () => {
  const [form] = Form.useForm();

  const onFinish = (e) => {
    console.log("aaa",e)
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const onFill = () => {
    form.setFieldsValue({
        city_id:"",
        city_name: "",
    });
  };


  
  return (
    <div>
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
              title: "Cities",
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
                  name="city_id"
                  label="ID"
                  rules={[
                    { required: true, message: 'Please input City ID!' },
                    { type: "string", warningOnly: true },
                    { type: "string", min: 2 },
                  ]}
                >
                  <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item
                  name="city_name"
                  label="Name"
                  rules={[
                    { required: true, message: 'Please input City Name!' },
                    { type: "string", warningOnly: true },
                    { type: "string", min: 2 },
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
                      Clear
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </div>
          </Col>
          <Col md={16}>
            <div className="right-box">
              <DataTable />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cities;
