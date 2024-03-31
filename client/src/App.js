import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from "./pages/layout/layout";
import LogIn from "./pages/login-page/login-page";
import Dashboard from "./pages/dashboard/dashboard";
import Admin from "./pages/admin/admin";
import Home from "./pages/home/home";
import NoPage from "./pages/no-page/no-page";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}/>
          <Route path="/" index element={<Home />} />
          <Route path="login" element={<LogIn />} />
          <Route path="admin" element={<Admin />} /> 
          <Route path="dashboard" element={<Dashboard />} />   
          <Route path="*" element={<NoPage />} />
          
      </Routes>
    </BrowserRouter>
  );
}