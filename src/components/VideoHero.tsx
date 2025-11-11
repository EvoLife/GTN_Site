import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight, Play, Pause } from 'lucide-react';
import heroBackground from 'figma:asset/04b85c1f677ce88657b4e7ef011a8f597b6e03fa.png';
// TODO: Replace with your actual GTN video once uploaded
// import gtnVideo from 'figma:asset/YOUR_GTN_VIDEO_HASH.mp4';

interface VideoHeroProps {
  onNavigate: (page: string) => void;
}

export function VideoHero({ onNavigate }: VideoHeroProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoEnd = () => {
    setIsVideoPlaying(false);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBackground}
          alt="GTN architectural space"
          className="w-full h-full object-cover"
        />
        {/* Dark tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/40"></div>
        {/* Additional gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/60"></div>
      </div>

      {/* Video Element - Hidden until playing */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 ${
          isVideoPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onLoadedData={() => setIsVideoLoaded(true)}
        onEnded={handleVideoEnd}
        playsInline
        preload="metadata"
      >
        {/* Replace this with your uploaded video */}
        {/* <source src={gtnVideo} type="video/mp4" /> */}
        <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-20 w-full">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {/* GTN Brand Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-ivory/90 text-lg font-medium tracking-wider mb-2">
                    Global Talent Nation
                  </div>
                  <div className="text-ivory/70 text-sm tracking-wide">
                    Building Regenerative Ventures Through Aligned Networks
                  </div>
                </div>
              </div>
            </div>

            {/* Main Headlines - Updated Layout */}
            <div className="space-y-10 mb-12">
              {/* Main Headline - Centered, All White */}
              <div className="text-center">
                <h1 className="text-4xl md:text-6xl lg:text-7xl text-ivory font-bold leading-tight tracking-tight">
                  <span className="block mb-2">More than a network.</span>
                  <span className="block">A blueprint for regenerative impact.</span>
                </h1>
              </div>

              {/* Secondary Text - Left-aligned, Smaller, Secondary Style */}
              <div className="max-w-3xl mx-auto">
                <p className="text-sm md:text-base text-ivory/70 leading-relaxed font-normal text-center">
                  An invitation-only network where entrepreneurs, experts, and creators collaborate to build sustainable solutions that create lasting impact for people and planet.
                </p>
              </div>

              {/* Video Play Button - Large and Central */}
              <div className="my-16 text-center">
                <button
                  onClick={handleVideoToggle}
                  className="group relative inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-ivory/20 border-2 border-ivory/40 backdrop-blur-sm hover:bg-ivory/30 hover:border-ivory/60 hover:scale-110 transition-all duration-300 shadow-glow-dark hover:shadow-glow-copper"
                  aria-label={isVideoPlaying ? "Pause video" : "Play video"}
                >
                  {isVideoPlaying ? (
                    <Pause className="w-8 h-8 md:w-10 md:h-10 text-ivory ml-0" />
                  ) : (
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-ivory ml-1" />
                  )}
                  
                  {/* Pulse animation when not playing */}
                  {!isVideoPlaying && (
                    <>
                      <div className="absolute inset-0 rounded-full bg-ivory/20 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full bg-ivory/10 animate-pulse"></div>
                    </>
                  )}
                </button>
                
                {!isVideoPlaying && (
                  <p className="text-ivory/80 text-sm mt-4 tracking-wide">
                    Watch our story • 3 minutes
                  </p>
                )}
              </div>


            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-12">
              <a 
                href="https://app.gtn.life"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-lg font-medium rounded-md shadow-glow-copper hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-accent/30"
              >
                Apply to Join
                <ArrowRight className="ml-2" size={20} />
              </a>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => onNavigate('contact')}
                className="border-2 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground px-10 py-4 text-lg font-medium backdrop-blur-sm bg-primary/10 hover:shadow-glow-dark transition-all duration-300"
              >
                Propose a Project
              </Button>
            </div>


          </div>
        </div>
      </div>



      {/* Video Progress Bar */}
      {isVideoPlaying && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-ink/60 backdrop-blur-md rounded-full px-6 py-3 border border-ivory/20">
            <div className="flex items-center space-x-4 text-ivory/90">
              <button
                onClick={handleVideoToggle}
                className="p-2 rounded-full bg-ivory/20 hover:bg-ivory/30 transition-colors duration-200"
              >
                <Pause className="w-4 h-4" />
              </button>
              <span className="text-sm font-mono">Playing: About GTN</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}