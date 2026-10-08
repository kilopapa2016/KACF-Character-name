import React from 'react';
import { Film, Mail, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-850 bg-[#070b14] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="text-white font-extrabold text-base tracking-tight mb-1">
              대한민국인공지능영화제 (KACF)
            </div>
            <div className="text-slate-400">
              Korea AI Cinema Festival · 공식 마스코트 캐릭터 이름 작명 공모전
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>문의: contest@kacf-filmfestival.org</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>접수 마감: 2026년 10월 10일 23:59</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] text-slate-400 leading-relaxed">
          <div>
            <p>
              [공모 유의사항] 응모작은 순수 창작물이어야 하며, 타인의 권리를 침해하지 않아야 합니다.
              동일한 이름이 접수될 경우 먼저 접수된 순서(선착순)를 우선으로 인정합니다.
              선정된 최종 명칭의 저작재산권은 대한민국인공지능영화제에 귀속됩니다.
            </p>
          </div>
          <div className="md:text-right">
            <p>© 2026 대한민국인공지능영화제(KACF). All Rights Reserved.</p>
            <p className="mt-1 text-slate-400">
              KOREA AI CINEMA FESTIVAL OFFICIAL CHARACTER NAMING CONTEST
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};
