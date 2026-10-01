'use client';

type FormMessageProps = {
  status: 'loading' | 'success' | 'error';
  message: string;
  receptionNumber?: string;
  onRetry?: () => void;
};

const styles = {
  loading: 'border-amber-300 bg-amber-50 text-amber-800',
  success: 'border-green-300 bg-green-50 text-green-800',
  error: 'border-red-300 bg-red-50 text-red-800',
} as const;

function Icon({ status }: { status: FormMessageProps['status'] }) {
  const common = {
    className: 'h-5 w-5 shrink-0',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  if (status === 'loading') {
    return (
      <svg {...common} className="h-5 w-5 shrink-0 animate-spin">
        <circle cx="12" cy="12" r="9" className="opacity-25" />
        <path d="M21 12a9 9 0 0 0-9-9" />
      </svg>
    );
  }
  if (status === 'success') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export default function FormMessage({
  status,
  message,
  receptionNumber,
  onRetry,
}: FormMessageProps) {
  return (
    <div
      role="alert"
      className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm sm:text-base ${styles[status]}`}
    >
      <Icon status={status} />
      <div className="flex flex-1 flex-col gap-1">
        <p className="font-medium">{status === 'loading' ? '처리 중...' : message}</p>
        {status === 'success' && receptionNumber && (
          <p className="text-sm">접수번호: {receptionNumber}</p>
        )}
        {status === 'error' && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-1 w-fit rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            재시도
          </button>
        )}
      </div>
    </div>
  );
}
