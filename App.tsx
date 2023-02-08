import * as React from 'react';
import { Button, ConfigProvider } from './components';
import './style.css';

export default function App() {
  return (
    <ConfigProvider>
      <Button>哈哈</Button>
      <ConfigProvider
        autoInsertSpaceInButton={false}
        theme={{ token: { colorPrimary: '#00b96b' } }}
      >
        <Button>哈哈</Button>
      </ConfigProvider>
    </ConfigProvider>
  );
}
