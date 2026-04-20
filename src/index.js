import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { ChakraBaseProvider } from '@chakra-ui/react';
import { store } from './Redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChakraBaseProvider>
      <BrowserRouter>
        <App />
       </BrowserRouter>
    </ChakraBaseProvider>
  </Provider>
);
