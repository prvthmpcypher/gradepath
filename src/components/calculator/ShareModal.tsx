import React, { useState } from 'react';
import { generateShareUrl } from '../../utils/attribution';
import { X, Copy, Check, MessageCircle, Share2, Send } from 'lucide-react';

interface ShareModalProps {
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = generateShareUrl('direct_share');
  const shareText = 'Calculate SGPA & CGPA easily without spreadsheets. Features VTU, Anna Univ, and Target CGPA planning!';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(url, '_blank');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-md bg-paper border border-gpline shadow-2xl p-6 relative"
        role="dialog"
        aria-labelledby="share-modal-title"
      >
        <div className="flex items-center justify-between pb-3.5 border-b border-gpline mb-5">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-gpblue" />
            <h2 id="share-modal-title" className="text-xl font-serif font-bold text-ink m-0">
              Share GradeForge
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 text-gpmuted hover:text-ink transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-gpmuted mb-4">
          Help your classmates calculate their SGPA and simulate their Target CGPA with zero ads and complete privacy.
        </p>

        {/* Copy Link Input */}
        <div className="flex items-center gap-2 p-1.5 border border-gpline bg-bg mb-4">
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full px-2 py-1 bg-transparent text-ink font-mono text-xs focus:outline-none"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gpblue text-white text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>

        {/* Quick Social Buttons */}
        <div className="grid grid-cols-2 gap-2.5 mb-2">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> Share on WhatsApp
          </button>

          <button
            type="button"
            onClick={handleTwitter}
            className="inline-flex items-center justify-center gap-2 px-3 py-2.5 bg-sky-500 text-white text-xs font-bold hover:bg-sky-600 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" /> Share on X / Twitter
          </button>
        </div>
      </div>
    </div>
  );
};
