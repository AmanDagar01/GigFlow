import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import api from "./api/axios";
import { setUser } from "./store/slices/authSlice";

function InitAuth({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // Try to fetch current user via cookie-based auth
    api.get('/auth/me')
      .then((res) => {
        if (res.data) dispatch(setUser(res.data));
      })
      .catch(() => {
        // ignore — user not logged in
      });
  }, [dispatch]);

  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <InitAuth>
        <App />
      </InitAuth>
    </Provider>
  </StrictMode>,
)
