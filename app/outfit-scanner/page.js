export default function OutfitScanner() {
  return (
    <main className="scannerScreen">
      <video
        className="scannerVideo"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Outfit scanner preview"
        src="/assets/outfit-scanner-preview.mp4"
      >
        <track kind="captions" />
      </video>

      <button className="scanButton" type="button">
        scan
      </button>
    </main>
  );
}
