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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const App = (props) => {
  // console.log("props", props);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const [api, contextHolder] = notification.useNotification();

  // const openNotificationWithIcon = (type) => {
  //   api[type]({
  //     message: "Notification Title",
  //     description:
  //       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  //   });
  // };

  const isEditing = (record) => record._id === editingKey;

  const getAll = async () => {
    setLoading(true);
    await axios({
      method: "get",
      url: "http://127.0.0.1:9798/api/property_type",
    }).then(function (response) {
      let data = response.data;
      // console.log("aaaaa=======>", data);
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

  const edit = (record) => {
    form.setFieldsValue({
      type_name: "",
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      // console.log("record", row);
      // console.log("record", key);
      setLoading(true);

      const put_data = {
        type_name: row.type_name,
      };

      await axios({
        method: "put",
        url: `http://127.0.0.1:9798/api/property_type/${key}`,
        data: put_data,
      }).then(function (response) {
        let data = response.data;
        // console.log("aaaaa=======>", data);
        // openNotificationWithIcon("success");
        api["success"]({
          message: "Update success",
          description: `Type name: ${data.type_name}`,
        });
        setLoading(false);
        setEditingKey("");
      });
    } catch (errInfo) {
      // console.log("Validate Failed:", errInfo);
      api["error"]({
        message: "Update Failed!",
        description: errInfo.title,
      });
    }
  };

  const handleDelete = async (key) => {
    // const newData = dataSource.filter((item) => item.key !== key);
    // setDataSource(newData);
    // console.log("==>", key);
    setLoading(true);

    await axios({
      method: "delete",
      url: `http://127.0.0.1:9798/api/property_type/${key}`,
    }).then(function (response) {
      let data = response.data;
      // console.log("aaaaa=======>", data);
      // openNotificationWithIcon("success");
      api["success"]({
        message: "Delete success",
        description: `Type name: ${data.type_name}`,
      });
      setLoading(false);
      setEditingKey("");
    });
  };

  const columns = [
    {
      title: "Type Name",
      dataIndex: "type_name",
      key: "type_name",
      // render: (text) => <a href="https://www.w3schools.com">{text}</a>,
      editable: true,
      width: "50%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        // console.log("id",record)
        const editable = isEditing(record);
        return (
          <>
            <Space size="middle">
              {editable ? (
                <Space size="middle">
                  <Button
                    onClick={() => save(record._id)}
                    icon={<SaveOutlined />}
                    type="primary"
                    ghost
                  >
                    Save
                  </Button>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <Button icon={<CloseCircleOutlined />}>Cancel</Button>
                  </Popconfirm>
                </Space>
              ) : (
                <Typography.Link
                  disabled={editingKey !== ""}
                  onClick={() => edit(record)}
                >
                  <Button icon={<EditOutlined />}>Edit</Button>
                </Typography.Link>
              )}
              {/* <a href="https://www.w3schools.com">Invite {record.name}</a> */}
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

  const mergedColumns = columns.map((col) => {
    // console.log("ccc", col);
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      {contextHolder}
      <Table
        columns={mergedColumns}
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
          pageSize: 7,
        }}
        scroll={{
          y: 460,
        }}
      />
    </>
  );
};
export default App;
