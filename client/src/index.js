import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/layout/layout";
import LogIn from "./pages/login-page/login-page";
import Dashboard from "./pages/dashboard/dashboard";
import Admin from "./pages/admin/admin";
import Home from "./pages/home/home";
import NoPage from "./pages/no-page/no-page";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export default function Website() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout /> }>
          <Route index element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="admin" element={<Admin />} /> 
          <Route path="dashboard" element={<Dashboard />} />   
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
