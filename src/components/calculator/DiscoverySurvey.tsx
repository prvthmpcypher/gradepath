import React, { useState, useEffect } from 'react';
import { getStoredAttribution, saveDiscoveryChannel } from '../../utils/attribution';
import { HelpCircle, Check } from 'lucide-react';

export const DiscoverySurvey: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const attr = getStoredAttribution();
    if (attr.discoveryChannel) {
      setSelectedChannel(attr.discoveryChannel);
      setIsSubmitted(true);
    }
  }, []);

  const handleSelect = (channel: string) => {
    setSelectedChannel(channel);
    saveDiscoveryChannel(channel);
    setIsSubmitted(true);
  };

  const channels = [
    { id: 'whatsapp_telegram', label: 'College WhatsApp / Telegram group' },
    { id: 'friend', label: 'Friend / Classmate recommendation' },
    { id: 'reddit', label: 'Reddit (r/Btechtards, r/VTU, etc.)' },
    { id: 'google_search', label: 'Google / Search Engine' },
    { id: 'social_media', label: 'LinkedIn / X (Twitter)' },
    { id: 'other', label: 'Other source' },
  ];

  return (
    <div className="p-4 border border-gpline bg-paper/60 text-xs mb-6 transition-colors">
      <div className="flex items-center gap-1.5 text-gpmuted font-mono mb-2">
        <HelpCircle className="w-3.5 h-3.5 text-gpblue" />
        <span>How did you discover GradeForge? (Optional quick poll)</span>
      </div>

      {isSubmitted ? (
        <div className="flex items-center gap-1.5 text-green-700 dark:text-green-300 font-mono text-xs pt-1">
          <Check className="w-4 h-4" />
          <span>Thanks for letting us know! (Recorded: {channels.find((c) => c.id === selectedChannel)?.label || selectedChannel})</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {channels.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelect(c.id)}
              className="px-2.5 py-1 border border-gpline bg-bg hover:bg-gpwash text-ink text-[11px] font-sans transition-colors cursor-pointer"
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
