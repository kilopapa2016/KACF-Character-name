import React from 'react';
import { Clock, Sparkles, ArrowRight, Award, Flame } from 'lucide-react';
import { CountdownResult } from '../utils/useCountdown';

interface HeroSectionProps {
  countdown: CountdownResult;
  totalSubmissions: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ countdown, totalSubmissions }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Countdown & Information */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Meta indicator */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <span className="text-red-400 font-semibold tracking-wide">대한민국인공지능영화제</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>KACF 공식 마스코트</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-400 font-medium">전 국민 참여 공모</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
              AI 영화제의 미래를 질주할{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                캐릭터의 이름
              </span>
              을 지어주세요!
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              빨간 비니를 쓰고 멋지게 오토바이를 질주하는 이 소년에게 잘 어울리는 이름을 제안해주세요.
              당신의 번뜩이는 아이디어와 스토리텔링이 대한민국인공지능영화제(KACF)의 대표 이름이 됩니다.
            </p>

            {/* Deadline Countdown Card */}
            <div className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>공모 마감 기한</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-slate-400 font-medium">
                    2026. 10. 10 (토) 23:59:59 까지
                  </span>
                  {!countdown.isExpired ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800/60">
                      D-{countdown.days} 접수중
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      접수 마감
                    </span>
                  )}
                </div>
              </div>

              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
                <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                    {String(countdown.days).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium">일 (DAYS)</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                    {String(countdown.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium">시간 (HOURS)</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tabular-nums">
                    {String(countdown.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium">분 (MINUTES)</div>
                </div>
                <div className="bg-slate-950/70 p-2.5 sm:p-3 rounded-xl border border-slate-800">
                  <div className="text-2xl sm:text-3xl font-black text-red-400 font-mono tabular-nums">
                    {String(countdown.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 font-medium">초 (SECONDS)</div>
                </div>
              </div>

              {/* Quick stats & status */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>현재까지 접수된 이름 제안: <strong className="text-white font-mono tabular-nums">{totalSubmissions}</strong>건</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-red-400" />
                  <span>대상 선정 시 상금 및 공식 명칭 채택</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#submit-form"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-bold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-xl transition-all shadow-lg shadow-red-900/40 hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>지금 캐릭터 이름 응모하기</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="#submissions-gallery"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-xl transition-colors"
              >
                <span>다른 참가자 제안작 구경하기</span>
              </a>
            </div>
          </div>

          {/* Right Column: Character Showcase Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Comic speech bubble with character quote */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 z-20 bg-white text-slate-900 font-black px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-slate-900 rotate-[-5deg] transform hover:scale-105 transition-transform cursor-default">
                <div className="text-base sm:text-lg tracking-tight leading-tight">
                  여러분, 오늘도 <br />
                  <span className="text-red-600 text-lg sm:text-xl font-black">열일 Go! 🛵</span>
                </div>
                {/* Speech bubble tail pointer */}
                <div className="absolute -bottom-2.5 right-6 w-4 h-4 bg-white border-r-2 border-b-2 border-slate-900 rotate-45 transform" />
              </div>

              {/* Character Card Frame */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-gradient-to-b from-slate-800 to-slate-950 shadow-2xl p-2.5">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900">
                  <img
                    src="/src/assets/images/kacf_character_hero_1791420205687.jpg"
                    alt="대한민국인공지능영화제(KACF) 공식 캐릭터 마스코트 소년"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle gradient scrim at bottom for text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                  
                  {/* Bottom caption overlay */}
                  <div className="absolute bottom-3 inset-x-3 text-white flex items-center justify-between text-xs px-2">
                    <div className="font-semibold tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                      <span>KACF OFFICIAL MASCOT</span>
                    </div>
                    <span className="text-slate-300 font-mono">2026.10.10 마감</span>
                  </div>
                </div>

                {/* Character Feature Highlights */}
                <div className="p-4 grid grid-cols-3 gap-2 text-center text-xs mt-1">
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                    <span className="text-red-400 font-bold block">레드 비니</span>
                    <span className="text-slate-400 text-[11px]">KACF 상징 로고</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                    <span className="text-blue-400 font-bold block">데님 오버롤</span>
                    <span className="text-slate-400 text-[11px]">창작자의 워크웨어</span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                    <span className="text-amber-400 font-bold block">빈티지 바이크</span>
                    <span className="text-slate-400 text-[11px]">미래를 향한 질주</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
