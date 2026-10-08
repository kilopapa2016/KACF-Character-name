import React from 'react';
import { Lightbulb, Heart, Zap, Sparkles, Smile, Video } from 'lucide-react';

export const CharacterProfile: React.FC = () => {
  return (
    <section id="character-info" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400">
            <Sparkles className="w-4 h-4" />
            <span>캐릭터 심층 프로필</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            이 아이는 어떤 친구인가요?
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            캐릭터의 성격과 담긴 상징을 살펴보면 더 멋지고 와닿는 이름을 지으실 수 있습니다.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Personality & Vibe */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
              <Smile className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">무한 긍정과 호기심</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              반짝이는 큰 눈망울과 해맑은 미소로 모든 새로운 도전을 환영합니다.
              AI 기술이 가져올 새로운 시네마 세상을 두려움 없이 탐험하는 호기심 많은 소년입니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs text-slate-400">
              <span className="text-slate-400">#긍정비타민</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">#호기심천국</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">#순수함</span>
            </div>
          </div>

          {/* Card 2: Signature Style */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">KACF 워크웨어 룩</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              머리엔 KACF(대한민국인공지능영화제) 엠블럼이 새겨진 시그니처 레드 비니를 쓰고,
              현장에서 직접 땀 흘리며 작업하는 창작자의 상징인 데님 멜빵바지를 입었습니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs text-slate-400">
              <span className="text-slate-400">#레드비니</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">#데님오버롤</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">#청춘룩</span>
            </div>
          </div>

          {/* Card 3: Bike & Passion */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Video className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">꿈을 향한 질주 & 로드무비</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              모터사이클을 타고 거침없이 아스팔트를 달리는 모습은 마치 한 편의 감동적인 청춘 로드무비와 같습니다.
              상상의 한계를 넘어 미래 시네마의 신대륙으로 달려갑니다.
            </p>
            <div className="pt-2 flex flex-wrap gap-1.5 text-xs text-slate-400">
              <span className="text-slate-400">#바이크라이더</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">#로드무비</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">#질주본능</span>
            </div>
          </div>

        </div>

        {/* Naming Inspiration Tips Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-900/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white">작명 아이디어 힌트</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                심사위원과 대중의 마음을 사로잡을 수 있는 4가지 핵심 포인트
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs font-mono text-red-400 block mb-1">HINT 01</span>
              <strong className="text-white text-sm block">KACF 영화제의 상징</strong>
              <p className="text-xs text-slate-400 mt-1">
                인공지능(AI), 시네마(Cinema), 영화제(KACF)의 정체성을 유기적으로 연결
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs font-mono text-amber-400 block mb-1">HINT 02</span>
              <strong className="text-white text-sm block">부르기 쉬운 발음</strong>
              <p className="text-xs text-slate-400 mt-1">
                2~3음절로 기억하기 편하고 모든 세대가 정감 있게 부를 수 있는 이름
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs font-mono text-blue-400 block mb-1">HINT 03</span>
              <strong className="text-white text-sm block">"열일 Go!"의 응원 에너지</strong>
              <p className="text-xs text-slate-400 mt-1">
                오늘도 현장에서 힘차게 열일하는 크리에이터들에게 힘이 되는 비타민
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-xs font-mono text-emerald-400 block mb-1">HINT 04</span>
              <strong className="text-white text-sm block">글로벌 확장성</strong>
              <p className="text-xs text-slate-400 mt-1">
                해외 영화인 및 전 세계 관객들도 발음하기 편한 영문 표기 병기 권장
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
