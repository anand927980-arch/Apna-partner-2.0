import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ReportCategory } from '../../types';

export const ReportModal: React.FC = () => {
  const { isReportModalOpen, closeReportModal, reportTarget, submitReport } = useApp();

  const [category, setCategory] = useState<ReportCategory>('inappropriate_content');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isReportModalOpen || !reportTarget) return null;

  const categories: { id: ReportCategory; label: string }[] = [
    { id: 'inappropriate_content', label: 'Inappropriate photos or content' },
    { id: 'underage', label: 'Underage user (under 18)' },
    { id: 'fake_profile', label: 'Fake profile or impersonation' },
    { id: 'harassment', label: 'Harassment or abusive messaging' },
    { id: 'spam', label: 'Spam, advertising or commercial solicitation' },
    { id: 'other', label: 'Location or identity misrepresentation' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReport(reportTarget.user.id, category, details, reportTarget.messageId);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      closeReportModal();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-rose-200 dark:border-stone-800 text-stone-900 dark:text-stone-100">
        <button
          onClick={closeReportModal}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black">Report Received</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Thank you for keeping Apna Partner safe. Our Jharkhand trust & safety team will review this profile immediately.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black">Report {reportTarget.user.name}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Your report is strictly anonymous and confidential.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
                Reason for Reporting
              </label>
              <div className="space-y-1.5">
                {categories.map((c) => (
                  <label
                    key={c.id}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                      category === c.id
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="reportCategory"
                      checked={category === c.id}
                      onChange={() => setCategory(c.id)}
                      className="accent-rose-600"
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                Additional Details (Optional)
              </label>
              <textarea
                rows={2}
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Provide any context that helps our moderators..."
                className="w-full px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={closeReportModal}
                className="flex-1 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all"
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
