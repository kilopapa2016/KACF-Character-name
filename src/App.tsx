import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CharacterProfile } from './components/CharacterProfile';
import { ContestGuidelines } from './components/ContestGuidelines';
import { SubmissionForm } from './components/SubmissionForm';
import { SubmissionsList } from './components/SubmissionsList';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { AdminExportModal } from './components/AdminExportModal';
import { Footer } from './components/Footer';
import { ContestEntry, CONTEST_DEADLINE } from './types/contest';
import {
  getStoredSubmissions,
  saveSubmission,
  toggleEntryLike,
  getLikedIds
} from './utils/contestStorage';
import { INITIAL_SUBMISSIONS } from './data/initialEntries';
import { useCountdown } from './utils/useCountdown';

const DEFAULT_CHARACTER_PHOTO = '/src/assets/images/kacf_character_master_go_1791421099930.jpg';
const PHOTO_STORAGE_KEY = 'kacf_custom_character_photo';

export default function App() {
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [successEntry, setSuccessEntry] = useState<ContestEntry | null>(null);

  const [characterPhoto, setCharacterPhoto] = useState<string>(() => {
    try {
      return localStorage.getItem(PHOTO_STORAGE_KEY) || DEFAULT_CHARACTER_PHOTO;
    } catch {
      return DEFAULT_CHARACTER_PHOTO;
    }
  });

  const isCustomPhoto = characterPhoto !== DEFAULT_CHARACTER_PHOTO;

  const countdown = useCountdown(CONTEST_DEADLINE);

  // Initialize data on mount
  useEffect(() => {
    setEntries(getStoredSubmissions());
    setLikedIds(getLikedIds());
  }, []);

  const handleChangeCharacterPhoto = (newPhotoUrl: string) => {
    setCharacterPhoto(newPhotoUrl);
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, newPhotoUrl);
    } catch (e) {
      console.warn('Could not save photo to localStorage', e);
    }
  };

  const handleResetCharacterPhoto = () => {
    setCharacterPhoto(DEFAULT_CHARACTER_PHOTO);
    try {
      localStorage.removeItem(PHOTO_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove photo from localStorage', e);
    }
  };

  const handleSuccessSubmit = (newEntryData: ContestEntry) => {
    const saved = saveSubmission(newEntryData);
    setEntries(getStoredSubmissions());
    setSuccessEntry(saved);
  };

  const handleToggleLike = (id: string) => {
    const res = toggleEntryLike(id);
    setEntries(getStoredSubmissions());
    if (res.isLiked) {
      setLikedIds((prev) => [...prev, id]);
    } else {
      setLikedIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleResetData = () => {
    localStorage.removeItem('kacf_character_contest_entries_v1');
    localStorage.removeItem('kacf_liked_entries_v1');
    setEntries(INITIAL_SUBMISSIONS);
    setLikedIds([]);
    setAdminOpen(false);
  };

  const handleScrollToGallery = () => {
    const el = document.getElementById('submissions-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d18] text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        onOpenAdmin={() => setAdminOpen(true)}
        entriesCount={entries.length}
      />

      <main className="flex-1">
        {/* Hero Section with Character & Countdown */}
        <HeroSection
          countdown={countdown}
          totalSubmissions={entries.length}
          characterPhoto={characterPhoto}
          onChangePhoto={handleChangeCharacterPhoto}
          onResetPhoto={handleResetCharacterPhoto}
          isCustomPhoto={isCustomPhoto}
        />

        {/* Character Story & Traits Profile */}
        <CharacterProfile />

        {/* Submission Form Section */}
        <SubmissionForm
          onSuccessSubmit={handleSuccessSubmit}
          isExpired={countdown.isExpired}
          characterPhoto={characterPhoto}
        />

        {/* Contest Rules, Guidelines & Prizes */}
        <ContestGuidelines />

        {/* Live Submissions Gallery & Cheers */}
        <SubmissionsList
          entries={entries}
          onToggleLike={handleToggleLike}
          likedIds={likedIds}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Submission Success Confirmation Modal */}
      <SubmissionSuccessModal
        entry={successEntry}
        onClose={() => setSuccessEntry(null)}
        onViewInList={handleScrollToGallery}
        characterPhoto={characterPhoto}
      />

      {/* Organizer Admin / CSV Export Modal */}
      <AdminExportModal
        entries={entries}
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onResetData={handleResetData}
      />
    </div>
  );
}
