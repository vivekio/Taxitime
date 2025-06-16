import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './contexts/ConfigContext';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from "@mantine/core";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ConfigProvider>
     <MantineProvider withGlobalStyles withNormalizeCSS>
    <App />
  </MantineProvider>
  </ConfigProvider>
);

reportWebVitals();
