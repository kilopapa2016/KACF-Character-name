export interface ContestEntry {
  id: string;
  characterName: string;      // 제안하는 캐릭터 이름
  submitterName: string;      // 이름을 작명한 사람의 성함
  contact?: string;            // 연락처 (휴대폰 번호 또는 이메일)
  meaning: string;            // 작명 이유 및 의미
  cheerMessage?: string;      // 캐릭터에게 전하는 응원 메시지
  createdAt: string;          // ISO Date
  likes: number;              // 응원 / 추천 수
  tags?: string[];            // 키워드 태그
  receiptNo: string;          // 접수 번호 (예: KACF-2026-0042)
}

export interface ContestConfig {
  deadline: string;
  festivalName: string;
  festivalEnglish: string;
}

export const CONTEST_DEADLINE = '2026-10-10T23:59:59+09:00';
