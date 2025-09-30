import { Layout } from "antd";
import AppHeader from "./components/Layout/AppHeader.jsx";
import AppSider from "./components/Layout/AppSider.jsx";
import AppContent from "./components/Layout/AppContent.jsx";
import { CryptoContextProvider } from "./context/crypto-context.jsx";

export default function App() {
  return (
    <CryptoContextProvider>
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
    </CryptoContextProvider>
  );
}