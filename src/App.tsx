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

export default function App() {
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [likedIds, setLikedIds] = useState<string[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [successEntry, setSuccessEntry] = useState<ContestEntry | null>(null);

  const countdown = useCountdown(CONTEST_DEADLINE);

  // Initialize data on mount
  useEffect(() => {
    setEntries(getStoredSubmissions());
    setLikedIds(getLikedIds());
  }, []);

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
        />

        {/* Character Story & Traits Profile */}
        <CharacterProfile />

        {/* Submission Form Section */}
        <SubmissionForm
          onSuccessSubmit={handleSuccessSubmit}
          isExpired={countdown.isExpired}
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
