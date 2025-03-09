import { useState, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Grid,
  InputAdornment,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useThemeMode } from '../App';

const StyledPaper = styled(Paper)<{ $isDark: boolean }>`
  height: 100%;
  overflow: auto;
  background: ${props => props.$isDark ? '#1a1a1a' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'};
  color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isDark ? '0 4px 12px rgba(0, 0, 0, 0.5)' : '0 4px 12px rgba(0, 0, 0, 0.1)'};
`;

const StyledListItem = styled(ListItem)<{ $isDark: boolean }>`
  &.Mui-selected {
    background-color: ${props => props.$isDark ? 'rgba(25, 118, 210, 0.15)' : 'rgba(25, 118, 210, 0.08)'} !important;
  }
  &:hover {
    background-color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
  }
  .MuiTypography-root {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }
  .MuiTypography-secondary {
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.6)'};
  }
  border-radius: 8px;
  margin: 4px 8px;
  transition: all 0.2s ease;
`;

const StyledDivider = styled(Divider)<{ $isDark: boolean }>`
  background-color: ${props => props.$isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'};
`;

const StyledTextField = styled(TextField)<{ $isDark: boolean }>`
  .MuiOutlinedInput-root {
    background-color: ${props => props.$isDark ? '#242424' : '#ffffff'};
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
    border-radius: 12px;
    transition: all 0.2s ease;

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#404040' : 'rgba(0, 0, 0, 0.23)'};
    }
    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${props => props.$isDark ? '#2196f3' : '#1976d2'};
      border-width: 2px;
    }
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${props => props.$isDark ? '#333333' : 'rgba(0, 0, 0, 0.23)'};
    transition: all 0.2s ease;
  }
`;

const StyledFilePreview = styled(Box)<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px;
  margin: 8px 0;
  border-radius: 8px;
  background: ${props => props.$isDark ? '#242424' : '#f5f5f5'};
  border: 1px solid ${props => props.$isDark ? '#333333' : '#e0e0e0'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$isDark ? '#2a2a2a' : '#eeeeee'};
  }

  .file-name {
    margin-left: 12px;
    flex-grow: 1;
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit'};
  }

  .file-size {
    margin-left: 12px;
    color: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.6)'};
  }
