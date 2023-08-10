import React, { useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Col,
  Row,
  Button,
  Form,
  Input,
  // message,
  Space,
  notification,
} from "antd";
import DataTable from "./table";
import "./index.css";

const Cities = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const onFinish = async (e) => {
    // console.log("aaa", e);
    // message.success("Submit success!");
    setLoading(true);

    await axios({
      method: "post",
      url: `http://127.0.0.1:9798/api/property_type`,
      data: e,
    }).then(function (response) {
      let data = response.data;
      // console.log("aaaaa=======>", data);
      api["success"]({
        message: "Save success",
        description: `Type name: ${data.type_name}`,
      });
      setLoading(false);
      form.setFieldsValue({
        type_name: "",
      });
    });
  };

  const onFinishFailed = (e) => {
    // console.log("bbb", e);
    // message.error("Submit failed!");
    // api["error"]({
    //   message: "Submit failed!",
    //   description: `Type name: ${e.errorFields[0].errors[0]}`,
    // });
  };

  const onFill = () => {
    form.setFieldsValue({
      type_name: "",
    });
  };

  return (
    <div>
      {contextHolder}
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
            title: "Property Type",
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
                name="type_name"
                label="Name"
                rules={[
                  { required: true, message: "Please input Type Name!" },
                  { type: "string", warningOnly: true },
                  { type: "string", min: 2 },
                ]}
              >
                <Input allowClear placeholder="input your name" />
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
            <DataTable loading={loading} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Cities;
