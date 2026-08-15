export interface AttributionData {
  initialUtmSource?: string;
  initialUtmMedium?: string;
  initialUtmCampaign?: string;
  initialReferrer?: string;
  discoveryChannel?: string;
  firstVisitedAt: string;
}

const ATTRIBUTION_STORAGE_KEY = 'gradeforge_attribution_v1';

export function initializeAttribution(): AttributionData {
  try {
    const existing = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }

    const params = new URLSearchParams(window.location.search);
    const data: AttributionData = {
      initialUtmSource: params.get('utm_source') || undefined,
      initialUtmMedium: params.get('utm_medium') || undefined,
      initialUtmCampaign: params.get('utm_campaign') || undefined,
      initialReferrer: document.referrer || undefined,
      firstVisitedAt: new Date().toISOString(),
    };

    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
    return data;
  } catch {
    return {
      firstVisitedAt: new Date().toISOString(),
    };
  }
}

export function saveDiscoveryChannel(channel: string): void {
  try {
    const data = initializeAttribution();
    data.discoveryChannel = channel;
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save discovery channel:', err);
  }
}

export function getStoredAttribution(): AttributionData {
  return initializeAttribution();
}

export function generateShareUrl(source = 'student_share'): string {
  const base = 'https://gradeforge.poorvithmp.com';
  return `${base}?utm_source=${encodeURIComponent(source)}&utm_medium=referral&utm_campaign=word_of_mouth`;
}
