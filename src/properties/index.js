import React, { useEffect, useState } from "react";
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
  InputNumber,
  Radio,
  Upload,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import DataTable from "./table";
import "./index.css";

const Cities = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  const [typeName, setTypeName] = useState([]);
  const [cities, setCity] = useState([]);
  // const [formData, setFromData] = useState({
  //   name: "",
  //   type_name: "",
  // });

  const { TextArea } = Input;

  const getPropType = async () => {
    await axios({
      method: "get",
      url: `http://127.0.0.1:9798/api/property_type`,
    }).then(function (response) {
      let data = response.data;
      // console.log("aaaaa=======>", data);
      const Result = data.map((index) => {
        return {
          label: index.type_name,
          value: index._id,
        };
      });
      // console.log("Result=======>", Result);
      setTypeName(Result);
    });
  };

  const getCity = async () => {
    await axios({
      method: "get",
      url: `http://127.0.0.1:9798/api/city`,
    }).then(function (response) {
      let data = response.data;
      // console.log("aaaaa=======>", data);
      const Result = data.map((index) => {
        return {
          label: index.city_name,
          value: index._id,
        };
      });
      // console.log("Result=======>", Result);
      setCity(Result);
    });
  };

  useEffect(() => {
    getPropType();
    getCity();
  }, []);

  const onFinish = async (e) => {
    console.log("aaa", e);
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

  // const onFinishFailed = (e) => {
  //   console.log("bbb", e);
  //   message.error("Submit failed!");
  //   api["error"]({
  //     message: "Submit failed!",
  //     description: `Type name: ${e.errorFields[0].errors[0]}`,
  //   });
  // };

  const onFill = () => {
    form.setFieldsValue({
      name: "",
      type_name: [],
      city_name: [],
      price: "",
      per: [],
      currency: [],
      listing: [],
      bedroom: "",
      badroom: "",
      parking: "",
      upload: [],
    });
  };

  // const onSearch = (value) => {
  //   console.log("search:", value);
  // };
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
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
              // onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="name"
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
                    name="badroom"
                    label="Badroom"
                    rules={[
                      { required: true, message: "Please input badroom!" },
                      // { type: "string", warningOnly: true },
                      // { type: "string", min: 2 },
                    ]}
                    style={{ marginRight: 10 }}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      placeholder="Input your badroom"
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
                    name="per"
                    label="Per or /"
                    rules={[{ required: true, message: "Please selete per!" }]}
                  >
                    <Radio.Group>
                      <Radio value="mouth">mouth</Radio>
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
                rules={[{ required: true, message: "Please selete currency!" }]}
              >
                <Radio.Group>
                  <Radio value="kip">kip</Radio>
                  <Radio value="baht">baht</Radio>
                  <Radio value="dollar">dollar</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="type_name"
                label="Property Type"
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
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={typeName}
                />
              </Form.Item>
              <Form.Item
                name="city_name"
                label="City Name"
                rules={[
                  { required: true, message: "Please selete City Name!" },
                ]}
              >
                <Select
                  allowClear
                  style={{
                    width: "100%",
                  }}
                  showSearch
                  placeholder="Select a City Name!"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={cities}
                />
              </Form.Item>

              <Form.Item
                name="listing"
                label="About This Listing"
                rules={[{ required: true, message: "Please add listing!" }]}
              >
                <Form.List
                  name="listing"
                  rules={[
                    {
                      validator: async (_, names) => {
                        if (!names || names.length < 0) {
                          return Promise.reject(
                            new Error("Please input your listing!")
                          );
                        }
                      },
                    },
                  ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                          label={index === 0 ? "" : ""}
                          required={false}
                          key={field.key}
                        >
                          <Row>
                            <Col md={22}>
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message: "Please input listing!",
                                  },
                                ]}
                                noStyle
                              >
                                <TextArea
                                  style={{ width: "100%" }}
                                  rows={2}
                                  placeholder="Decription"
                                />
                              </Form.Item>
                            </Col>
                            <Col md={2}>
                              <div className="dynamic-delete-button-box">
                                {fields.length > 0 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                  />
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          style={{
                            width: "100%",
                          }}
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                        <Form.ErrorList errors={errors} />
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form.Item>

              <Form.Item
                name="gallery"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                // extra="Image profile"
                rules={[
                  { required: true, message: "Please input image!" },
                  // { type: "array", max: 1 },
                ]}
              >
                {/* <Upload name="logo" action="/upload.do" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload> */}
                <Upload
                  action="/upload.do"
                  listType="picture-card"
                  // fileList={fileList}
                  onPreview={handlePreview}
                  // onChange={handleChange}
                >
                  {/* {fileList.length >= 8 ? null : uploadButton} */}
                  {uploadButton}
                </Upload>
              </Form.Item>

              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>

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
