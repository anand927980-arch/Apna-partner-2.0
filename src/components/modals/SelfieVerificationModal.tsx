import React, { useState, useRef } from 'react';
import { X, Camera, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';

export const SelfieVerificationModal: React.FC = () => {
  const { isVerificationModalOpen, setIsVerificationModalOpen, currentUser, verifyUserWithSelfie, t } = useApp();

  const [step, setStep] = useState<'intro' | 'camera' | 'review' | 'success'>('intro');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  if (!isVerificationModalOpen) return null;

  const startCamera = async () => {
    setErrorMsg('');
    try {
      setStep('camera');
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access fallback:', err);
      // If camera access fails or is restricted in iframe, provide sample verified selfie upload/capture
      setErrorMsg('Camera permission not granted. You can upload or verify with sample photo.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 480;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setCapturedImage(dataUrl);
        stopCamera();
        setStep('review');
      }
    }
  };

  const handleFileUploadFallback = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
        stopCamera();
        setStep('review');
      };
      reader.readAsDataURL(file);
    }
  };

  const submitVerification = async () => {
    if (!capturedImage) return;
    try {
      setIsVerifying(true);
      setErrorMsg('');
      await verifyUserWithSelfie(capturedImage);
      sounds.playSuperlike();
      setStep('success');
      setTimeout(() => {
        setIsVerificationModalOpen(false);
        setStep('intro');
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Verification submission failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    setIsVerificationModalOpen(false);
    setStep('intro');
    setCapturedImage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-stone-800 text-stone-900 dark:text-stone-100">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'intro' && (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black mb-1">{t.verification.title}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 leading-relaxed">
              {t.verification.subtitle}
            </p>

            <div className="bg-stone-50 dark:bg-stone-800/60 rounded-2xl p-4 text-left space-y-3 mb-6 border border-stone-200 dark:border-stone-700 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                  1
                </span>
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  {t.verification.step1}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">
                  2
                </span>
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  {t.verification.step2}
                </span>
              </div>
            </div>

            <button
              onClick={startCamera}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              <span>{t.verification.takeSelfie}</span>
            </button>
          </div>
        )}

        {step === 'camera' && (
          <div className="text-center">
            <h4 className="text-base font-black mb-2">Pose with ✌️ Peace Sign</h4>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black border-2 border-blue-500 mb-4 shadow-inner">
              {isCameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-4">
                  <Camera className="w-12 h-12 mb-2 text-stone-500" />
                  <p className="text-xs">{errorMsg || 'Camera Preview'}</p>
                  <label className="mt-3 py-2 px-4 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer hover:bg-blue-700">
                    Upload Pose Selfie
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUploadFallback}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {/* Target Pose Overlay Guide */}
              <div className="absolute inset-0 border-2 border-dashed border-white/50 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-4xl filter drop-shadow opacity-80">✌️</span>
              </div>
            </div>

            {isCameraActive && (
              <button
                onClick={capturePhoto}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
              >
                <Camera className="w-5 h-5" />
                <span>Capture Photo</span>
              </button>
            )}
          </div>
        )}

        {step === 'review' && capturedImage && (
          <div className="text-center">
            <h4 className="text-base font-black mb-2">Confirm Your Selfie</h4>
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-blue-500 mb-4 shadow-md">
              <img src={capturedImage} alt="Captured Pose" className="w-full h-full object-cover" />
            </div>

            <div className="flex gap-2">
              <button
                onClick={startCamera}
                disabled={isVerifying}
                className="flex-1 py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={submitVerification}
                disabled={isVerifying}
                className="flex-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isVerifying ? t.verification.verifying : t.verification.submit}</span>
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-black text-emerald-600 dark:text-emerald-400 mb-1">
              Verified! ✨
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.verification.success}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
