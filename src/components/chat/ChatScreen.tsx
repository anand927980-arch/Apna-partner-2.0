import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Send,
  MoreVertical,
  ShieldAlert,
  Ban,
  Trash2,
  Smile,
  Check,
  CheckCheck,
  Phone,
  Video,
  MapPin,
  Sparkles,
  Mic,
  Square,
  Image as ImageIcon,
  Play,
  Pause,
  Eye,
  EyeOff,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatScreenProps {
  matchId: string;
  onBack: () => void;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ matchId, onBack }) => {
  const {
    matches,
    chatMessages,
    sendMessage,
    sendVoiceMessage,
    sendMediaMessage,
    deleteMessage,
    currentUser,
    allProfiles,
    openReportModal,
    openBlockModal,
    openDetailModal,
    t,
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [revealedImages, setRevealedImages] = useState<Set<string>>(new Set());

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  const match = matches.find(m => m.id === matchId);
  const messages = chatMessages[matchId] || [];

  const otherUserId = match?.userIds.find(id => id !== currentUser?.id) || '';
  const otherProfile = allProfiles.find(p => p.id === otherUserId);
  const otherMatchUser = match?.users[otherUserId];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isRecording]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!match || !currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-stone-500">
        <p>Conversation not found.</p>
        <button onClick={onBack} className="text-xs text-rose-600 font-bold mt-2">
          ← Back to Matches
        </button>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(matchId, inputText);
    setInputText('');
    setShowEmojis(false);

    // Simulate other user typing indicator after 1.2s
    setTimeout(() => setIsTyping(true), 1200);
    setTimeout(() => setIsTyping(false), 2400);
  };

  const handleIcebreakerClick = (text: string) => {
    sendMessage(matchId, text);
    setTimeout(() => setIsTyping(true), 1200);
    setTimeout(() => setIsTyping(false), 2400);
  };

  // Image sharing in chat
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        sendMediaMessage(matchId, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleImageReveal = (msgId: string) => {
    setRevealedImages(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  // Voice Note Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = e => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          sendVoiceMessage(matchId, reader.result as string, recordSeconds || 5);
        };
        reader.readAsDataURL(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordSeconds(s => s + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access fallback, using synthetic memo');
      // Synthetic demo voice message for testing
      setIsRecording(true);
      setRecordSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordSeconds(s => s + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    } else {
      // Fallback synthetic voice memo
      const synthAudioUrl = 'https://actions.google.com/sounds/v1/water/rain_heavy.ogg';
      sendVoiceMessage(matchId, synthAudioUrl, Math.max(3, recordSeconds));
    }
  };

  const togglePlayAudio = (msgId: string, url?: string) => {
    if (playingAudioId === msgId) {
      audioPlayerRef.current?.pause();
      setPlayingAudioId(null);
    } else {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
      }
      if (url) {
        const audio = new Audio(url);
        audioPlayerRef.current = audio;
        audio.play();
        setPlayingAudioId(msgId);
        audio.onended = () => setPlayingAudioId(null);
      }
    }
  };

  const quickEmojis = ['❤️', '😊', '🔥', '🌸', '☕', '✨', '👋', '🎉'];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto bg-white dark:bg-stone-900 border-x border-stone-100 dark:border-stone-800">
      {/* Audio hidden container */}
      <audio ref={audioPlayerRef} className="hidden" />

      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => otherProfile && openDetailModal(otherProfile)}
            className="flex items-center gap-2.5 text-left focus:outline-none"
          >
            <div className="relative">
              <img
                src={otherMatchUser?.photoURL || otherProfile?.photoURL}
                alt={otherMatchUser?.name || otherProfile?.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-rose-500/30"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                  {otherMatchUser?.name || otherProfile?.name}
                </span>
                {otherProfile?.district === 'Chatra' && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300">
                    Chatra ⭐
                  </span>
                )}
                {otherProfile?.isVerified && (
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                )}
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block">
                {isTyping ? 'Typing...' : t.chat.online}
              </span>
            </div>
          </button>
        </div>

        {/* Action Controls & More Menu */}
        <div className="flex items-center gap-1 relative">
          <button
            onClick={() => alert(`Connecting secure audio call with ${otherMatchUser?.name}...`)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Audio Call"
          >
            <Phone className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => alert(`Connecting HD video call with ${otherMatchUser?.name}...`)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Video Call"
          >
            <Video className="w-4.5 h-4.5" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <MoreVertical className="w-4.5 h-4.5" />
          </button>

          {/* Dropdown Menu for Safety */}
          {isMenuOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (otherProfile) openDetailModal(otherProfile);
                }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center gap-2"
              >
                <span>View Full Profile</span>
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (otherProfile) openReportModal(otherProfile);
                }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{t.chat.report}</span>
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  if (otherProfile) openBlockModal(otherProfile);
                }}
                className="w-full px-4 py-2 text-left text-xs font-semibold text-stone-500 hover:bg-stone-100 dark:hover:bg-stone-700 flex items-center gap-2"
              >
                <Ban className="w-4 h-4" />
                <span>{t.chat.block}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Safety Notice Strip */}
      <div className="px-4 py-1.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 flex items-center justify-center gap-1.5 text-center">
        <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-amber-600" />
        <span>{t.chat.safetyWarning}</span>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/50 dark:bg-stone-950/30">
        {/* Match introduction banner */}
        <div className="flex flex-col items-center justify-center p-4 my-2 text-center">
          <img
            src={otherMatchUser?.photoURL || otherProfile?.photoURL}
            alt={otherMatchUser?.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-rose-500/20 shadow-md mb-2"
            referrerPolicy="no-referrer"
          />
          <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
            You matched with {otherMatchUser?.name}
          </p>
          <p className="text-[11px] text-stone-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-rose-500" />
            <span>{otherProfile?.district || 'Jharkhand'}</span>
          </p>
        </div>

        {/* Chat Messages */}
        {messages.map(msg => {
          const isMe = msg.senderId === currentUser.id;
          const isRevealed = revealedImages.has(msg.id);

          return (
            <div
              key={msg.id}
              className={`flex items-end gap-1.5 ${isMe ? 'justify-end' : 'justify-start'} group`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[80%] sm:max-w-[70%] px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs relative ${
                  isMe
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-br-xs'
                    : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-bl-xs'
                } ${msg.isDeleted ? 'italic opacity-60' : ''}`}
              >
                {/* Text Message */}
                {msg.text && <p>{msg.text}</p>}

                {/* Voice Note Audio Player */}
                {msg.mediaType === 'audio' && (
                  <div className="mt-2 flex items-center gap-3 bg-black/10 dark:bg-white/10 p-2.5 rounded-xl min-w-[200px]">
                    <button
                      onClick={() => togglePlayAudio(msg.id, msg.mediaURL)}
                      className="w-9 h-9 rounded-full bg-white dark:bg-stone-700 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 shadow-sm"
                    >
                      {playingAudioId === msg.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 h-4">
                        {[40, 70, 90, 60, 30, 80, 50, 65, 45, 95, 40].map((h, idx) => (
                          <span
                            key={idx}
                            style={{ height: `${h}%` }}
                            className={`w-1 rounded-full ${
                              playingAudioId === msg.id
                                ? 'bg-rose-400 animate-pulse'
                                : isMe
                                ? 'bg-rose-200'
                                : 'bg-stone-400'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] opacity-80 mt-1 block">
                        {msg.audioDurationSeconds || 5}s Voice Memo
                      </span>
                    </div>
                  </div>
                )}

                {/* Image Media with Safety Preview Blur */}
                {msg.mediaType === 'image' && msg.mediaURL && (
                  <div className="mt-2 relative rounded-xl overflow-hidden max-w-xs">
                    <img
                      src={msg.mediaURL}
                      alt="Chat photo"
                      className={`w-full max-h-56 object-cover rounded-xl transition-all duration-300 ${
                        !isMe && msg.isBlurred && !isRevealed ? 'blur-xl scale-105' : ''
                      }`}
                    />
                    {!isMe && msg.isBlurred && !isRevealed && (
                      <button
                        onClick={() => toggleImageReveal(msg.id)}
                        className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white p-3 text-center"
                      >
                        <Eye className="w-6 h-6 mb-1 text-white" />
                        <span className="text-xs font-bold">{t.chat.tapToReveal}</span>
                      </button>
                    )}
                  </div>
                )}

                <div
                  className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                    isMe ? 'text-rose-100' : 'text-stone-400'
                  }`}
                >
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  {isMe && (
                    <span>
                      {msg.isRead ? (
                        <CheckCheck className="w-3.5 h-3.5 text-sky-200" />
                      ) : (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Message Delete Action */}
              {isMe && !msg.isDeleted && (
                <button
                  onClick={() => deleteMessage(matchId, msg.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-stone-400 hover:text-rose-500 transition-opacity"
                  title="Delete message"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}

        {/* Typing indicator bubble */}
        {isTyping && (
          <div className="flex items-center gap-1.5 justify-start">
            <div className="px-4 py-2.5 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce" />
              <span
                className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.2s' }}
              />
              <span
                className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-bounce"
                style={{ animationDelay: '0.4s' }}
              />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Icebreaker Suggestions */}
      {messages.length < 4 && (
        <div className="px-4 py-2 border-t border-stone-100 dark:border-stone-800 bg-white/70 dark:bg-stone-900/70 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
          <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1 shrink-0 px-2 py-1">
            <Sparkles className="w-3 h-3" /> {t.chat.icebreakers}:
          </span>
          {t.icebreakersList.map((ice, i) => (
            <button
              key={i}
              onClick={() => handleIcebreakerClick(ice)}
              className="text-xs px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800 hover:bg-rose-100 transition-colors shrink-0"
            >
              {ice}
            </button>
          ))}
        </div>
      )}

      {/* Voice Recording Banner */}
      {isRecording && (
        <div className="px-4 py-3 bg-rose-600 text-white flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span>{t.chat.recording} ({recordSeconds}s)</span>
          </div>
          <button
            onClick={stopRecording}
            className="px-3 py-1.5 rounded-xl bg-white text-rose-600 font-bold text-xs flex items-center gap-1.5 shadow-sm"
          >
            <Square className="w-3.5 h-3.5 fill-rose-600" />
            <span>Done & Send</span>
          </button>
        </div>
      )}

      {/* Emoji Picker Bar */}
      {showEmojis && (
        <div className="px-4 py-2 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/80 flex items-center justify-between">
          <div className="flex gap-2">
            {quickEmojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => setInputText(prev => prev + emoji)}
                className="text-lg hover:scale-125 transition-transform p-1"
              >
                {emoji}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowEmojis(false)}
            className="text-xs text-stone-400 hover:text-stone-600"
          >
            Close
          </button>
        </div>
      )}

      {/* Chat Input Form */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center gap-1.5"
      >
        <button
          type="button"
          onClick={() => setShowEmojis(!showEmojis)}
          className="p-2 rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-stone-800 transition-colors"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Photo Upload in Chat */}
        <label className="p-2 rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-stone-800 transition-colors cursor-pointer">
          <ImageIcon className="w-5 h-5" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Voice Note Button */}
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full transition-colors ${
            isRecording
              ? 'text-rose-600 bg-rose-100 dark:bg-rose-950 animate-pulse'
              : 'text-stone-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-stone-800'
          }`}
          title="Send Voice Memo"
        >
          <Mic className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder={t.chat.placeholder}
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-transparent focus:border-rose-500 focus:bg-white dark:focus:bg-stone-900 text-xs sm:text-sm text-stone-900 dark:text-stone-100 focus:outline-none transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white disabled:opacity-40 shadow-sm transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
