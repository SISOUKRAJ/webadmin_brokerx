import React from "react";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space, Popover, Row, Col, Divider, Button } from "antd";
import "./index.css";

// const text = <span>Title</span>;
const content = (
  <div>
    <Row>
      <Col md={7}>
        <div>
          <Space wrap size={16} style={{ marginRight: 10 }}>
            <Badge>
              <Avatar shape="square" size={50} icon={<UserOutlined />} />
            </Badge>
          </Space>
        </div>
      </Col>
      <Col md={17}>
        <div>
          <div>Souksavanh "Souk"</div>
          <div>SISOUKRAJ</div>
        </div>
      </Col>
    </Row>
    {/* <Divider className="middle-line" />
    <Button
      type="text"
      icon={<LoginOutlined />}
      style={{ width: "100%",textAlign:"left" }}
    >
      Sign out
    </Button>{" "} */}
    <Divider className="middle-line" />
    <Button
      type="text"
      icon={<LoginOutlined />}
      danger
      style={{ width: "100%",textAlign:"left" }}
    >
      Sign out
    </Button>{" "}
  </div>
);
const App = () => {
  // const url =
  //   "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg";
  return (
    <div>
      {/* <Space wrap size={16} style={{marginRight:10}}>
        <Badge dot>
          <Avatar icon={<UserOutlined />} />
        </Badge>
      </Space> */}
      <Popover
        placement="bottomRight"
        // title={text}
        content={content}
        trigger="click"
        style={{ width: 200 }}
      >
        <Space wrap size={16} style={{ marginRight: 10 }}>
          <Badge>
            <Avatar icon={<UserOutlined />} />
          </Badge>
        </Space>
      </Popover>
    </div>
  );
};
export default App;
