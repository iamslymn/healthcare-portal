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

export const useThemeMode = () => useContext(ThemeModeContext);

const { defaultAlgorithm, darkAlgorithm } = theme;

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [mode, setMode] = useState<'light' | 'dark'>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as 'light' | 'dark') || 'light';
  });

  // Update data-theme attribute when mode changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const themeMode = useMemo(
    () => ({
      toggleTheme: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('themeMode', newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const antdTheme = {
    algorithm: mode === 'dark' ? darkAlgorithm : defaultAlgorithm,
    token: {
      colorPrimary: '#2196f3',
      borderRadius: 8,
      colorBgContainer: mode === 'dark' ? '#141414' : '#ffffff',
      colorBgElevated: mode === 'dark' ? '#1f1f1f' : '#ffffff',
      colorText: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
      colorTextSecondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
      colorBgLayout: mode === 'dark' ? '#0a0a0a' : '#f0f2f5',
      colorBorder: mode === 'dark' ? '#303030' : '#f0f0f0',
    },
    components: {
      Button: {
        borderRadius: 8,
      },
      Card: {
        borderRadius: 12,
      },
      Layout: {
        colorBgBody: mode === 'dark' ? '#0a0a0a' : '#f0f2f5',
        colorBgHeader: mode === 'dark' ? '#141414' : '#ffffff',
        colorBgContainer: mode === 'dark' ? '#141414' : '#ffffff',
        colorBgLayout: mode === 'dark' ? '#0a0a0a' : '#f0f2f5',
        colorBorder: mode === 'dark' ? '#303030' : '#f0f0f0',
        headerBg: mode === 'dark' ? '#141414' : '#ffffff',
        siderBg: mode === 'dark' ? '#141414' : '#ffffff',
        headerHeight: 64,
      },
      Menu: {
        darkItemBg: '#141414',
        darkItemSelectedBg: '#1f1f1f',
        darkItemHoverBg: '#1f1f1f',
        darkItemColor: 'rgba(255, 255, 255, 0.85)',
        darkSubMenuItemBg: '#141414',
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
          <Router>
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