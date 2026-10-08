import React, { useState, useMemo } from 'react';
import { Search, Heart, MessageSquare, Filter, Share2, Sparkles, Check } from 'lucide-react';
import { ContestEntry } from '../types/contest';

interface SubmissionsListProps {
  entries: ContestEntry[];
  onToggleLike: (id: string) => void;
  likedIds: string[];
}

export const SubmissionsList: React.FC<SubmissionsListProps> = ({
  entries,
  onToggleLike,
  likedIds
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<'latest' | 'popular'>('latest');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredEntries = useMemo(() => {
    let result = entries.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      if (!q) return true;
      return (
        item.characterName.toLowerCase().includes(q) ||
        item.submitterName.toLowerCase().includes(q) ||
        (item.meaning && item.meaning.toLowerCase().includes(q))
      );
    });

    if (sortOption === 'popular') {
      result = [...result].sort((a, b) => b.likes - a.likes);
    } else {
      result = [...result].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return result;
  }, [entries, searchTerm, sortOption]);

  const handleShare = (entry: ContestEntry) => {
    const text = `[대한민국인공지능영화제 KACF] 캐릭터 이름 공모 제안작: "${entry.characterName}" (작명: ${entry.submitterName})`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <section id="submissions-gallery" className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400 mb-2">
              <Sparkles className="w-4 h-4" />
              <span>실시간 응모 현황 피드</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              현재 접수된 캐릭터 이름들
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              참가자 여러분이 선물해주신 빛나는 이름과 스토리를 감상하고 응원해주세요!
            </p>
          </div>

          {/* Controls: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="이름, 작명자, 키워드 검색"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>

            {/* Sort Segmented Tab */}
            <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setSortOption('latest')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  sortOption === 'latest'
                    ? 'bg-red-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => setSortOption('popular')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  sortOption === 'popular'
                    ? 'bg-red-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                응원 많은순
              </button>
            </div>
          </div>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center justify-between text-xs text-slate-400 pb-4 mb-4 border-b border-slate-800/80">
          <div>
            총 <span className="text-white font-bold tabular-nums">{filteredEntries.length}</span>개의 작명 제안이 표시되고 있습니다.
          </div>
          <div className="text-slate-500">
            * 10월 10일 마감 후 전문 심사위원단의 종합 심사가 진행됩니다.
          </div>
        </div>

        {/* Submissions Grid */}
        {filteredEntries.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">검색 결과와 일치하는 캐릭터 이름이 없습니다.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-3 text-xs text-red-400 hover:underline font-semibold"
            >
              전체 목록 다시보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntries.map((entry) => {
              const isLiked = likedIds.includes(entry.id);
              const formattedDate = new Date(entry.createdAt).toLocaleDateString('ko-KR', {
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={entry.id}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div className="space-y-4">
                    {/* Header Row: Receipt No & Date */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[11px]">
                        {entry.receiptNo}
                      </span>
                      <span>{formattedDate}</span>
                    </div>

                    {/* Proposed Character Name */}
                    <div>
                      <div className="text-xs text-red-400 font-semibold mb-1">제안 이름</div>
                      <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-red-300 transition-colors">
                        {entry.characterName}
                      </h3>
                    </div>

                    {/* Meaning & Story */}
                    <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
                      <p className="line-clamp-4">{entry.meaning || '작명 이유 미기재'}</p>
                    </div>

                    {/* Cheering quote if present */}
                    {entry.cheerMessage && (
                      <div className="flex items-start gap-2 text-xs text-amber-300/90 bg-amber-950/20 px-3 py-2 rounded-lg border border-amber-900/30">
                        <MessageSquare className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                        <span className="italic">"{entry.cheerMessage}"</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer: Submitter info & Like button */}
                  <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400">작명자</div>
                      <div className="text-xs font-bold text-slate-200">
                        {entry.submitterName} 님
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Share / Copy button */}
                      <button
                        type="button"
                        onClick={() => handleShare(entry)}
                        title="이름 복사 및 공유"
                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      >
                        {copiedId === entry.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Share2 className="w-3.5 h-3.5" />
                        )}
                      </button>

                      {/* Cheer / Like Button */}
                      <button
                        type="button"
                        onClick={() => onToggleLike(entry.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          isLiked
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                        }`}
                      >
                        <Heart
                          className={`w-3.5 h-3.5 transition-transform ${
                            isLiked ? 'fill-rose-500 text-rose-500 scale-110' : 'text-slate-400'
                          }`}
                        />
                        <span className="tabular-nums font-mono">{entry.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
