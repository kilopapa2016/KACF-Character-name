import React from 'react';
import { Calendar, Award, Target, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ContestGuidelines: React.FC = () => {
  return (
    <section id="contest-rules" className="py-16 sm:py-20 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-400">
            <Award className="w-4 h-4" />
            <span>공모 가이드 & 시상 안내</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            공모 요강 및 시상 혜택
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            10월 10일 23시 59분까지 응모하실 수 있으며, 선정된 이름은 KACF 공식 마스코트로 공식 사용됩니다.
          </p>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Item 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-red-400">01. SCHEDULE</span>
              <Calendar className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="text-base font-bold text-white">공모 접수 기간</h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white block font-medium">~ 2026. 10. 10 (토) 23:59</strong>
              마감 시간 이후 접수는 자동으로 마감되오니 기한을 준수해주세요.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400">02. ELIGIBILITY</span>
              <Target className="w-4 h-4 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white">참가 자격</h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white block font-medium">전 국민 누구나 참여 가능</strong>
              연령·지역 제한 없음, 1인당 복수 작품(여러 개 이름) 응모 가능합니다.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-blue-400">03. CRITERIA</span>
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-base font-bold text-white">심사 기준</h3>
            <div className="text-xs text-slate-300 space-y-1">
              <div>• 상징성 (30%): KACF AI 영화제 가치 반영</div>
              <div>• 대중성 (30%): 발음과 기억의 용이성</div>
              <div>• 독창성 (20%): 참신한 스토리텔링</div>
              <div>• 활용성 (20%): 굿즈 및 미디어 확장성</div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400">04. ANNOUNCE</span>
              <HelpCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white">발표 & 일정</h3>
            <p className="text-sm text-slate-300">
              <strong className="text-white block font-medium">2026년 10월 중순 발표</strong>
              영화제 공식 홈페이지 공지 및 수상자 개별 문자/이메일 통보
            </p>
          </div>

        </div>

        {/* Prizes Breakdown Table / Cards */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">시상 내역 및 특전</h3>
              <p className="text-xs sm:text-sm text-slate-400">
                선정된 마스코트 이름은 대한민국인공지능영화제 공식 캐릭터로 전 세계에 소개됩니다.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-950/80 text-red-300 border border-red-800">
              총 38명 시상
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Grand Prize */}
            <div className="p-6 bg-gradient-to-b from-red-950/20 to-transparent space-y-3">
              <div className="inline-block px-2.5 py-1 rounded bg-red-600 text-white font-bold text-xs tracking-wider">
                대상 (1명)
              </div>
              <div className="text-2xl font-black text-white">
                1,000,000<span className="text-sm font-normal text-slate-400">원</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• KACF 공식 캐릭터 명칭 영구 채택</li>
                <li>• 영화제 VIP 개막식 공식 초청</li>
                <li>• 캐릭터 한정판 굿즈 1호 증정</li>
              </ul>
            </div>

            {/* First Prize */}
            <div className="p-6 space-y-3">
              <div className="inline-block px-2.5 py-1 rounded bg-slate-800 text-amber-300 font-bold text-xs tracking-wider border border-amber-500/20">
                최우수상 (2명)
              </div>
              <div className="text-2xl font-black text-white">
                300,000<span className="text-sm font-normal text-slate-400">원</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• KACF 프리미엄 굿즈 세트</li>
                <li>• 영화제 특별 상영관 예매권</li>
              </ul>
            </div>

            {/* Second Prize */}
            <div className="p-6 space-y-3">
              <div className="inline-block px-2.5 py-1 rounded bg-slate-800 text-blue-300 font-bold text-xs tracking-wider border border-blue-500/20">
                우수상 (5명)
              </div>
              <div className="text-2xl font-black text-white">
                100,000<span className="text-sm font-normal text-slate-400">원 상당</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• KACF 웰컴 기프트 키트</li>
                <li>• 영화 관람권 (1인 4매)</li>
              </ul>
            </div>

            {/* Participation Prize */}
            <div className="p-6 space-y-3">
              <div className="inline-block px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-bold text-xs tracking-wider">
                참가상 (추첨 30명)
              </div>
              <div className="text-2xl font-black text-white">
                기프티콘
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 leading-relaxed">
                <li>• 스타벅스 모바일 커피 상품권</li>
                <li>• 정성스럽게 작성해주신 참가자 추첨</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
