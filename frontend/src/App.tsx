import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConfigProvider, theme } from 'antd';
import { useState, useMemo, createContext, useContext, useEffect } from 'react';
import { RootState } from './store';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import MedicalRecords from './components/medical/MedicalRecords';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Messages from './pages/Messages';

// Components
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

// Create theme context
export const ThemeModeContext = createContext({
  toggleTheme: () => {},
  mode: 'light' as 'light' | 'dark'
});

// Export the useThemeMode hook
export const useThemeMode = () => useContext(ThemeModeContext);

// Get the base path for GitHub Pages deployment
const basePath = import.meta.env.BASE_URL || '/';

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Theme state
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  // Set theme in localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', mode);
    // Apply theme to body
    document.body.setAttribute('data-theme', mode);
  }, [mode]);

  // Toggle theme function
  const toggleTheme = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Theme context value
  const themeMode = useMemo(
    () => ({
      toggleTheme,
      mode
    }),
    [mode]
  );

  // Ant Design theme
  const antdTheme = {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#1976d2',
      borderRadius: 4,
      colorBgContainer: mode === 'dark' ? '#141414' : '#ffffff',
      colorBgElevated: mode === 'dark' ? '#1f1f1f' : '#ffffff',
      colorBorder: mode === 'dark' ? '#303030' : '#f0f0f0',
      colorText: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
      colorTextSecondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
    },
    components: {
      Menu: {
        colorItemBg: mode === 'dark' ? '#141414' : '#ffffff',
        colorItemText: mode === 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        colorItemTextSelected: mode === 'dark' ? '#1890ff' : '#1890ff',
        colorItemBgSelected: mode === 'dark' ? '#111b26' : '#e6f7ff',
        colorItemTextHover: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
      },
      Card: {
        colorBgContainer: mode === 'dark' ? '#1f1f1f' : '#ffffff',
        colorBorderSecondary: mode === 'dark' ? '#303030' : '#f0f0f0',
      },
      Table: {
        colorBgContainer: mode === 'dark' ? '#1f1f1f' : '#ffffff',
        colorText: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
        colorTextHeading: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
        colorBorderSecondary: mode === 'dark' ? '#303030' : '#f0f0f0',
      },
    },
  };

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ConfigProvider theme={antdTheme}>
        <div 
          style={{ 
            minHeight: '100vh',
            background: mode === 'dark' ? '#0a0a0a' : '#f0f2f5',
            color: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'
          }}
          data-theme={mode}
        >
          <Router basename={basePath}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to="/dashboard" />} />
              <Route
                path="/login"
                element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/register"
                element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />}
              />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/appointments" element={<Appointments />} />
                  <Route path="/doctors" element={<Doctors />} />
                  <Route path="/medical-records" element={<MedicalRecords />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                </Route>
              </Route>

              {/* Not Found Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
}

export default App; 