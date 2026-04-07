"use client";

interface ConfirmationBannerProps {
  message: string;
  visible: boolean;
}

export default function ConfirmationBanner({
  message,
  visible,
}: ConfirmationBannerProps) {
  if (!visible) return null;

  return (
    <div
      id="confirmation-banner"
      className="animate-slide-up rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-semibold text-emerald-800">{message}</p>
      </div>
    </div>
  );
}
