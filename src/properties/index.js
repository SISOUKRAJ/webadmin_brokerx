import React, { useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Space,
  notification,
  message,
} from "antd";
import DataTable from "./table";
import "./index.css";

const Cities = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const onFinish = async (e) => {
    // console.log("aaa", e);
    message.success("Submit success!");
    setLoading(true);

    // await axios({
    //   method: "post",
    //   url: `http://127.0.0.1:9798/api/property_type`,
    //   data: e,
    // }).then(function (response) {
    //   let data = response.data;
    //   // console.log("aaaaa=======>", data);
    //   // openNotificationWithIcon("success");
    //   api["success"]({
    //     message: "Save success",
    //     description: `Type name: ${data.city_name}`,
    //   });
    //   setLoading(false);
    //   form.setFieldsValue({
    //     type_name: "",
    //   });
    // });
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
      name:"",
      type_name: "",
    });
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
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
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input name!" },
                  { type: "string", warningOnly: true },
                  { type: "string", min: 2 },
                ]}
              >
                <Input allowClear placeholder="Input your name" />
              </Form.Item>
              <Form.Item
                name="Property Type"
                label="type_name"
                rules={[
                  { required: true, message: "Please selete Type Name!" },
                ]}
              >
                <Select
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  placeholder="Select a Property Type"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "jack",
                      label: "Jack",
                    },
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                    {
                      value: "tom",
                      label: "Tom",
                    },
                  ]}
                />{" "}
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
