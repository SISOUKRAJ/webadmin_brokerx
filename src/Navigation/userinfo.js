import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space, Popover, Row, Col,Divider } from "antd";

// const text = <span>Title</span>;
const content = (
  <div>
    <Row>
      <Col md={12}>
        <div>
          <Space wrap size={16} style={{ marginRight: 10 }}>
            <Badge dot>
              <Avatar icon={<UserOutlined />} />
            </Badge>
          </Space>
        </div>
      </Col>
      <Col md={12}>
        <div>
          <label>ContenContentContentContentt</label>
        </div>
      </Col>
    </Row>
    <Divider />
    <label>Content</label>
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
      >
        <Space wrap size={16} style={{ marginRight: 10 }}>
          <Badge dot>
            <Avatar icon={<UserOutlined />} />
          </Badge>
        </Space>
      </Popover>
    </div>
  );
};
export default App;
