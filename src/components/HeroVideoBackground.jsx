import heroVideo from '../assets/hero-video.mp4'

export default function HeroVideoBackground() {
  return (
    <div className="hero-bg-layer">
      <video
        className="hero-bg-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-grain" />
    </div>
  )
}