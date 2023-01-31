import * as React from 'react';
import { Button, ConfigProvider } from './components';
import './style.css';

export default function App() {
  return (
    <ConfigProvider>
      <Button>哈哈</Button>
    </ConfigProvider>
  );
}
