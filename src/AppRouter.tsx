import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import AuthLayout from './auth/layout/AuthLayout';
import { LoginPage } from './auth/pages/LoginPage';
import { RegisterPage } from './auth/pages/RegisterPage';
import { sleep } from './lib/sleep';

// import ChatLayout from './chat/layout/ChatLayout';
const ChatLayout =  lazy( async() => {
  await sleep(1000);
  return import('./chat/layout/ChatLayout');
});
const ChatPage = lazy(async () => import ('./chat/pages/ChatPage'));
const NoChatSelectedPage = lazy(async () => import ('./chat/pages/NoChatSelectedPage'));

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          {/* <Route path="login" element={<Login />} /> */}
          <Route path="/auth/register" element={<RegisterPage />} />
        </Route>

        <Route path='/chat' element={
          <Suspense fallback={
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <style>{`
                .spinner {
                  width: 64px;
                  height: 64px;
                  position: relative;
                  transform-origin: center center;
                  animation: spinner-rotate 1.2s linear infinite;
                }

                .spinner .dot {
                  --r: 0deg;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 12px;
                  height: 12px;
                  border-radius: 50%;
                  background: linear-gradient(135deg, #6b8cff, #8dd3ff);
                  box-shadow: 0 4px 10px rgba(0,0,0,0.12);
                  transform: translate(-50%, -50%) rotate(var(--r)) translateX(22px);
                }

                .spinner .dot:nth-child(1) { --r: 0deg; }
                .spinner .dot:nth-child(2) { --r: 60deg; }
                .spinner .dot:nth-child(3) { --r: 120deg; }
                .spinner .dot:nth-child(4) { --r: 180deg; }
                .spinner .dot:nth-child(5) { --r: 240deg; }
                .spinner .dot:nth-child(6) { --r: 300deg; }

                @keyframes spinner-rotate {
                  to { transform: rotate(360deg); }
                }
              `}</style>

              <div className="spinner" aria-hidden>
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
                <div className="dot" />
              </div>
            </div>
          }>
            <ChatLayout />
          </Suspense>
        }>
          <Route index element={<NoChatSelectedPage />} />
          <Route path="/chat/:clientId"  element={<ChatPage />} />
        </Route>

        <Route path='/' element={<Navigate to="/auth" />} />
        <Route path='*' element={<Navigate to="/auth" />} />


      </Routes>
    </BrowserRouter>
  );
};
