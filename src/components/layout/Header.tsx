type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function Header({
  title = "온결 공방",
  subtitle = "한국 전통 공예 문화 체험",
}: HeaderProps) {
  return (
    <header className="w-full border-b border-amber-200 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 py-6 text-center sm:px-6 sm:py-7 md:flex-row md:items-baseline md:justify-between md:gap-4 md:px-8 md:py-10 md:text-left">
        <div>
          <h1 className="text-3xl font-light tracking-tight text-amber-900 sm:text-4xl md:text-5xl" style={{ fontFamily: 'Noto Serif KR, serif' }}>
            {title}
          </h1>
          <p className="text-xs text-amber-700 sm:text-sm md:block mt-1" style={{ fontFamily: 'Noto Sans KR, sans-serif', fontWeight: 300, letterSpacing: '0.05em' }}>
            {subtitle}
          </p>
        </div>
      </div>
    </header>
  );
}
