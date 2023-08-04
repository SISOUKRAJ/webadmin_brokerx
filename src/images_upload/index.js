import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Breadcrumb,
  Col,
  Row,
  Button,
  Form,
  Space,
  notification,
  Upload,
  Modal,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

import DataTable from "./table";
import "./index.css";

const Cities = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);
  // const [formData, setFromData] = useState({
  //   name: "",
  //   type_name: "",
  // });

  // const [fileTest, setFileTest] = useState([]);

  const onFinish = async (data) => {
    // e.preventDefault();
    console.log("data", data?.file);

    const arrayImg = data?.file;

    // message.success("Submit success!");
    // setLoading(true);

    const formData = new FormData();
    formData.append("name1", "xxx");
    formData.append("name2", "xxx");
    formData.append("name3", "xxx");
    // for (let i = 0; i < arrayImg.length; i++) {
    //   console.log(arrayImg[i].originFileObj);
    // }

    arrayImg.map((index) => {
      return formData.append(`images`, index.originFileObj);
    });
    // console.log("fileTest", images);

    const URL = "http://127.0.0.1:9798/api/image_property"; // http://localhost:4000/picture

    await axios({
      method: "POST",
      url: URL,
      data: formData,
      header: { "Content-Type": "multipart/form-data" },
    }).then(function (response) {
      let data = response.data;
      console.log("aaaaa=======>", data);
      // openNotificationWithIcon("success");
      // api["success"]({
      //   message: "Save success",
      //   description: `All images success`,
      // });
      setLoading(false);
    });
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
      file: [],
    });
  };

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
                name="file"
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
                  type="file"
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
