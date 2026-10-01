type HeaderProps = {
  title?: string;
  subtitle?: string;
};

export default function Header({
  title = "온결 공방",
  subtitle = "한국 전통 공예 문화 체험",
}: HeaderProps) {
  return (
    <header className="w-full border-b border-stone-300 bg-stone-100">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 py-5 text-center sm:px-6 sm:py-6 md:flex-row md:items-baseline md:justify-between md:gap-4 md:px-8 md:py-8 md:text-left">
        <h1 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="text-sm text-stone-600 sm:text-base">{subtitle}</p>
      </div>
    </header>
  );
}
