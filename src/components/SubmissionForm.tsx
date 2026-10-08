import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Send, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { ContestEntry } from '../types/contest';

interface SubmissionFormProps {
  onSuccessSubmit: (newEntry: ContestEntry) => void;
  isExpired: boolean;
}

const PRESET_KEYWORDS = [
  { label: '케피 (Keffi)', meaning: 'KACF를 부르기 편하게 축약한 이름' },
  { label: '시네오 (Cine-O)', meaning: '시네마의 영원한 오리진' },
  { label: '아이디 (AIDI)', meaning: 'AI + Discovery + Identity' },
  { label: '로디 (Roady)', meaning: '바이크를 타고 꿈의 길을 달리는 소년' },
  { label: '열일이 (Yeol-il)', meaning: '"오늘도 열일 Go!" 시그니처 대사 반영' },
  { label: '무비로 (Moviro)', meaning: '무비 + 미래로 달리는 라이더' },
];

export const SubmissionForm: React.FC<SubmissionFormProps> = ({ onSuccessSubmit, isExpired }) => {
  const [characterName, setCharacterName] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [contact, setContact] = useState('');
  const [meaning, setMeaning] = useState('');
  const [cheerMessage, setCheerMessage] = useState('');
  const [agreed, setAgreed] = useState(true);

  const [errors, setErrors] = useState<{
    characterName?: string;
    submitterName?: string;
    agreed?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyKeyword = (kw: { label: string; meaning: string }) => {
    setCharacterName(kw.label);
    if (!meaning) {
      setMeaning(kw.meaning);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isExpired) {
      alert('공모 기간이 마감되었습니다 (기한: 2026년 10월 10일 23:59:59).');
      return;
    }

    const newErrors: { characterName?: string; submitterName?: string; agreed?: string } = {};

    if (!characterName.trim()) {
      newErrors.characterName = '캐릭터 이름을 입력해주세요.';
    } else if (characterName.trim().length > 25) {
      newErrors.characterName = '캐릭터 이름은 25자 이내로 입력해주세요.';
    }

    if (!submitterName.trim()) {
      newErrors.submitterName = '작명자 성함을 입력해주세요.';
    }

    if (!agreed) {
      newErrors.agreed = '공모 유의사항 및 개인정보 수집에 동의해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully if canvas is constrained
      }

      const created = {
        characterName: characterName.trim(),
        submitterName: submitterName.trim(),
        contact: contact.trim() || '미기재',
        meaning: meaning.trim() || '작명 이유 미기재',
        cheerMessage: cheerMessage.trim() || '',
        tags: [characterName.trim()]
      };

      // Slight delay to feel deliberate & smooth
      setTimeout(() => {
        setIsSubmitting(false);
        // Reset form
        setCharacterName('');
        setSubmitterName('');
        setContact('');
        setMeaning('');
        setCheerMessage('');

        onSuccessSubmit(created as unknown as ContestEntry);
      }, 300);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit-form" className="py-16 sm:py-20 border-b border-slate-800 bg-[#080d1a] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-400">
            <Sparkles className="w-4 h-4" />
            <span>캐릭터 작명 접수처</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            이 아이의 이름을 선물해주세요
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
            캐릭터 이름과 작명하신 분의 성함을 입력하시면 즉시 공모 접수가 완료됩니다.
          </p>
        </div>

        {/* Expired Banner if Deadline passed */}
        {isExpired && (
          <div className="mb-8 p-4 rounded-xl bg-amber-950/60 border border-amber-800/80 text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <strong className="block font-semibold">공모 접수가 마감되었습니다.</strong>
              2026년 10월 10일 23시 59분부로 공모가 종료되었으며, 현재 심사가 진행 중입니다. 성원해주신 모든 분께 감사드립니다.
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Quick inspiration chips */}
          <div className="mb-8 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2.5">
              <HelpCircle className="w-3.5 h-3.5 text-red-400" />
              <span>영감이 필요하신가요? 클릭하여 샘플 이름을 적용해보세요:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESET_KEYWORDS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplyKeyword(item)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                >
                  + {item.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Field 1: Character Name (Required) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="charName" className="block text-sm font-bold text-white">
                  제안하는 캐릭터 이름 <span className="text-red-500">*</span>
                </label>
                <span className="text-xs text-slate-400">부르기 쉽고 독창적인 이름</span>
              </div>
              <input
                id="charName"
                type="text"
                value={characterName}
                onChange={(e) => {
                  setCharacterName(e.target.value);
                  if (errors.characterName) setErrors({ ...errors, characterName: undefined });
                }}
                disabled={isExpired}
                placeholder="예: 케피 (Keffi), 시네아이, 로디, 열일이, 영호 등"
                className={`w-full px-4 py-3.5 rounded-xl bg-slate-950 text-white placeholder-slate-500 border transition-all text-base focus:outline-none ${
                  errors.characterName
                    ? 'border-red-500 ring-2 ring-red-500/20'
                    : 'border-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                }`}
              />
              {errors.characterName && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.characterName}
                </p>
              )}
            </div>

            {/* Field 2: Submitter's Name (Required) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label htmlFor="subName" className="block text-sm font-bold text-white">
                  작명자 이름 (응모자 성함) <span className="text-red-500">*</span>
                </label>
                <input
                  id="subName"
                  type="text"
                  value={submitterName}
                  onChange={(e) => {
                    setSubmitterName(e.target.value);
                    if (errors.submitterName) setErrors({ ...errors, submitterName: undefined });
                  }}
                  disabled={isExpired}
                  placeholder="예: 홍길동"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-500 border transition-all text-sm focus:outline-none ${
                    errors.submitterName
                      ? 'border-red-500 ring-2 ring-red-500/20'
                      : 'border-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                  }`}
                />
                {errors.submitterName && (
                  <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.submitterName}
                  </p>
                )}
              </div>

              {/* Field 3: Contact Info (Optional/Recommended for prize notifications) */}
              <div className="space-y-2">
                <label htmlFor="subContact" className="block text-sm font-bold text-white">
                  연락처 <span className="text-xs font-normal text-slate-400">(수상 시 안내 연락용)</span>
                </label>
                <input
                  id="subContact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  disabled={isExpired}
                  placeholder="휴대폰 번호(010-XXXX-XXXX) 또는 이메일"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-500 border border-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm focus:outline-none"
                />
              </div>
            </div>

            {/* Field 4: Meaning & Story behind the name */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="meaningText" className="block text-sm font-bold text-white">
                  작명 이유 및 의미 (스토리텔링)
                </label>
                <span className="text-xs text-slate-400">심사 시 가산점 반영</span>
              </div>
              <textarea
                id="meaningText"
                rows={3}
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                disabled={isExpired}
                placeholder="왜 이 이름을 추천하시나요? 이름에 담긴 뜻이나 어원을 자유롭게 들려주세요. (예: KACF 영화제의 열정과 호기심 많은 소년의 미소를 결합하여...)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-500 border border-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm focus:outline-none resize-none"
              />
            </div>

            {/* Field 5: Cheering Message (Optional) */}
            <div className="space-y-2">
              <label htmlFor="cheerMsg" className="block text-sm font-bold text-white">
                캐릭터에게 보내는 응원 한마디 <span className="text-xs font-normal text-slate-400">(선택)</span>
              </label>
              <input
                id="cheerMsg"
                type="text"
                value={cheerMessage}
                onChange={(e) => setCheerMessage(e.target.value)}
                disabled={isExpired}
                placeholder="예: 빨간 비니 쓰고 전 세계를 누비는 최고의 마스코트가 되어줘!"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 text-white placeholder-slate-500 border border-slate-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all text-sm focus:outline-none"
              />
            </div>

            {/* Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (errors.agreed) setErrors({ ...errors, agreed: undefined });
                  }}
                  className="mt-1 w-4 h-4 rounded text-red-600 focus:ring-red-500 bg-slate-950 border-slate-700"
                />
                <span className="text-xs text-slate-300 leading-relaxed">
                  [필수] 제출한 캐릭터 작명 아이디어는 타인의 저작권을 침해하지 않으며, 최종 대상작 선정 시 저작재산권은 대한민국인공지능영화제(KACF)에 귀속됨에 동의합니다.
                </span>
              </label>
              {errors.agreed && (
                <p className="text-xs text-red-400 flex items-center gap-1 mt-1 ml-7">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.agreed}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isExpired || isSubmitting}
                className={`w-full py-4 rounded-xl text-base font-extrabold flex items-center justify-center gap-2 transition-all shadow-xl ${
                  isExpired
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-red-600 hover:bg-red-500 active:bg-red-700 text-white shadow-red-900/30 hover:shadow-red-800/50'
                }`}
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>접수 처리 중...</span>
                  </span>
                ) : isExpired ? (
                  <span>공모 접수가 마감되었습니다 (10월 10일 23:59)</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>캐릭터 이름 공모 제출하기</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};
