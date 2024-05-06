import React from 'react';
// import ReactDOM from 'react-dom'; // Correct import statement
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd';
import { Provider } from 'react-redux';
import store from './app/store';


import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//     <Provider store={store}>
//       <Routes>
//         <Route path="/" element={<App />} /> {/* Removed unnecessary curly braces */}
//       </Routes>
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
