import { Breadcrumb } from "antd";

const Home = () => {
  return (
    <div>
      <Breadcrumb
        separator=">"
        items={[
          {
            title: "Home",
            href: "/",
          },
          {
            title: "Dashbroad",
          },
        ]}
      />
    </div>
  );
};

export default Home;
