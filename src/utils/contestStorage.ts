import { ContestEntry } from '../types/contest';
import { INITIAL_SUBMISSIONS } from '../data/initialEntries';

const STORAGE_KEY = 'kacf_character_contest_entries_v1';
const LIKES_KEY = 'kacf_liked_entries_v1';

export function getStoredSubmissions(): ContestEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SUBMISSIONS));
      return INITIAL_SUBMISSIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SUBMISSIONS;
  } catch {
    return INITIAL_SUBMISSIONS;
  }
}

export function saveSubmission(entry: Omit<ContestEntry, 'id' | 'createdAt' | 'likes' | 'receiptNo'>): ContestEntry {
  const current = getStoredSubmissions();
  const nextSeq = (current.length + 1).toString().padStart(4, '0');
  const newEntry: ContestEntry = {
    ...entry,
    id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    createdAt: new Date().toISOString(),
    likes: 1, // Author starts with 1 like
    receiptNo: `KACF-2026-${nextSeq}`
  };

  const updated = [newEntry, ...current];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
  return newEntry;
}

export function toggleEntryLike(entryId: string): { likes: number; isLiked: boolean } {
  const current = getStoredSubmissions();
  let likedIds: string[] = [];
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    if (raw) likedIds = JSON.parse(raw);
  } catch {
    likedIds = [];
  }

  const isLiked = likedIds.includes(entryId);
  let updatedLikedIds: string[];
  let delta = 0;

  if (isLiked) {
    updatedLikedIds = likedIds.filter((id) => id !== entryId);
    delta = -1;
  } else {
    updatedLikedIds = [...likedIds, entryId];
    delta = 1;
  }

  let newLikes = 0;
  const updatedEntries = current.map((item) => {
    if (item.id === entryId) {
      newLikes = Math.max(0, item.likes + delta);
      return { ...item, likes: newLikes };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
    localStorage.setItem(LIKES_KEY, JSON.stringify(updatedLikedIds));
  } catch (err) {
    console.error('Failed to update likes in localStorage:', err);
  }

  return { likes: newLikes, isLiked: !isLiked };
}

export function getLikedIds(): string[] {
  try {
    const raw = localStorage.getItem(LIKES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function exportToCSV(entries: ContestEntry[]): void {
  // UTF-8 BOM for Microsoft Excel Korean character encoding support
  const bom = '\uFEFF';
  const headers = ['접수번호', '캐릭터 이름', '작명자 성함', '연락처', '작명 이유 및 의미', '응원 메시지', '추천(좋아요) 수', '접수일시'];

  const rows = entries.map((entry) => [
    entry.receiptNo,
    `"${(entry.characterName || '').replace(/"/g, '""')}"`,
    `"${(entry.submitterName || '').replace(/"/g, '""')}"`,
    `"${(entry.contact || '').replace(/"/g, '""')}"`,
    `"${(entry.meaning || '').replace(/"/g, '""')}"`,
    `"${(entry.cheerMessage || '').replace(/"/g, '""')}"`,
    entry.likes,
    `"${new Date(entry.createdAt).toLocaleString('ko-KR')}"`
  ]);

  const csvContent = bom + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `KACF_캐릭터이름공모_접수명단_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
