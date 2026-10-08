import React from 'react';
import { CheckCircle2, X, Sparkles, ArrowRight, Copy, Check } from 'lucide-react';
import { ContestEntry } from '../types/contest';

interface SubmissionSuccessModalProps {
  entry: ContestEntry | null;
  onClose: () => void;
  onViewInList: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  entry,
  onClose,
  onViewInList
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!entry) return null;

  const handleCopyReceipt = () => {
    const text = `[KACF 캐릭터 이름 공모전 접수증]\n접수번호: ${entry.receiptNo}\n제안 이름: ${entry.characterName}\n작명자: ${entry.submitterName}\n마감기한: 2026.10.10 23:59`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono text-red-400 font-semibold tracking-wider block">
            OFFICIAL RECEIPT CONFIRMATION
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            공모 접수가 성공적으로 완료되었습니다!
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            대한민국인공지능영화제(KACF) 캐릭터를 위한 소중한 이름을 선물해주셔서 진심으로 감사드립니다.
          </p>
        </div>

        {/* Official Ticket / Certificate Design */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="text-xs text-slate-400 font-medium">접수 확인서</div>
            <div className="text-xs font-mono text-red-400 font-bold">{entry.receiptNo}</div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-400 block">제안하신 캐릭터 이름</span>
              <span className="text-xl sm:text-2xl font-black text-white block mt-0.5 text-red-400">
                {entry.characterName}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-800/80">
              <div>
                <span className="text-slate-400 block">작명자 (응모자)</span>
                <span className="font-semibold text-white mt-0.5 block">{entry.submitterName} 님</span>
              </div>
              <div>
                <span className="text-slate-400 block">접수 일시</span>
                <span className="font-mono text-slate-300 mt-0.5 block">
                  {new Date(entry.createdAt).toLocaleDateString('ko-KR', {
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>

            {entry.meaning && (
              <div className="text-xs pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 block mb-1">작명 이유 & 의미</span>
                <p className="text-slate-300 bg-slate-900 p-2.5 rounded-lg leading-relaxed">
                  {entry.meaning}
                </p>
              </div>
            )}
          </div>

          <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span>마감 기한: 10월 10일 23:59</span>
            <span>심사 발표: 10월 중순 개별 공지</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleCopyReceipt}
            className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>접수정보 복사 완료!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>접수증 내용 복사</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onViewInList();
            }}
            className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-950/40"
          >
            <span>응모작 목록에서 확인하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
