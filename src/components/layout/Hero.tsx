'use client';

export default function Hero() {
  const heroImageUrl = 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=1600&h=400&fit=crop&q=80';

  return (
    <section
      className="relative w-full h-96 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('${heroImageUrl}')`,
        backgroundAttachment: 'fixed',
      }}
    >
      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* 콘텐츠 */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h2 className="text-4xl sm:text-5xl font-light mb-4" style={{ fontFamily: 'Noto Serif KR, serif' }}>
          한국 전통 공예의 아름다움
        </h2>
        <p className="text-lg sm:text-xl font-light max-w-2xl">
          차분하고 고급스러운 분위기 속에서 전통과 현대가 만나는 공방
        </p>
      </div>
    </section>
  );
}
