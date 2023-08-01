import { useState } from "react";
import {
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
  SettingOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
// === Start Part ===
import Router from "../config/routes";
import Userinfo from "./userinfo";
import "./index.css";
// === End Part ===

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("Dashbroad", "/", <PieChartOutlined />),
  getItem("Master Data", "sub2", <DesktopOutlined />, [
    getItem("User", "/user"),
    getItem("Cities", "/cities"),
    getItem("Property Type", "/property_type"),
    getItem("Properties", "/properties"),
  ]),
  getItem("about", "/about", <SettingOutlined />),
  getItem("Images Upload", "/image_upload", <CloudUploadOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  const [current, setCurrent] = useState("/");
  const onClick = (e) => {
    // console.log("click ", e.key);
    setCurrent(e.key);
    navigate(e.key);
  };
  return (
    <div className="min-h-screen">
      <div className="header">
        <div className="header-left-box">
          <Button
            className="btntogleheader"
            type="dashed"
            onClick={toggleCollapsed}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div className="header-right-box">
          <Userinfo />
        </div>
      </div>
      <div className="main-contents">
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          defaultSelectedKeys={["/"]}
          defaultOpenKeys={["sub2"]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
        />
        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
};
export default App;
