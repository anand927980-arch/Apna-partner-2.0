import React from 'react';
import { X, Ban } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BlockModal: React.FC = () => {
  const { isBlockModalOpen, closeBlockModal, blockTarget, blockUser } = useApp();

  if (!isBlockModalOpen || !blockTarget) return null;

  const handleConfirmBlock = () => {
    blockUser(blockTarget.id);
    closeBlockModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-sm bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 text-center">
        <button
          onClick={closeBlockModal}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-3">
          <Ban className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-black mb-1">Block {blockTarget.name}?</h3>
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-6">
          They will no longer be able to find your profile, see your location, or send you messages on Apna Partner. Existing chats and matches will be removed.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={handleConfirmBlock}
            className="w-full py-3.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-all"
          >
            Yes, Block This User
          </button>

          <button
            onClick={closeBlockModal}
            className="w-full py-3 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
