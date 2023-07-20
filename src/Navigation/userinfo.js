import React from "react";
import { UserOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space, Dropdown } from "antd";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const App = () => {
  const url =
    "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
  return (
    <div>
      <Space wrap size={16} style={{marginRight:10}}>
        <Badge dot>
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </Space>

      <Dropdown
        menu={{
          items,
        }}
      >
        <Space>
          <Badge>
            <Avatar src={<img src={url} alt="avatar" />} />
          </Badge>
        </Space>
      </Dropdown>
    </div>
  );
};
export default App;
