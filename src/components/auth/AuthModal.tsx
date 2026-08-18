import React, { useState } from 'react';
import { X, Smartphone, Mail, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { ConfirmationResult } from 'firebase/auth';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    sendPhoneOtp,
    verifyPhoneOtp,
    loginWithQuickMobile,
    isLoading,
  } = useApp();

  const [authMode, setAuthMode] = useState<'options' | 'phone_input' | 'otp_verify' | 'email_login' | 'email_signup'>('options');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('2001-01-01');
  const [gender, setGender] = useState<'man' | 'woman' | 'other'>('man');
  const [district, setDistrict] = useState('Chatra');
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmResult, setConfirmResult] = useState<ConfirmationResult | any>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [ageWarning, setAgeWarning] = useState('');
  const [fallbackCodeNotice, setFallbackCodeNotice] = useState<string | null>(null);

  // Calculate age dynamically from DOB
  const calculateAge = (birthDateString: string): number => {
    if (!birthDateString) return 0;
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDob(val);
    const age = calculateAge(val);
    if (age < 18) {
      setAgeWarning('⚠️ You must be at least 18 years old to join Apna Partner.');
    } else {
      setAgeWarning('');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setErrorMessage('');
      const success = await loginWithGoogle();
      if (!success) {
        setErrorMessage('Google login canceled or failed.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Google login failed. Please try again.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please enter email and password.');
      return;
    }
    const success = await loginWithEmail(email, password);
    if (!success) {
      setErrorMessage('Invalid email or password.');
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const age = calculateAge(dob);
    if (age < 18) {
      setErrorMessage('Access Restricted: Apna Partner is strictly for adults (18+).');
      return;
    }
    if (!name || !email || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    const success = await signupWithEmail(email, password, name, dob);
    if (!success) {
      setErrorMessage('Sign up failed. Email may already be in use.');
    }
  };

  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!phone || phone.length < 10) {
      setErrorMessage('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।');
      return;
    }
    const age = calculateAge(dob);
    if (age < 18) {
      setErrorMessage('Access Restricted: Apna Partner केवल 18+ वयस्कों के लिए है।');
      return;
    }

    try {
      const success = await loginWithQuickMobile(phone, name || `Member ${phone.slice(-4)}`, dob, gender, district);
      if (!success) {
        setErrorMessage('Login failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Login error occurred.');
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setFallbackCodeNotice(null);
    if (!phone || phone.length < 10) {
      setErrorMessage('कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें। (Please enter 10-digit mobile number)');
      return;
    }
    const age = calculateAge(dob);
    if (age < 18) {
      setErrorMessage('Access Restricted: Apna Partner केवल 18+ वयस्कों के लिए है।');
      return;
    }

    try {
      const confirmation: any = await sendPhoneOtp(phone, 'recaptcha-container');
      if (confirmation) {
        setConfirmResult(confirmation);
        if (confirmation.code) {
          setFallbackCodeNotice(confirmation.code);
          setOtp(confirmation.code); // auto-fill convenient OTP
        }
        setAuthMode('otp_verify');
      } else {
        // Instant direct login fallback
        await loginWithQuickMobile(phone, name, dob, gender, district);
      }
    } catch (err: any) {
      // If any issue, perform instant login
      await loginWithQuickMobile(phone, name, dob, gender, district);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!otp || otp.length < 6) {
      setErrorMessage('Please enter the 6-digit OTP.');
      return;
    }
    if (!confirmResult) {
      setErrorMessage('Session expired. Please request a new OTP.');
      return;
    }
    const success = await verifyPhoneOtp(confirmResult, otp, dob, name);
    if (!success) {
      setErrorMessage('Invalid verification code.');
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-stone-800 text-stone-900 dark:text-stone-100 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
        {/* ReCAPTCHA invisible anchor */}
        <div id="recaptcha-container"></div>

        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <BrandLogo size="lg" showTagline />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
            Jharkhand's Safe & Verified Adult (18+) Dating Community
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {authMode === 'options' && (
          <div className="space-y-3">
            {/* Google Sign-in */}
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/80 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-xs"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Mobile OTP Option */}
            <button
              onClick={() => setAuthMode('phone_input')}
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md shadow-rose-500/20"
            >
              <Smartphone className="w-5 h-5" />
              <span>Login with Mobile OTP (+91)</span>
            </button>

            {/* Email / Password Options */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setAuthMode('email_login')}
                className="py-3 px-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4 text-stone-500" />
                <span>Email Login</span>
              </button>
              <button
                onClick={() => setAuthMode('email_signup')}
                className="py-3 px-3 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Create Account</span>
              </button>
            </div>

            {/* Safety & 18+ Guarantee Note */}
            <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800 text-center">
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Privacy & Encrypted Matches</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Your phone number, email and identity are never exposed to other members.
              </p>
            </div>
          </div>
        )}

        {authMode === 'phone_input' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Anand Kumar"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Date of Birth (18+ Mandatory)
              </label>
              <input
                type="date"
                value={dob}
                onChange={handleDobChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              {dob && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 font-medium">
                  Age calculated: <span className="font-bold text-rose-600 dark:text-rose-400">{calculateAge(dob)} years</span>
                </p>
              )}
              {ageWarning && (
                <p className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1">
                  {ageWarning}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Mobile Phone Number (+91)
              </label>
              <div className="flex gap-2">
                <span className="px-3 py-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-sm font-bold text-stone-600 dark:text-stone-300 border border-stone-300 dark:border-stone-700 flex items-center">
                  🇮🇳 +91
                </span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 tracking-wider font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  लिंग (Gender)
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="man">पुरुष (Man)</option>
                  <option value="woman">महिला (Woman)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                  ज़िला (District)
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="Chatra">चतरा (Chatra)</option>
                  <option value="Hazaribagh">हज़ारीबाग (Hazaribagh)</option>
                  <option value="Ranchi">राँची (Ranchi)</option>
                  <option value="Gaya">गया (Gaya)</option>
                  <option value="Dhanbad">धनबाद (Dhanbad)</option>
                  <option value="Bokaro">बोकारो (Bokaro)</option>
                  <option value="Giridih">गिरिडीह (Giridih)</option>
                  <option value="Koderma">कोडरमा (Koderma)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleQuickLogin}
                disabled={isLoading || calculateAge(dob) < 18}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isLoading ? 'प्रवेश किया जा रहा है...' : '⚡ तुरंत 1-क्लिक में लॉगिन करें (Instant Login)'}</span>
              </button>

              <button
                type="submit"
                disabled={isLoading || calculateAge(dob) < 18}
                className="w-full py-2.5 rounded-xl border border-rose-200 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>OTP सुरक्षा कोड द्वारा प्रवेश करें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setAuthMode('options')}
              className="w-full text-center text-xs text-stone-500 dark:text-stone-400 hover:underline pt-2"
            >
              ← Back to login options
            </button>
          </form>
        )}

        {authMode === 'otp_verify' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Enter OTP code sent to <span className="font-bold text-stone-700 dark:text-stone-200">+91 {phone}</span>
              </p>
              {fallbackCodeNotice && (
                <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span>सुरक्षा कोड (OTP): <span className="text-sm tracking-widest font-black text-emerald-800 dark:text-emerald-200">{fallbackCodeNotice}</span></span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1 text-center">
                Enter 6-Digit OTP
              </label>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-lg text-center tracking-widest font-black focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-500/20"
            >
              <span>{isLoading ? 'Verifying...' : 'Verify & Enter'}</span>
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('phone_input')}
              className="w-full text-center text-xs text-stone-500 dark:text-stone-400 hover:underline pt-1"
            >
              ← Edit Phone Number
            </button>
          </form>
        )}

        {authMode === 'email_login' && (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-500/20"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? 'Signing In...' : 'Sign In with Email'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('options')}
              className="w-full text-center text-xs text-stone-500 dark:text-stone-400 hover:underline pt-1"
            >
              ← Back to login options
            </button>
          </form>
        )}

        {authMode === 'email_signup' && (
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Date of Birth (18+ Mandatory)
              </label>
              <input
                type="date"
                value={dob}
                onChange={handleDobChange}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              {dob && (
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 font-medium">
                  Age calculated: <span className="font-bold text-rose-600 dark:text-rose-400">{calculateAge(dob)} years</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@domain.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-600 dark:text-stone-300 mb-1">
                Create Password
              </label>
              <input
                type="password"
                placeholder="Min 6 characters"
                minLength={6}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || calculateAge(dob) < 18}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-500/20 disabled:opacity-50"
            >
              <span>{isLoading ? 'Creating Account...' : 'Register Profile (18+)'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAuthMode('options')}
              className="w-full text-center text-xs text-stone-500 dark:text-stone-400 hover:underline pt-1"
            >
              ← Back to login options
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
