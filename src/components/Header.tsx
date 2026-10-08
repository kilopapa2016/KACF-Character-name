import React from 'react';
import { Sparkles, FileText, Download } from 'lucide-react';

interface HeaderProps {
  onOpenAdmin: () => void;
  entriesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, entriesCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0b0f19]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Brand title wordmark */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-red-400 transition-colors">
            대한민국인공지능영화제 <span className="text-red-500 font-mono text-base font-semibold">KACF</span>
          </span>
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#character-info" className="hover:text-white transition-colors">
            캐릭터 소개
          </a>
          <a href="#contest-rules" className="hover:text-white transition-colors">
            공모 요강
          </a>
          <a href="#submit-form" className="hover:text-white transition-colors">
            이름 응모하기
          </a>
          <a href="#submissions-gallery" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>실시간 응모작</span>
            <span className="text-xs px-1.5 py-0.5 rounded bg-red-950/80 text-red-300 border border-red-800/40 font-mono tabular-nums">
              {entriesCount}
            </span>
          </a>
        </nav>

        {/* Zone 3: Primary action button & Admin trigger */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenAdmin}
            title="주최측 관리자 명단 확인 및 CSV 다운로드"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 rounded-lg transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">접수명단 관리</span>
          </button>

          <a
            href="#submit-form"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg transition-colors shadow-lg shadow-red-950/30 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-100" />
            <span>이름 공모하기</span>
          </a>
        </div>
      </div>
    </header>
  );
};
