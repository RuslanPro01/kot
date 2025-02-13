import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'dayjs/locale/ru'
import App from './App.tsx'
import dayjs from 'dayjs';

dayjs.locale('ru');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
