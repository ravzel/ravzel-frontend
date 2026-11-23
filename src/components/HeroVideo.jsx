import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

/**
 * HeroVideo Component (Zoomed-Out Full-Width Cinematic Video Background)
 * 
 * - Full-width hero background integration without artificial borders or boxes
 * - Zoomed out naturally using aspect-[848/478] and object-contain
 * - Shows Zia's complete upper body: face, hair, shoulders, torso, blazer, and hand gesture
 * - Positioned toward the right/center-right so she doesn't collide with the left-aligned headline
 * - Feathered multi-directional edge gradients that blend seamlessly into the #0E0E0E foundation
 * - Subtle left readability scrim ensuring foreground text contrast
 * - Unobtrusive audio and play/pause controls in bottom-right corner
 */
export function HeroVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasAutoplayFailed, setHasAutoplayFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasAutoplayFailed(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy
          setHasAutoplayFailed(true);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      
      {/* 1. Deep Foundation & Ambient Lighting */}
      <div className="absolute inset-0 bg-[#0E0E0E]" />
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#A78BFA]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* 2. Video Stage: Sized and positioned naturally to eliminate empty right black gap and sit closer to text */}
      <div className="absolute inset-0 flex items-center justify-center lg:justify-end overflow-hidden pointer-events-none">
        <div className="relative w-full max-w-[850px] lg:max-w-[1050px] xl:max-w-[1200px] aspect-[848/478] max-h-[85vh] lg:translate-x-24 xl:translate-x-36 overflow-hidden">
          <video
            ref={videoRef}
            src="/hero-character.mp4"
            playsInline
            muted
            loop
            autoPlay
            preload="auto"
            className="w-full h-full object-contain pointer-events-auto"
            aria-label="RAVZEL character presenter cinematic background"
          />

          {/* Seamless feathered edge gradients */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-[#0E0E0E] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#0E0E0E] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 sm:h-36 bg-gradient-to-t from-[#0E0E0E] to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 3. Subtle Readability Scrims:
          - A soft left-to-right gradient ensuring crisp text contrast on the left without dimming the character
          - Top gradient for fixed navigation contrast
          - Bottom gradient for seamless transition to About section
      */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E0E] via-[#0E0E0E]/75 to-transparent lg:w-[50%] pointer-events-none" />
      <div className="absolute inset-0 bg-[#0E0E0E]/35 lg:hidden pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/60 to-transparent pointer-events-none" />

      {/* Autoplay blocked fallback banner */}
      {hasAutoplayFailed && !isPlaying && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-20 pointer-events-auto">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F8F6EE] text-[#0E0E0E] text-xs font-mono font-bold hover:bg-white transition-all shadow-xl active:scale-95"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Cinematic Background</span>
          </button>
        </div>
      )}

      {/* 4. Floating Unobtrusive Media Controls:
          - On mobile: placed at top-20 below fixed navbar to avoid overlapping chatbot and CTAs
          - On desktop: placed at bottom-6 right-6
      */}
      <div className="absolute top-20 sm:top-auto sm:bottom-6 right-4 sm:right-6 z-20 flex items-center gap-2 pointer-events-auto">
        {/* Audio Toggle */}
        <button
          onClick={toggleMute}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0E0E0E]/80 backdrop-blur-md border border-[#D9D9D9]/20 text-[#F8F6EE] text-[11px] font-mono hover:border-[#A78BFA] hover:text-[#A78BFA] transition-all shadow-lg active:scale-95"
          aria-label={isMuted ? "Unmute character audio" : "Mute character audio"}
          title={isMuted ? "Click to hear voice introduction" : "Mute audio"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#D9D9D9]/70" />
              <span className="hidden sm:inline">Unmute Audio</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#A78BFA] animate-pulse" />
              <span className="text-[#A78BFA] hidden sm:inline">Audio On</span>
            </>
          )}
        </button>

        {/* Play/Pause Toggle */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-xl bg-[#0E0E0E]/80 backdrop-blur-md border border-[#D9D9D9]/20 text-[#F8F6EE] hover:border-[#A78BFA] hover:text-[#A78BFA] transition-all shadow-lg active:scale-95"
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </button>
      </div>

    </div>
  );
}

export default HeroVideo;
