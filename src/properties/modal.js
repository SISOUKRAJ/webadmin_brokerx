import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Space,
  Table,
  notification,
  Radio,
  Col,
  Button,
  Row,
  Modal,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import "./index.css";

const App = (props) => {
  const { data } = props;
  //   console.log("data", data);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  form.setFieldsValue({
    name: data?.prop_name,
    property_type: [],
    city: [],
    price: data?.price,
    price_per: [],
    currency: [],
    listing: [],
    amenities: [],
    bedroom: data?.bedroom,
    bathroom: data?.bathroom,
    parking: data?.parking,
    gallery: [],
  });

  const onFinish = async (data) => {
    console.log("data", data);
  };

  return (
    <>
      <Button icon={<EditOutlined />} onClick={showModal}>
        Edit{" "}
      </Button>
      <Modal
        width={1000}
        open={open}
        title="Edit Form"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Submit
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col md={12}>
              <div className="left-box-modal">
                <Form.Item
                  name="prop_name"
                  label="Name"
                  rules={[
                    { required: true, message: "Please input name!" },
                    // { type: "string", warningOnly: true },
                    // { type: "string", min: 2 },
                  ]}
                >
                  <Input allowClear placeholder="Input your name" />
                </Form.Item>

                <Row>
                  <Col md={8}>
                    <Form.Item
                      name="bedroom"
                      label="Bedroom"
                      rules={[
                        { required: true, message: "Please input bedroom!" },
                        // { type: "string", warningOnly: true },
                        // { type: "string", min: 2 },
                      ]}
                      style={{ marginRight: 10 }}
                    >
                      <InputNumber
                        style={{
                          width: "100%",
                        }}
                        placeholder="Input your bedroom"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item
                      name="bathroom"
                      label="Bathroom"
                      rules={[
                        { required: true, message: "Please input bathroom!" },
                        // { type: "string", warningOnly: true },
                        // { type: "string", min: 2 },
                      ]}
                      style={{ marginRight: 10 }}
                    >
                      <InputNumber
                        style={{
                          width: "100%",
                        }}
                        placeholder="Input your bathroom"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={8}>
                    <Form.Item
                      name="parking"
                      label="Parking"
                      rules={[
                        { required: true, message: "Please input parking!" },
                        // { type: "string", warningOnly: true },
                        // { type: "string", min: 2 },
                      ]}
                    >
                      <InputNumber
                        style={{
                          width: "100%",
                        }}
                        placeholder="Input your parking"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row>
                  <Col md={12}>
                    <Form.Item
                      name="price"
                      label="Price"
                      rules={[
                        { required: true, message: "Please input price!" },
                        { type: "number", min: 2 },
                      ]}
                    >
                      <InputNumber
                        style={{
                          width: "100%",
                        }}
                        placeholder="Input your price"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={12}>
                    <Form.Item
                      style={{
                        marginLeft: 10,
                      }}
                      name="price_per"
                      label="Per or /"
                      rules={[
                        { required: true, message: "Please selete per!" },
                      ]}
                    >
                      <Radio.Group>
                        <Radio value="month">month</Radio>
                        <Radio value="year">year</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  style={{
                    marginLeft: 10,
                  }}
                  name="currency"
                  label="Currency"
                  rules={[
                    { required: true, message: "Please selete currency!" },
                  ]}
                >
                  <Radio.Group>
                    <Radio value="kip">kip</Radio>
                    <Radio value="baht">baht</Radio>
                    <Radio value="dollar">dollar</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="right-box-modal">
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default App;
