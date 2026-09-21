"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

type VideoModalProps = {
  src: string | null;
  poster?: string;
  title?: string;
  onClose: () => void;
  closeLabel: string;
};

export function VideoModal({ src, poster, title, onClose, closeLabel }: VideoModalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!src) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting player UI state when a new video opens
    setPlaying(true);
    setMuted(false);
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [src, onClose]);

  useEffect(() => {
    function onFullscreenChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  async function toggleFullscreen() {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (!document.fullscreenElement) {
      if (wrapper.requestFullscreen) {
        await wrapper.requestFullscreen();
      } else {
        const iosVideo = videoRef.current as HTMLVideoElement & {
          webkitEnterFullscreen?: () => void;
        };
        iosVideo.webkitEnterFullscreen?.();
      }
    } else {
      await document.exitFullscreen();
    }
  }

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/85 p-4"
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            ref={wrapperRef}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[85vh] overflow-hidden rounded-2xl bg-ink shadow-soft-lg"
          >
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              autoPlay
              playsInline
              preload="none"
              onClick={togglePlay}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className="max-h-[85vh] max-w-[90vw] cursor-pointer"
            />

            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-ink/80 to-transparent p-4">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
              {title && (
                <span className="flex-1 truncate text-sm font-bold text-white">{title}</span>
              )}
              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
              >
                {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
