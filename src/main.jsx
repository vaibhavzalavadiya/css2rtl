import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import DocumentationPage from './assets/pages/Documentation';
import ExamplesPage from './assets/pages/Examples';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import './index.css';

// 👇 Layout that includes Header and Footer
const MainLayout = () => (
  <>
    <Header />
    <main className="min-h-screen px-4 py-6">
      <Outlet />
    </main>
    <Footer />
  </>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<App />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
