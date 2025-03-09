import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Button,
  Dialog,
  DialogContent,
} from '@mui/material';
import {
  Mic as MicIcon,
  MicOff as MicOffIcon,
  Videocam as VideocamIcon,
  VideocamOff as VideocamOffIcon,
  CallEnd as CallEndIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { io, Socket } from 'socket.io-client';

interface VideoConsultationProps {
  appointmentId: string;
  participantRole: 'doctor' | 'patient';
  participantId: string;
  onClose: () => void;
}

const VideoConsultation = ({
  appointmentId,
  participantRole,
  participantId,
  onClose,
}: VideoConsultationProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    initializeCall();
    return () => {
      cleanupCall();
    };
  }, []);

  const initializeCall = async () => {
    try {
      // Initialize WebSocket connection
      socketRef.current = io(process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000');
      
      // Get local media stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Initialize WebRTC peer connection
      const configuration: RTCConfiguration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          // Add TURN servers here for production
        ],
      };
      peerConnectionRef.current = new RTCPeerConnection(configuration);

      // Add local stream tracks to peer connection
      stream.getTracks().forEach((track) => {
        if (peerConnectionRef.current) {
          peerConnectionRef.current.addTrack(track, stream);
        }
      });

      // Handle incoming tracks
      peerConnectionRef.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Set up socket event listeners
      setupSocketListeners();

      // Create and send offer if participant is the doctor
      if (participantRole === 'doctor') {
        createAndSendOffer();
      }
    } catch (error) {
      console.error('Error initializing call:', error);
    }
  };

  const setupSocketListeners = () => {
    if (!socketRef.current) return;

    socketRef.current.on('offer', async (offer: RTCSessionDescriptionInit) => {
      if (!peerConnectionRef.current) return;
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      socketRef.current?.emit('answer', { appointmentId, answer });
    });

    socketRef.current.on('answer', async (answer: RTCSessionDescriptionInit) => {
      if (!peerConnectionRef.current) return;
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socketRef.current.on('ice-candidate', async (candidate: RTCIceCandidateInit) => {
      if (!peerConnectionRef.current) return;
      await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    });
  };

  const createAndSendOffer = async () => {
    if (!peerConnectionRef.current || !socketRef.current) return;

    try {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      socketRef.current.emit('offer', { appointmentId, offer });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  const cleanupCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  };

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const handleEndCall = () => {
    cleanupCall();
    onClose();
  };

  return (
    <Box sx={{ height: '100vh', bgcolor: 'background.default' }}>
      <Grid container spacing={2} sx={{ height: '100%', p: 2 }}>
        {/* Main video display */}
        <Grid item xs={12} md={9}>
          <Paper
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </Paper>
        </Grid>

        {/* Side panel with local video and controls */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ height: '100%', p: 2 }}>
            {/* Local video */}
            <Box sx={{ mb: 2, position: 'relative' }}>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  backgroundColor: '#000',
                }}
              />
            </Box>

            {/* Controls */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
              <IconButton onClick={toggleMute} color={isMuted ? 'error' : 'primary'}>
                {isMuted ? <MicOffIcon /> : <MicIcon />}
              </IconButton>
              <IconButton onClick={toggleVideo} color={isVideoOff ? 'error' : 'primary'}>
                {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
              </IconButton>
              <IconButton onClick={() => setIsChatOpen(true)} color="primary">
                <ChatIcon />
              </IconButton>
              <IconButton onClick={handleEndCall} color="error">
                <CallEndIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Chat Dialog */}
      <Dialog open={isChatOpen} onClose={() => setIsChatOpen(false)}>
        <DialogContent>
          {/* TODO: Implement chat interface */}
          <Typography>Chat feature coming soon...</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoConsultation; 