`;

interface MessageAttachment {
  name: string;
  size: number;
  type: string;
}

interface Message {
  id: number;
  text: string;
  time: string;
  sent: boolean;
  attachments?: MessageAttachment[];
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  unread: number;
  messages: Message[];
}

interface FileAttachment {
  file: File;
  preview?: string;
}

// Mock data for messages
const mockChats: Chat[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    avatar: "/avatars/doctor1.jpg",
    lastMessage: "I'll check your test results",
    unread: 2,
    messages: [
      {
        id: 1,
        text: "Hello, how can I help you today?",
        time: "09:30",
        sent: false
      },
      {
        id: 2,
        text: "I've been having some concerns about...",
        time: "09:32",
        sent: true
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Michael Brown",
    avatar: "/avatars/doctor2.jpg",
    lastMessage: "Your test results look good. No concerns.",
    unread: 2,
    messages: [
      {
        id: 1,
        text: "Your test results look good. No concerns.",
        time: "Yesterday",
        sent: false
      },
      {
        id: 2,
        text: "That's great news! Thank you for checking.",
        time: "Yesterday",
        sent: true
      }
    ]
  },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [showAttachmentDialog, setShowAttachmentDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const handleSendMessage = (closeDialog: boolean = true) => {
    if (!newMessage.trim() && attachments.length === 0) return;

    const updatedChat = {
      ...selectedChat,
      messages: [
        ...selectedChat.messages,
        {
          id: selectedChat.messages.length + 1,
          text: newMessage,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sent: true,
          attachments: attachments.map(att => ({
            name: att.file.name,
            size: att.file.size,
            type: att.file.type
          }))
        },
      ],
    };

    setSelectedChat(updatedChat);
    setNewMessage('');
    setAttachments([]);
    if (closeDialog) {
      setShowAttachmentDialog(false);
    }
  };

  const handleSendClick = () => {
    handleSendMessage(false);
  };

  const handleDialogSendClick = () => {
    handleSendMessage(true);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newAttachments: FileAttachment[] = files.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
    setShowAttachmentDialog(true);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setAttachments(prev => {
      const newAttachments = [...prev];
      if (newAttachments[index].preview) {
        URL.revokeObjectURL(newAttachments[index].preview!);
      }
      newAttachments.splice(index, 1);
      return newAttachments;
    });

    if (attachments.length <= 1) {
      setShowAttachmentDialog(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ 
      height: '100%',
      bgcolor: isDark ? '#121212' : '#f5f5f5',
      transition: 'background-color 0.2s ease'
    }}>
      <Typography 
        variant="h4" 
        gutterBottom
        sx={{ 
          color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit',
          p: 2,
          pb: 1
        }}
      >
        Messages
      </Typography>
      <Grid container spacing={2} sx={{ height: 'calc(100vh - 180px)', px: 2 }}>
        {/* Chat List */}
        <Grid item xs={12} md={4}>
          <StyledPaper $isDark={isDark}>
            <List sx={{ 
              width: '100%', 
              bgcolor: 'transparent',
              p: 1
            }}>
              {mockChats.map((chat) => (
                <ListItem
                  key={chat.id}
                  button
                  selected={selectedChat.id === chat.id}
                  onClick={() => setSelectedChat(chat)}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: selectedChat.id === chat.id 
                      ? isDark ? 'rgba(25, 118, 210, 0.08)' : 'primary.light' 
                      : 'transparent',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={chat.avatar} alt={chat.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'text.secondary',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {chat.lastMessage}
                      </Typography>
                    }
                  />
                  {chat.unread > 0 && (
                    <Badge
                      badgeContent={chat.unread}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: isDark ? '#1976d2' : undefined,
                        },
                      }}
                    />
                  )}
                </ListItem>
              ))}
            </List>
          </StyledPaper>
        </Grid>

        {/* Chat Window */}
        <Grid item xs={12} md={8}>
          <StyledPaper $isDark={isDark} sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            borderRadius: 2,
            overflow: 'hidden'
          }}>
            {/* Chat Header */}
            <Box sx={{ 
              p: 2, 
              borderBottom: `1px solid ${isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'}`,
              bgcolor: isDark ? '#1f1f1f' : '#ffffff',
              transition: 'background-color 0.2s ease'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar src={selectedChat.avatar} alt={selectedChat.name} />
                <Box>
                  <Typography 
                    variant="subtitle1"
                    sx={{ color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit' }}
                  >
                    {selectedChat.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ color: isDark ? 'rgba(255, 255, 255, 0.45)' : 'text.secondary' }}
                  >
                    {selectedChat.lastMessage}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ 
              flexGrow: 1, 
              overflow: 'auto', 
              p: 2,
              bgcolor: isDark ? '#1a1a1a' : '#ffffff',
              transition: 'background-color 0.2s ease'
            }}>
              {selectedChat.messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sent ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: '70%',
                      backgroundColor: message.sent 
                        ? isDark ? 'rgba(25, 118, 210, 0.15)' : '#1976d2'
                        : isDark ? '#242424' : '#f5f5f5',
                      color: message.sent 
                        ? isDark ? '#90caf9' : '#ffffff'
                        : isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.87)',
                      borderRadius: 2,
                      p: 2,
                      boxShadow: isDark 
                        ? '0 2px 8px rgba(0,0,0,0.4)' 
                        : '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Typography variant="body1">{message.text}</Typography>
                    {message.attachments?.map((attachment, index) => (
                      <Box
                        key={index}
                        sx={{
                          mt: 1,
                          p: 1,
                          borderRadius: 1,
                          bgcolor: 'rgba(0, 0, 0, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <FileIcon sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          {attachment.name} ({formatFileSize(attachment.size)})
                        </Typography>
                      </Box>
                    ))}
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        opacity: 0.7,
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box sx={{ 
              p: 2, 
              borderTop: `1px solid ${isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'}`,
              bgcolor: isDark ? '#1f1f1f' : '#ffffff',
              transition: 'background-color 0.2s ease'
            }}>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileSelect}
                multiple
              />
              <StyledTextField
                $isDark={isDark}
                fullWidth
                multiline
                maxRows={4}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Attach files">
                        <IconButton 
                          onClick={() => fileInputRef.current?.click()}
                          sx={{ 
                            color: isDark ? 'rgba(255, 255, 255, 0.45)' : undefined,
                            '&:hover': {
                              color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
                            }
                          }}
                        >
                          <Badge badgeContent={attachments.length} color="primary">
                            <AttachFileIcon />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                      <IconButton 
                        onClick={handleSendClick} 
                        color="primary"
                        disabled={!newMessage.trim() && attachments.length === 0}
                        sx={{
                          color: isDark ? '#1976d2' : undefined,
                          '&:hover': {
                            color: isDark ? '#1976d2' : undefined,
                          }
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Attachment Preview Dialog */}
      <Dialog
        open={showAttachmentDialog}
        onClose={() => setShowAttachmentDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark ? '#1a1a1a' : '#ffffff',
            color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'inherit',
            borderRadius: 2,
            boxShadow: isDark 
              ? '0 8px 32px rgba(0,0,0,0.5)' 
              : '0 8px 32px rgba(0,0,0,0.1)',
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: `1px solid ${isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'}`,
          bgcolor: isDark ? '#1f1f1f' : '#ffffff'
        }}>
          Attachments
        </DialogTitle>
        <DialogContent sx={{ 
          bgcolor: isDark ? '#1a1a1a' : '#ffffff',
          py: 2
        }}>
          {attachments.map((attachment, index) => (
            <StyledFilePreview key={index} $isDark={isDark}>
              {attachment.preview ? (
                <img 
                  src={attachment.preview} 
                  alt="preview" 
                  style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4 }} 
                />
              ) : (
                <FileIcon />
              )}
              <Typography className="file-name">{attachment.file.name}</Typography>
              <Typography className="file-size">{formatFileSize(attachment.file.size)}</Typography>
              <IconButton size="small" onClick={() => handleRemoveAttachment(index)}>
                <CloseIcon />
              </IconButton>
            </StyledFilePreview>
          ))}
        </DialogContent>
        <DialogActions sx={{ 
          borderTop: `1px solid ${isDark ? '#333333' : 'rgba(0, 0, 0, 0.12)'}`,
          bgcolor: isDark ? '#1f1f1f' : '#ffffff',
          px: 3,
          py: 2
        }}>
          <Button 
            onClick={() => setShowAttachmentDialog(false)}
            sx={{ 
              color: isDark ? 'rgba(255, 255, 255, 0.45)' : undefined,
              '&:hover': {
                color: isDark ? 'rgba(255, 255, 255, 0.85)' : undefined,
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDialogSendClick}
            variant="contained" 
            color="primary"
            disabled={attachments.length === 0}
            sx={{
              ml: 1,
              bgcolor: isDark ? '#2196f3' : undefined,
              '&:hover': {
                bgcolor: isDark ? '#1976d2' : undefined,
              }
            }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Messages; 