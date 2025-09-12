import { useState, useEffect } from 'react';
import { useLanguage } from './i18n/LanguageContext';
import { MapPin } from 'lucide-react';

export function GlobalHubMap() {
  const { t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  // GTN strategic hub locations with coordinates
  const locations = [
    { 
      id: 'canada', 
      name: t('impact.map.locations.canada.name'), 
      description: t('impact.map.locations.canada.desc'),
      x: 16, 
      y: 22, 
      color: 'primary' 
    },
    { 
      id: 'indonesia', 
      name: t('impact.map.locations.indonesia.name'), 
      description: t('impact.map.locations.indonesia.desc'),
      x: 80, 
      y: 58, 
      color: 'accent' 
    },
    { 
      id: 'europe', 
      name: t('impact.map.locations.europe.name'), 
      description: t('impact.map.locations.europe.desc'),
      x: 50, 
      y: 28, 
      color: 'secondary' 
    },
    { 
      id: 'uae', 
      name: t('impact.map.locations.uae.name'), 
      description: t('impact.map.locations.uae.desc'),
      x: 62, 
      y: 38, 
      color: 'accent' 
    },
    { 
      id: 'kazakhstan', 
      name: t('impact.map.locations.kazakhstan.name'), 
      description: t('impact.map.locations.kazakhstan.desc'),
      x: 67, 
      y: 25, 
      color: 'primary' 
    }
  ];

  // Connection lines between hubs
  const connections = [
    // Primary network connections
    { from: 'canada', to: 'europe', strength: 'primary' },
    { from: 'europe', to: 'uae', strength: 'secondary' },
    { from: 'uae', to: 'indonesia', strength: 'primary' },
    { from: 'kazakhstan', to: 'europe', strength: 'secondary' },
    { from: 'kazakhstan', to: 'uae', strength: 'accent' },
    { from: 'canada', to: 'kazakhstan', strength: 'tertiary' },
    { from: 'indonesia', to: 'kazakhstan', strength: 'tertiary' }
  ];

  // Animation cycle for connection lines
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % connections.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [connections.length]);

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/30',
        border: 'border-primary',
        text: 'text-primary',
        glow: 'shadow-glow-dark',
        pulse: 'bg-primary'
      },
      accent: {
        bg: 'bg-accent/30',
        border: 'border-accent',
        text: 'text-accent',
        glow: 'shadow-glow-copper',
        pulse: 'bg-accent'
      },
      secondary: {
        bg: 'bg-secondary/30',
        border: 'border-secondary',
        text: 'text-secondary',
        glow: 'shadow-brand-dark',
        pulse: 'bg-secondary'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getConnectionPath = (fromId: string, toId: string) => {
    const fromLocation = locations.find(loc => loc.id === fromId);
    const toLocation = locations.find(loc => loc.id === toId);
    
    if (!fromLocation || !toLocation) return '';
    
    const x1 = fromLocation.x;
    const y1 = fromLocation.y;
    const x2 = toLocation.x;
    const y2 = toLocation.y;
    
    // Create a curved path for better visual appeal
    const midX = (x1 + x2) / 2;
    const midY = Math.min(y1, y2) - 8; // Curve upward
    
    return `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  };

  const getConnectionOpacity = (index: number, strength: string) => {
    const baseOpacity = {
      primary: 0.8,
      secondary: 0.6,
      accent: 0.7,
      tertiary: 0.4
    };
    
    const isActive = index === animationPhase;
    return isActive ? 1 : baseOpacity[strength as keyof typeof baseOpacity] || 0.4;
  };

  const getConnectionColor = (strength: string) => {
    const colorMap = {
      primary: '#3FA39A',
      secondary: '#4B5E7A', 
      accent: '#C5723A',
      tertiary: '#6B7280'
    };
    return colorMap[strength as keyof typeof colorMap] || '#6B7280';
  };

  return (
    <section className="py-20 surface-2 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(63, 163, 154, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 75% 75%, rgba(197, 114, 58, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 50% 10%, rgba(30, 84, 73, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(75, 94, 122, 0.1) 0%, transparent 50%)
          `
        }}></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
            {t('impact.map.title')}
          </h2>
          <p className="text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            {t('impact.map.subtitle')}
          </p>
        </div>

        {/* Enhanced World Map Container */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-surface-1 to-surface-2 rounded-gtn-lg border border-card-border shadow-brand-dark overflow-hidden" style={{ aspectRatio: '2/1' }}>
            
            {/* SVG World Map */}
            <svg 
              className="absolute inset-0 w-full h-full" 
              viewBox="0 0 100 50" 
              preserveAspectRatio="xMidYMid slice"
            >
              {/* World continents simplified paths */}
              <g className="opacity-30 fill-foreground-tertiary">
                {/* North America */}
                <path d="M5 15 L25 12 L30 20 L25 30 L15 35 L8 30 L5 25 Z" />
                {/* South America */}
                <path d="M20 35 L28 32 L30 45 L25 48 L18 45 L20 35 Z" />
                {/* Europe */}
                <path d="M45 15 L55 18 L52 25 L48 28 L45 25 L45 15 Z" />
                {/* Africa */}
                <path d="M45 28 L55 30 L58 42 L50 45 L45 40 L45 28 Z" />
                {/* Asia */}
                <path d="M55 12 L85 15 L88 30 L80 35 L65 32 L58 25 L55 12 Z" />
                {/* Australia */}
                <path d="M75 40 L85 38 L88 42 L82 45 L75 43 L75 40 Z" />
              </g>

              {/* Connection Lines with Animation */}
              <g className="stroke-2" fill="none">
                {connections.map((connection, index) => {
                  const path = getConnectionPath(connection.from, connection.to);
                  const opacity = getConnectionOpacity(index, connection.strength);
                  const color = getConnectionColor(connection.strength);
                  const isActive = index === animationPhase;
                  
                  return (
                    <g key={`${connection.from}-${connection.to}`}>
                      {/* Base connection line */}
                      <path
                        d={path}
                        stroke={color}
                        strokeWidth={isActive ? "0.3" : "0.15"}
                        opacity={opacity * 0.6}
                        strokeDasharray={isActive ? "0" : "1 2"}
                      />
                      {/* Animated pulse line */}
                      {isActive && (
                        <path
                          d={path}
                          stroke={color}
                          strokeWidth="0.4"
                          opacity="0.9"
                          strokeDasharray="2 4"
                          className="animate-pulse"
                          filter="url(#glow)"
                        />
                      )}
                    </g>
                  );
                })}
              </g>

              {/* SVG Filter for Glow Effect */}
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Location Markers */}
            {locations.map((location) => {
              const colors = getColorClasses(location.color);
              const isActive = activeLocation === location.id;
              
              return (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                  style={{ 
                    left: `${location.x}%`, 
                    top: `${location.y}%` 
                  }}
                  onMouseEnter={() => setActiveLocation(location.id)}
                  onMouseLeave={() => setActiveLocation(null)}
                >
                  {/* Outer pulse ring */}
                  <div
                    className={`absolute inset-0 w-8 h-8 md:w-12 md:h-12 rounded-full ${colors.pulse} opacity-20 animate-ping transform -translate-x-1/2 -translate-y-1/2`}
                  />
                  
                  {/* Main marker */}
                  <div
                    className={`relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2 ${colors.border} ${colors.bg} backdrop-blur-sm transition-all duration-300 ${
                      isActive ? `scale-150 ${colors.glow}` : 'group-hover:scale-125'
                    } flex items-center justify-center`}
                  >
                    <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${colors.pulse} animate-pulse`}></div>
                  </div>

                  {/* Enhanced Location Info Popup */}
                  {isActive && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 px-4 py-3 bg-surface-3/95 border border-card-border rounded-xl shadow-brand-dark backdrop-blur-md min-w-max z-50">
                      <div className="flex items-center gap-3 mb-1">
                        <MapPin className={`w-4 h-4 ${colors.text}`} />
                        <span className="font-semibold text-foreground text-sm">{location.name}</span>
                      </div>
                      <p className="text-xs text-foreground-secondary">{location.description}</p>
                      
                      {/* Enhanced arrow pointer */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="border-l-6 border-r-6 border-t-6 border-l-transparent border-r-transparent border-t-surface-3/95"></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Network Status Indicator */}
            <div className="absolute top-4 right-4 bg-surface-3/90 backdrop-blur-md border border-card-border rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-xs text-foreground-secondary font-medium">{t('impact.map.status')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}