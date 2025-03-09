import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  useTheme,
  useMediaQuery,
  styled,
  Popover,
  ListItemAvatar,
  Paper,
  Button,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
  Chat as ChatIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  LocalHospital as HospitalIcon,
  MedicalServices as MedicalIcon,
  VideoCall as VideoCallIcon,
  Close as CloseIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { useThemeMode } from '../App';
import Footer from './Footer';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar)<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#141414' : '#ffffff'};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  border-bottom: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  transition: all 0.3s ease;

  .MuiIconButton-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
    &:hover {
      color: ${props => props.$isDark ? '#fff' : '#000'};
      background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
    }
  }

  .MuiTypography-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .MuiBadge-badge {
    background-color: ${props => props.$isDark ? '#ff4d4f' : '#f5222d'};
    color: #fff;
  }
`;

const StyledDrawer = styled(Drawer)<{ $isDark: boolean }>`
  .MuiDrawer-paper {
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    border-right: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
    transition: all 0.3s ease;
    width: ${props => props.open ? '240px' : '64px'};
    overflow-x: hidden;
    
    &:hover {
      width: ${props => !props.open ? '240px' : '240px'};
    }
  }

  .MuiListItemButton-root {
    padding: ${props => props.open ? '8px 16px' : '8px 20px'};
    justify-content: ${props => props.open ? 'initial' : 'center'};
    
    &:hover {
      background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
    }
    
    &.Mui-selected {
      background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)'};
    }
  }

  .MuiListItemIcon-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
    min-width: ${props => props.open ? '40px' : '0'};
    margin-right: ${props => props.open ? '16px' : '0'};
    justify-content: center;
  }

  .MuiListItemText-root {
    opacity: ${props => props.open ? 1 : 0};
    transition: opacity 0.3s ease;
  }

  .MuiListItemText-primary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .MuiDivider-root {
    border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
  }

  .MuiIconButton-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
    &:hover {
      color: ${props => props.$isDark ? '#fff' : '#000'};
      background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
    }
  }
`;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface Message {
  id: number;
  sender: string;
  message: string;
  time: string;
  avatar: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Wilson has been confirmed for tomorrow at 10:00 AM',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'New Message',
    message: 'Dr. Michael Brown sent you a message regarding your last visit',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'Prescription Ready',
    message: 'Your prescription is ready for pickup',
    time: '2 hours ago',
    read: true,
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Dr. Sarah Wilson',
    message: 'Hello! How are you feeling today?',
    time: '10:30 AM',
    avatar: 'https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg',
    unread: true,
  },
  {
    id: 2,
    sender: 'Dr. Michael Brown',
    message: 'Your test results look good. No concerns.',
    time: 'Yesterday',
    avatar: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg',
    unread: false,
  },
];

const StyledPopover = styled(Popover)<{ $isDark: boolean }>`
  .MuiPaper-root {
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    border: 1px solid ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};

    .MuiTypography-root {
      color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
    }

    .MuiTypography-secondary {
      color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.6)'};
    }

    .MuiIconButton-root {
      color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
      &:hover {
        color: ${props => props.$isDark ? '#fff' : '#000'};
        background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
      }
    }

    .MuiDivider-root {
      border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
    }

    .MuiListItem-root {
      &:hover {
        background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
      }
    }
  }
`;

const StyledMenu = styled(Menu)<{ $isDark: boolean }>`
  .MuiPaper-root {
    background: ${props => props.$isDark ? '#141414' : '#ffffff'};
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'};
    border: 1px solid ${props => props.$isDark ? '#303030' : '#f0f0f0'};
    z-index: 9999;

    .MuiMenuItem-root {
      color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)'};
      
      &:hover {
        background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'};
      }

      .MuiListItemIcon-root {
        color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.54)'};
      }
    }

    .MuiDivider-root {
      border-color: ${props => props.$isDark ? '#303030' : 'rgba(0, 0, 0, 0.12)'};
    }
  }
`;

const Layout = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { toggleTheme, mode } = useThemeMode();

  // Generate drawer items based on user role
  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Appointments', icon: <CalendarIcon />, path: '/appointments' },
    { text: 'Medical Records', icon: <MedicalIcon />, path: '/medical-records' },
    { text: 'Messages', icon: <ChatIcon />, path: '/messages' },
    // Only show Find Doctors for patients
    ...(user?.role === 'patient' ? [{ text: 'Find Doctors', icon: <HospitalIcon />, path: '/doctors' }] : []),
    { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleMessagesToggle = () => {
    navigate('/messages');
    setMessagesOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
    // Close any open drawers/menus
    setMessagesOpen(false);
    setNotificationAnchorEl(null);
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;
  const unreadMessages = mockMessages.filter(m => m.unread).length;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <StyledAppBar
        $isDark={mode === 'dark'}
        position="fixed"
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            aria-label={open ? 'close drawer' : 'open drawer'}
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Healthcare Portal
          </Typography>

          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 2 }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit" onClick={handleNotificationsOpen}>
              <Badge badgeContent={unreadNotifications} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleMessagesToggle}>
              <Badge badgeContent={unreadMessages} color="error">
                <ChatIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ padding: 0.5 }}
            >
              <Avatar alt={user?.firstName} src="/avatar-placeholder.png" />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Notifications Popover */}
      <StyledPopover
        $isDark={mode === 'dark'}
        open={Boolean(notificationAnchorEl)}
        anchorEl={notificationAnchorEl}
        onClose={handleNotificationsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Paper 
          sx={{ 
            width: 360, 
            maxHeight: 400, 
            overflow: 'auto',
            bgcolor: mode === 'dark' ? '#141414' : '#ffffff',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Notifications</Typography>
            <IconButton size="small" onClick={handleNotificationsClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <List>
            {mockNotifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  backgroundColor: notification.read 
                    ? 'inherit' 
                    : mode === 'dark' 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.04)',
                }}
              >
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </StyledPopover>

      {/* Messages Drawer */}
      <Drawer
        anchor="right"
        open={messagesOpen}
        onClose={() => setMessagesOpen(false)}
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Messages</Typography>
          <Box>
            <Button
              color="primary"
              onClick={handleMessagesToggle}
              sx={{ mr: 1 }}
            >
              View All
            </Button>
            <IconButton onClick={() => setMessagesOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <List>
          {mockMessages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                backgroundColor: message.unread ? 'action.hover' : 'inherit',
                '&:hover': { backgroundColor: 'action.hover' },
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate('/messages');
                setMessagesOpen(false);
              }}
            >
              <ListItemAvatar>
                <Avatar src={message.avatar} alt={message.sender} />
              </ListItemAvatar>
              <ListItemText
                primary={message.sender}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {message.message}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {message.time}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Profile Menu */}
      <StyledMenu
        $isDark={mode === 'dark'}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          zIndex: theme.zIndex.drawer + 2,
          '& .MuiPopover-paper': {
            mt: 1
          }
        }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </StyledMenu>

      <StyledDrawer
        $isDark={mode === 'dark'}
        variant={isMobile ? 'temporary' : 'permanent'}
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: open ? drawerWidth : 64,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 64,
            boxSizing: 'border-box',
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerItems.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              selected={location.pathname === item.path}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                '&:hover': {
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: location.pathname === item.path ? 'primary.main' : 'inherit',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          ))}
        </List>
      </StyledDrawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <DrawerHeader />
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout; 