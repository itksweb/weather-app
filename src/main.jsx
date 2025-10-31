import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WeatherInfoProvider } from './store/weatherInfoContext.js'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WeatherInfoProvider>
      <App />
    </WeatherInfoProvider>
  </StrictMode>
);
