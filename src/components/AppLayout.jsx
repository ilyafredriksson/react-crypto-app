import { Layout , Spin} from "antd";
import AppHeader from "./Layout/AppHeader.jsx";
import AppSider from "./Layout/AppSider.jsx";
import AppContent from "./Layout/AppContent.jsx";
import { useContext } from "react";
import { CryptoContext } from "../context/crypto-context.jsx";




export default function AppLayout() {
  const {loading} = useContext(CryptoContext);

  if (loading) return <Spin fullscreen />
    return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
    )
}