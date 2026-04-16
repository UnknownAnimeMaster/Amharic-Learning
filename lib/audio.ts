/**
 * Placeholder audio helper.
 * This keeps the app ready for real MP3 files later without requiring paid APIs.
 */

const audioMap: Record<string, string> = {
  // Example:
  // "letter-ha": "/audio/letters/ha.mp3"
};

export function playAudio(key?: string) {
  if (!key) {
    console.info("No audio file linked yet.");
    return;
  }

  const src = audioMap[key];
  if (!src || typeof window === "undefined") {
    console.info(`Audio placeholder for ${key}`);
    return;
  }

  const audio = new Audio(src);
  audio.play().catch(() => {
    console.info("Audio playback blocked until user interacts.");
  });
}
