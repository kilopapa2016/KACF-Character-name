import React, { useState } from 'react';
import { X, Download, Search, ShieldCheck, Database, Trash2 } from 'lucide-react';
import { ContestEntry } from '../types/contest';
import { exportToCSV } from '../utils/contestStorage';

interface AdminExportModalProps {
  entries: ContestEntry[];
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const AdminExportModal: React.FC<AdminExportModalProps> = ({
  entries,
  isOpen,
  onClose,
  onResetData
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = entries.filter((item) => {
    const q = searchTerm.toLowerCase();
    return (
      item.characterName.toLowerCase().includes(q) ||
      item.submitterName.toLowerCase().includes(q) ||
      (item.contact && item.contact.toLowerCase().includes(q)) ||
      item.receiptNo.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700 rounded-3xl flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>공모전 운영진 데이터 관리</span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  총 {entries.length}건
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                접수된 캐릭터 이름 및 작명자 명단을 확인하고 엑셀(CSV) 파일로 즉시 추출할 수 있습니다.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="접수번호, 캐릭터 이름, 작명자 성함, 연락처 검색..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => exportToCSV(entries)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 active:bg-red-700 transition-colors shadow-md shadow-red-950/40"
            >
              <Download className="w-4 h-4" />
              <span>CSV (엑셀) 다운로드</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('기본 샘플 데이터로 복원하시겠습니까? (직접 추가한 데이터가 초기화됩니다)')) {
                  onResetData();
                }
              }}
              title="데이터 초기화"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 border border-slate-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 uppercase font-mono">
                <tr>
                  <th className="px-4 py-3">접수번호</th>
                  <th className="px-4 py-3">제안 캐릭터명</th>
                  <th className="px-4 py-3">작명자 성함</th>
                  <th className="px-4 py-3">연락처</th>
                  <th className="px-4 py-3">작명 사유 및 의미</th>
                  <th className="px-4 py-3 text-center">응원수</th>
                  <th className="px-4 py-3">접수일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-400">{item.receiptNo}</td>
                    <td className="px-4 py-3 font-bold text-white text-sm">{item.characterName}</td>
                    <td className="px-4 py-3 text-slate-200">{item.submitterName}</td>
                    <td className="px-4 py-3 font-mono text-slate-400">{item.contact || '-'}</td>
                    <td className="px-4 py-3 max-w-xs truncate text-slate-300" title={item.meaning}>
                      {item.meaning || '-'}
                    </td>
                    <td className="px-4 py-3 text-center font-mono text-rose-400 font-bold">{item.likes}</td>
                    <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <div>
            * 기한: 2026년 10월 10일 23시 59분까지 접수된 모든 응모작이 포함됩니다.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
};
