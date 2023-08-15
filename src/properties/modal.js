import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Space,
  notification,
  Radio,
  Col,
  Button,
  Row,
  Modal,
  Select,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  SaveOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "./index.css";

// * images
const ImgLoad = require("../assets/images/broker-x 3-01.png");

const ModalEdit = (props) => {
  const { data } = props;
  //   console.log("data", data);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeName, setTypeName] = useState([]);
  const [cities, setCity] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const { TextArea } = Input;

  const showModal = () => {
    setOpen(true);
    // localStorage.setItem("Loading", true);
  };
  const handleCancel = () => {
    setOpen(false);
    // localStorage.setItem("Loading", false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const Gallery = (e) => {
    // console.log("Gallery event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCancelModal = () => setPreviewOpen(false);
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

  const galleryModal = data?.gallery.map((index) => {
    // console.log("index",index);
    const imagesnull =
      index.name === "" || index.name === undefined || index.name === null
        ? ImgLoad
        : `http://127.0.0.1:9798/images/property/${index.name}`;
    return {
      name: index.name,
      url: imagesnull,
    };
  });
  // console.log("galleryModal", galleryModal);

  useEffect(() => {
    getPropType();
    getCity();
    if (showModal) {
      form.setFieldsValue({
        prop_name: data?.prop_name,
        property_type: data?.property_type?._id,
        city: data?.city?._id,
        price: data?.price,
        price_per: data?.price_per,
        currency: data?.currency,
        listing: data?.listing,
        amenities: data?.amenities,
        bedroom: data?.bedroom,
        bathroom: data?.bathroom,
        parking: data?.parking,
        gallery: galleryModal,
      });
    }
  }, [open, form]);

  const onFinish = async (eForm) => {
    console.log("eForm", eForm);
    console.log("data._id", data._id);

    // console.log("aaa", eForm);
    // message.success("Submit success!");
    setLoading(true);
    localStorage.setItem("Loading", true);

    const listing = eForm.listing.map((index) => {
      return {
        name: index,
      };
    });
    // console.log("listing", listing);

    const amenities = eForm.amenities.map((index) => {
      return {
        name: index,
      };
    });
    // console.log("amenities", amenities);

    const formData = new FormData();
    formData.append("prop_name", eForm.prop_name);
    formData.append("bedroom", eForm.bedroom);
    formData.append("bathroom", eForm.bathroom);
    formData.append("parking", eForm.parking);
    formData.append("price", eForm.price);
    formData.append("price_per", eForm.price_per);
    formData.append("currency", eForm.currency);
    formData.append("property_type", eForm.property_type);
    formData.append("city", eForm.city);
    listing.map((index) => {
      return formData.append(`listing`, index.name);
    });
    amenities.map((index) => {
      return formData.append(`amenities`, index.name);
    });
    eForm.gallery.map((index) => {
      return formData.append(`gallery`, index.originFileObj);
    });

    await axios({
      method: "put",
      url: `http://127.0.0.1:9798/api/property/${data._id}`,
      data: formData,
    }).then(function (response) {
      setOpen(false);
      let data = response.data;
      console.log("aaaaa====property===>", data);
      localStorage.setItem("Loading", false);
      setLoading(false);
      api["success"]({
        message: "Save success",
        description: `Property name: ${data.prop_name}`,
      });

      // form.setFieldsValue({
      //   prop_name: "",
      // });
    });
  };

  const onFillImages = () => {
    form.setFieldsValue({
      gallery: [],
    });
  };

  return (
    <div>
      {contextHolder}

      <Button icon={<EditOutlined />} onClick={showModal}>
        Edit
      </Button>
      <Modal
        centered
        forceRender={true}
        width={1000}
        open={open}
        title="Edit Form"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
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

                <Form.Item
                  name="property_type"
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
                  name="city"
                  label="City"
                  rules={[{ required: true, message: "Please selete City!" }]}
                >
                  <Select
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    showSearch
                    placeholder="Select a City!"
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
                              <Col md={21}>
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
                              <Col md={2} className="dynamic-delete-button-box">
                                {fields.length > 0 ? (
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    onClick={() => remove(field.name)}
                                  />
                                ) : null}
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
                            Add Listing
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
                <Form.Item
                  name="amenities"
                  label="Amenities"
                  rules={[{ required: true, message: "Please add amenities!" }]}
                >
                  <Form.List
                    name="amenities"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 0) {
                            return Promise.reject(
                              new Error("Please input your amenities!")
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
                                      message: "Please input amenities!",
                                    },
                                  ]}
                                  noStyle
                                >
                                  <TextArea
                                    style={{ width: "100%" }}
                                    rows={1}
                                    placeholder="Decription"
                                  />
                                </Form.Item>
                              </Col>
                              <Col md={2}>
                                <div className="dynamic-delete-button-box">
                                  {fields.length > 0 ? (
                                    <MinusCircleOutlined
                                      className="dynamic-delete-button-amenities"
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
                            Add Amenities
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </div>
            </Col>
            <Col md={12}>
              <div className="right-box-modal">
                <Form.Item
                  name="gallery"
                  label="Gallery"
                  valuePropName="fileList"
                  getValueFromEvent={Gallery}
                  // extra="Image profile"
                  rules={[
                    { required: true, message: "Please input image!" },
                    { type: "array", min: 2 },
                  ]}
                >
                  <Upload
                    action="/upload.do"
                    listType="picture-card"
                    onPreview={handlePreview}
                  >
                    {uploadButton}
                  </Upload>
                </Form.Item>

                <Button htmlType="button" onClick={onFillImages}>
                  Clear
                </Button>

                <Modal
                  open={previewOpen}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancelModal}
                >
                  <img
                    alt="example"
                    style={{
                      width: "100%",
                    }}
                    src={previewImage}
                  />
                </Modal>
              </div>
            </Col>
          </Row>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              {/* <Button htmlType="button" onClick={onFill}>
                Clear
              </Button> */}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalEdit;
