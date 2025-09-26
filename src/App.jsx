import { Layout } from "antd";
import AppHeader from "./components/Layoy/AppHeader";
import AppSider from "./components/Layoy/AppSider";
import AppContent from "./components/Layoy/AppContent";
import { ArrowUpOutlined } from "@ant-design/icons";


export default function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <ArrowUpOutlined />
        <AppContent />
      </Layout>
    </Layout>
  );
}
