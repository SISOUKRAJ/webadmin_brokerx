import { useState } from "react";
import {
  PieChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";
import { useNavigate } from "react-router-dom";
// === Start Part ===
import Router from "../config/routes"
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
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("about", "/about", <DesktopOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const navigate = useNavigate();

  const [current, setCurrent] = useState("/");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    navigate(e.key);
  };

  return (
    <div>
      <div className="header">
        <div className="header-left-box">
          <Button className="btntogleheader" type="dashed" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
        <div className="header-right-box">
          <Userinfo />
        </div>
      </div>
      <div
        className="contents"
        style={{
          width: "100vw",
        }}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          defaultSelectedKeys={["/"]}
          defaultOpenKeys={["sub2"]}
          mode="inline"
          theme=""
          inlineCollapsed={collapsed}
          items={items}
          style={{
            height: "95vh",
          }}
        />
        <div className="content">
          <Router/>
        </div>
      </div>
    </div>
  );
};
export default App;
