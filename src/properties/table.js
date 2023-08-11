import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Input,
  InputNumber,
  Space,
  Table,
  notification,
  Popconfirm,
  Typography,
  Button,
  Image,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import ModalEdit from "./modal";

const App = (props) => {
  // console.log("props", props);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [api, contextHolder] = notification.useNotification();

  const getAll = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: "http://127.0.0.1:9798/api/property",
    }).then(function (response) {
      let data = response.data;
      console.log("aaaaa=======>", data);
      const result = data.map((index) => {
        return {
          key: index._id,
          ...index,
        };
      });
      // console.log("aaaaa=======>", result);
      setData(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAll();
  }, [loading, props.loading]);

  const handleDelete = async (key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
    // console.log("==>", key);
    setLoading(true);

    // await axios({
    //   method: "delete",
    //   url: `http://127.0.0.1:9798/api/property_type/${key}`,
    // }).then(function (response) {
    //   let data = response.data;
    //   // console.log("aaaaa=======>", data);
    //   // openNotificationWithIcon("success");
    //   api["success"]({
    //     message: "Delete success",
    //     description: `Type name: ${data.type_name}`,
    //   });
    //   setLoading(false);
    //   setEditingKey("");
    // });
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "",
      key: "",
      render: (record) => (
        <>
          <Image
            src={`http://127.0.0.1:9798/images/property/${record.gallery[0]?.name}`}
            alt="BrokerX"
          />
        </>
      ),
      editable: true,
      width: "15%",
    },
    {
      title: "Name",
      dataIndex: "prop_name",
      key: "prop_name",
      // render: (text) => <a href="https://www.w3schools.com">{text}</a>,
      editable: true,
      width: "15%",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      render: (index) => index.city_name,
      editable: true,
      width: "20%",
    },
    {
      title: "-",
      dataIndex: "",
      key: "",
      render: (record) => (
        <>
          <label>Bed: {record.bedroom}</label> <br />
          <label>Bath: {record.bathroom}</label> <br />
          <label>Park: {record.parking}</label>
        </>
      ),
      editable: true,
      width: "10%",
    },
    {
      title: "Price",
      dataIndex: "",
      key: "",
      render: (record) => (
        <>
          <label>
            {record.price}/{record.price_per}
          </label>
        </>
      ),
      editable: true,
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log("id",record)
        return (
          <>
            <Space size="middle">
              <ModalEdit data={record} />
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record._id)}
              >
                {/* <Typography.Link>Delete</Typography.Link> */}
                <Button icon={<DeleteOutlined />} danger>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    },
  ];

  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        <Form form={form}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </Form>
      </td>
    );
  };

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={data}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        rowClassName="editable-row"
        loading={loading}
        pagination={{
          pageSize: 6,
        }}
        scroll={{
          y: "80vh",
        }}
      />
    </>
  );
};
export default App;
