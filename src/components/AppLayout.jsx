import React from 'react';
import { Layout, Spin } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import AppHeader from './Layout/AppHeader.jsx';
import AppSider from './Layout/AppSider.jsx';
import AppContent from './Layout/AppContent.jsx';
import { useCrypto } from '../context/crypto-context.jsx';

export default function AppLayout() {
  const { loading } = useCrypto();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <GlobalOutlined style={{ fontSize: '48px', color: '#fff', marginBottom: '16px' }} />
          <div style={{ color: '#fff', fontSize: '18px', fontWeight: '500' }}>Loading Portfolio...</div>
          <Spin size="large" style={{ marginTop: '16px' }} />
        </div>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}