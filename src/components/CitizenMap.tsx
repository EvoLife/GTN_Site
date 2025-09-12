import { useState } from 'react';
import { MapPin } from 'lucide-react';
import worldMapImage from 'figma:asset/58cd0ae4bdf25b0b5e6109019d4c4ce7b6baba3f.png';

export function CitizenMap() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);

  // GTN hub locations with coordinates
  const locations = [
    { id: 'canada', name: 'Canada (Alberta)', x: 16, y: 20, color: 'primary' },
    { id: 'bali', name: 'Bali', x: 80, y: 58, color: 'accent' },
    { id: 'london', name: 'London', x: 49, y: 26, color: 'secondary' },
    { id: 'germany', name: 'Germany', x: 52, y: 28, color: 'primary' },
    { id: 'dubai', name: 'Dubai', x: 62, y: 38, color: 'accent' },
    { id: 'spain', name: 'Spain', x: 47, y: 34, color: 'secondary' },
    { id: 'kazakhstan', name: 'Kazakhstan', x: 67, y: 25, color: 'primary' }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/20',
        border: 'border-primary',
        text: 'text-primary',
        glow: 'shadow-glow-dark'
      },
      accent: {
        bg: 'bg-accent/20',
        border: 'border-accent',
        text: 'text-accent',
        glow: 'shadow-glow-copper'
      },
      secondary: {
        bg: 'bg-secondary/20',
        border: 'border-secondary',
        text: 'text-secondary',
        glow: 'shadow-brand-dark'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <section className="py-20 surface-2 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(63, 163, 154, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(197, 114, 58, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(30, 84, 73, 0.06) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
            Global Hub Network
          </h2>
          <p className="text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            158K+ citizens building regenerative ventures across 7 strategic hub locations worldwide.
          </p>
        </div>

        {/* Full Width Map Container */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative bg-surface-1 rounded-gtn-lg border border-card-border shadow-brand-dark overflow-hidden" style={{ aspectRatio: '2/1' }}>
            
            {/* World Map Background Image */}
            <div 
              className="absolute inset-0 w-full h-full opacity-80"
              style={{
                backgroundImage: `url(${worldMapImage})`,
                backgroundSize: '110%',
                backgroundPosition: '48% 45%',
                backgroundRepeat: 'no-repeat',
                filter: 'brightness(0.7) contrast(1.2)',
              }}
            />
            
            {/* Dark overlay for better contrast with markers */}
            <div className="absolute inset-0 bg-ink-900/40" />

            {/* Location Markers */}
            {locations.map((location) => {
              const colors = getColorClasses(location.color);
              const isActive = activeLocation === location.id;
              
              return (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ 
                    left: `${location.x}%`, 
                    top: `${location.y}%` 
                  }}
                  onMouseEnter={() => setActiveLocation(location.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  {/* Marker Circle */}
                  <div
                    className={`w-5 h-5 md:w-7 md:h-7 rounded-full border-2 ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300 ${
                      isActive ? `scale-150 ${colors.glow}` : 'group-hover:scale-125'
                    }`}
                  >
                    <div className={`w-full h-full rounded-full ${colors.border.replace('border-', 'bg-')} opacity-60 animate-pulse`}></div>
                  </div>

                  {/* Location Info Popup */}
                  {isActive && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-4 py-3 bg-surface-3 border border-card-border rounded-lg shadow-brand-dark backdrop-blur-md min-w-max z-50">
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-4 h-4 ${colors.text}`} />
                        <span className="font-semibold text-foreground text-sm">{location.name}</span>
                      </div>
                      {/* Arrow pointer */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-surface-3"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center p-4 bg-surface-1 border border-card-border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                158K+
              </div>
              <div className="text-sm text-foreground-secondary">Total Citizens</div>
            </div>
            <div className="text-center p-4 bg-surface-1 border border-card-border rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                127
              </div>
              <div className="text-sm text-foreground-secondary">Countries</div>
            </div>
            <div className="text-center p-4 bg-surface-1 border border-card-border rounded-lg">
              <div className="text-2xl font-bold text-secondary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                7
              </div>
              <div className="text-sm text-foreground-secondary">Hub Locations</div>
            </div>
            <div className="text-center p-4 bg-surface-1 border border-card-border rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                24/7
              </div>
              <div className="text-sm text-foreground-secondary">Network Active</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}