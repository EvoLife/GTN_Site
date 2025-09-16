import image_a5b21d089fa83ec7fba24169035726b66fd94398 from 'figma:asset/a5b21d089fa83ec7fba24169035726b66fd94398.png';
import image_c901d0c48b88a1e1c45ca13506f5cdd0df9a3edd from 'figma:asset/c901d0c48b88a1e1c45ca13506f5cdd0df9a3edd.png';
import image_273c93f0bdb4af4d0fb9c52431a7595edc02e772 from 'figma:asset/273c93f0bdb4af4d0fb9c52431a7595edc02e772.png';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { ArrowRight, Lightbulb, Play, UserCheck, Rocket, Home, Coins, MapPin, Bot, GraduationCap, Building, Building2, Eye, HandHeart, Leaf, Cpu, Shield, Users, Target, CheckCircle, Star, BookOpen, Zap } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { VideoHero } from '../VideoHero';
import { useState, useRef } from 'react';
import heroBackground from 'figma:asset/cbdd198def234da4e29f33eac44a8a6427aaada0.png';
import gtnLogo from 'figma:asset/7a413933a32971077f976d5901124a6b70ce9581.png';
import { useLanguage } from '../i18n/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { t, get } = useLanguage();

  // YouTube video state management
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const iframeRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoToggle = () => {
    if (iframeRef.current) {
      if (isVideoPlaying) {
        iframeRef.current.pause();
      } else {
        iframeRef.current.play();
      }
    }
  };

  const journeyFromI18n = get<any>('home.journey.steps') || [];
  const journeySteps = [
    { number: '01', title: journeyFromI18n[0]?.title, items: journeyFromI18n[0]?.items || [], icon: UserCheck, color: 'primary' },
    { number: '02', title: journeyFromI18n[1]?.title, items: journeyFromI18n[1]?.items || [], icon: Lightbulb, color: 'accent' },
    { number: '03', title: journeyFromI18n[2]?.title, items: journeyFromI18n[2]?.items || [], icon: Play, color: 'secondary' },
    { number: '04', title: journeyFromI18n[3]?.title, items: journeyFromI18n[3]?.items || [], icon: Rocket, color: 'primary' },
    { number: '05', title: journeyFromI18n[4]?.title, items: journeyFromI18n[4]?.items || [], icon: Building, color: 'accent' },
  ];

  const valuesI18n = get<any>('home.foundation.items') || [];
  const values = [
    { icon: Eye, title: valuesI18n[0]?.title, description: valuesI18n[0]?.desc },
    { icon: HandHeart, title: valuesI18n[1]?.title, description: valuesI18n[1]?.desc },
    { icon: Leaf, title: valuesI18n[2]?.title, description: valuesI18n[2]?.desc },
    { icon: Cpu, title: valuesI18n[3]?.title, description: valuesI18n[3]?.desc },
    { icon: Shield, title: valuesI18n[4]?.title, description: valuesI18n[4]?.desc },
    { icon: Lightbulb, title: valuesI18n[5]?.title, description: valuesI18n[5]?.desc },
  ];

  const projects = (() => {
    const cards = get<any>('home.initiativesCards') || [];
    const mapStatus = (code?: string) => {
      switch (code) {
        case 'active': return 'in progress';
        case 'building': return 'in development';
        case 'partnership': return 'partnership in progress';
        case 'future': return 'future project';
        default: return 'in development';
      }
    };
    const icons = [Building, Coins, Users, Bot, Building2];
    return cards.map((c: any, idx: number) => ({
      name: c?.name,
      description: c?.description,
      status: mapStatus(c?.statusCode),
      focus: '',
      icon: icons[idx] || Building,
      badge: idx === 1 ? 'Economy' : idx === 2 ? 'People' : idx === 3 ? 'Platform' : 'Infrastructure',
      badgeColor: idx === 1 ? 'accent' : idx === 2 ? 'secondary' : 'primary',
      isFuture: c?.statusCode === 'future',
      image: undefined,
    }));
  })();


  const inviteItems = get<any>('home.invite.items') || [];
  const whoWeInvite = [
    { icon: Users, title: inviteItems[0]?.title, description: inviteItems[0]?.desc },
    { icon: Target, title: inviteItems[1]?.title, description: inviteItems[1]?.desc },
    { icon: BookOpen, title: inviteItems[2]?.title, description: inviteItems[2]?.desc },
  ];

  const possibilities = [
    {
      icon: Building2,
      title: "Co-create Regenerative Ventures",
      description: "Join or launch projects that create positive impact while building sustainable business models."
    },
    {
      icon: Users,
      title: "Build with Aligned Teams",
      description: "Connect with like-minded professionals who share your values and complement your skills."
    },
    {
      icon: Zap,
      title: "Access Resources & Knowledge",
      description: "Leverage collective expertise, funding opportunities, and infrastructure to accelerate your vision."
    },
    {
      icon: Target,
      title: "Develop Leadership Skills",
      description: "Grow through structured progression from contributor to team leader to organizational steward."
    }
  ];

  const ecosystemFeatures = [
    {
      icon: CheckCircle,
      title: "Talent Development Platform",
      description: "AI-powered tools to identify your strengths and match you with optimal roles and projects."
    },
    {
      icon: Users,
      title: "Global Community Network",
      description: "Connect with 158K+ members across 60+ countries working on sustainable solutions."
    },
    {
      icon: Building,
      title: "Physical Hub Network",
      description: "Access to wellness-optimized spaces in major cities designed for deep work and collaboration."
    },
    {
      icon: Coins,
      title: "Value Exchange System",
      description: "Transparent contribution tracking with fair compensation and equity distribution."
    }
  ];

  const selectionProcess = [
    {
      step: "01",
      title: "Application Review",
      description: "We review your background, values alignment, and potential contribution to the network.",
      icon: BookOpen
    },
    {
      step: "02", 
      title: "Values Interview",
      description: "Deep conversation about your vision, goals, and how they align with regenerative principles.",
      icon: Users
    },
    {
      step: "03",
      title: "Skill Assessment",
      description: "Understanding your unique talents and how they can contribute to our ecosystem.",
      icon: Target
    },
    {
      step: "04",
      title: "Community Integration",
      description: "Gradual onboarding with mentorship to ensure successful integration into the network.",
      icon: CheckCircle
    }
  ];

  const getColorClasses = (color: string, isExpanded: boolean) => {
    const colorMap = {
      primary: {
        bg: isExpanded ? 'bg-primary/20' : 'bg-primary/10',
        border: isExpanded ? 'border-primary/40' : 'border-primary/20',
        icon: 'bg-primary',
        text: 'text-primary',
        glow: 'shadow-glow-dark'
      },
      accent: {
        bg: isExpanded ? 'bg-accent/20' : 'bg-accent/10',
        border: isExpanded ? 'border-accent/40' : 'border-accent/20',
        icon: 'bg-accent',
        text: 'text-accent',
        glow: 'shadow-glow-copper'
      },
      secondary: {
        bg: isExpanded ? 'bg-secondary/20' : 'bg-secondary/10',
        border: isExpanded ? 'border-secondary/40' : 'border-secondary/20',
        icon: 'bg-secondary',
        text: 'text-secondary',
        glow: 'shadow-brand-dark'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  const getBadgeClasses = (badgeColor: string) => {
    const badgeColorMap = {
      primary: 'bg-primary text-primary-foreground',
      accent: 'bg-accent text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground'
    };
    return badgeColorMap[badgeColor as keyof typeof badgeColorMap];
  };

  const getStatusBadgeClasses = (status: string) => {
    const statusMap = {
      'in progress': 'bg-primary/20 text-primary border border-primary/30',
      'in development': 'bg-accent/20 text-accent border border-accent/30',
      'partnership in progress': 'bg-secondary/20 text-secondary border border-secondary/30',
      'R&D': 'bg-primary/20 text-primary border border-primary/30',
      'pre-launch': 'bg-accent/20 text-accent border border-accent/30',
      'future project': 'bg-muted/40 text-muted-foreground border border-muted/60'
    };
    return statusMap[status as keyof typeof statusMap] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section - Clean Minimal Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroBackground}
            alt="GTN Hub Architecture"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container text-center text-white">
          <div className="max-w-4xl mx-auto space-y-4 pt-0 md:pt-16 lg:pt-24 pb-32 sm:pb-40 md:pb-24 lg:pb-32">
            {/* Hero Logo - Mobile Only Branding */}
            <div className="flex flex-col items-center space-y-2 mb-4 md:hidden">
              <img 
                src={gtnLogo} 
                alt="GTN Logo" 
                className="h-12 w-auto filter brightness-0 invert"
              />
              <h2 className="text-3xl font-bold tracking-wider" style={{ fontFamily: 'var(--font-headline)' }}>
                GTN
              </h2>
            </div>
            
            {/* Main Headline - Business Focused */}
            <div className="space-y-6">
              <h1 className="text-lg md:text-xl lg:text-2xl leading-tight tracking-tight" style={{ fontFamily: 'var(--font-headline)' }}>
                <span className="block mb-3">
                  {t('home.hero.title1')}
                </span>
                {t('home.hero.title2') && (
                  <span className="block">
                    {t('home.hero.title2')}
                  </span>
                )}
              </h1>
            </div>

            {/* Supporting Text */}
            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl leading-relaxed opacity-90">
                {t('home.hero.subtitle')}
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12 mb-8">
              <Button 
                size="lg"
                onClick={() => onNavigate('join')}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-glow-copper"
              >
                {t('home.hero.ctaApply')}
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                size="lg"
                variant="outline" 
                onClick={() => onNavigate('contact')}
                className="border-white text-white hover:bg-white hover:text-ink px-8"
              >
                {t('home.hero.ctaPropose')}
              </Button>
            </div>
          </div>
        </div>

        {/* Dark Stats Bar - Ink Theme - HIDDEN */}
        {false && (
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="gradient-ink-complex border-t border-ink-600/30">
            <div className="container py-6 sm:py-8 md:py-12">
              {/* Description */}
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <p className="text-sm md:text-base text-ivory/80 max-w-3xl mx-auto leading-relaxed">
                  {t('home.video.desc')}
                </p>
              </div>
              
              {/* Stats Grid - Ink Dark Theme */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                <div className="text-center p-3 md:p-4 rounded-lg bg-gradient-to-br from-ink-700/80 to-ink-800/60 border border-ink-600/40 shadow-md backdrop-blur-sm">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-ivory mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    158K+
                  </div>
                  <div className="text-xs md:text-sm text-ivory/60">
                    {t('home.stats.members')}
                  </div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-gradient-to-br from-ink-600/80 to-ink-700/60 border border-ink-500/40 shadow-md backdrop-blur-sm">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-ivory mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    60+
                  </div>
                  <div className="text-xs md:text-sm text-ivory/60">
                    {t('home.stats.countries')}
                  </div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-gradient-to-br from-ink-800/80 to-ink-900/60 border border-ink-700/40 shadow-md backdrop-blur-sm">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-ivory mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    95%
                  </div>
                  <div className="text-xs md:text-sm text-ivory/60">
                    {t('home.stats.talents')}
                  </div>
                </div>
                <div className="text-center p-3 md:p-4 rounded-lg bg-gradient-to-br from-ink-700/80 to-ink-800/60 border border-ink-600/40 shadow-md backdrop-blur-sm">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-ivory mb-1" style={{ fontFamily: 'var(--font-mono)' }}>
                    3000
                  </div>
                  <div className="text-xs md:text-sm text-ivory/60">
                    {t('home.stats.events')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </section>

      {/* Video Presentation Section */}
      <section className="py-20 surface-1 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 20%, rgba(63, 163, 154, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(197, 114, 58, 0.08) 0%, transparent 50%)
            `
          }}></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-foreground mb-4" style={{ fontFamily: 'var(--font-headline)' }}>
                {t('home.video.title')}
              </h2>
              <p className="text-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
                {t('home.video.desc')}
              </p>
            </div>

            {/* Video Container */}
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-surface-2 rounded-gtn-lg overflow-hidden shadow-brand-dark border border-card-border">
                {/* Video Element with 16:9 Aspect Ratio */}
                <div className="relative aspect-video">
                  <video
                    ref={iframeRef}
                    src="https://elhcqyzbqyfwewemhfwh.supabase.co/storage/v1/object/public/GTN/GTN_Intro.mp4"
                    className="absolute inset-0 w-full h-full"
                    controls={isVideoPlaying}
                    playsInline
                    preload="metadata"
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />

                  {/* Video Thumbnail/Poster */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-ink-700 to-ink-800 transition-opacity duration-500 ${
                    isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}>
                    {/* Background pattern for video poster */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `
                          radial-gradient(ellipse at center, rgba(63, 163, 154, 0.2) 0%, transparent 70%),
                          radial-gradient(ellipse at 20% 80%, rgba(197, 114, 58, 0.15) 0%, transparent 70%)
                        `
                      }}></div>
                    </div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={handleVideoToggle}
                        className="group relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-ivory/20 border-2 border-ivory/40 backdrop-blur-sm hover:bg-ivory/30 hover:border-ivory/60 hover:scale-110 transition-all duration-300 shadow-glow-dark hover:shadow-glow-copper"
                        aria-label="Play GTN presentation video"
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-ivory ml-1" />
                        
                        {/* Pulse animation rings */}
                        <div className="absolute inset-0 rounded-full bg-ivory/20 animate-ping"></div>
                        <div className="absolute inset-0 rounded-full bg-ivory/10 animate-pulse"></div>
                      </button>
                    </div>

                    {/* Removed video info overlay as per request */}
                  </div>

                  {/* YouTube video handles its own controls when playing */}
                </div>
              </div>

              {/* Call to Action Below Video */}
              <div className="text-center mt-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate('join')}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 shadow-glow-copper"
                  >
                    {t('home.video.ctaApply')}
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => onNavigate('contact')}
                    className="border-card-border text-foreground hover:bg-surface-2 px-6"
                  >
                    {t('home.video.ctaLearn')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section - With Visual */}
      <section className="py-24 surface-1 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(63, 163, 154, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(197, 114, 58, 0.06) 0%, transparent 50%)
            `
          }}></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl text-foreground mb-6" style={{ fontFamily: 'var(--font-headline)' }}>
                {t('home.whoWeAre.title')}
              </h2>
            </div>

            {/* Content with Image Layout */}
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
              {/* Image */}
              <div className="order-2 lg:order-1">
                <Card className="overflow-hidden surface-2 border-card-border rounded-gtn-lg shadow-brand-dark h-full">
                  <div className="h-full overflow-hidden">
                    <ImageWithFallback
                      src={image_c901d0c48b88a1e1c45ca13506f5cdd0df9a3edd}
                      alt="Modern collaborative workspace with team members working together"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Card>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2">
                <Card className="p-8 md:p-10 surface-2 border-card-border rounded-gtn-lg shadow-brand-dark hover:shadow-glow-dark transition-all duration-500 h-full flex flex-col justify-center">
                  <div className="space-y-6">
                    <p className="text-xl text-foreground font-medium leading-relaxed">
                      {t('home.whoWeAre.p1')}
                    </p>
                    
                    <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                      <p className="text-lg text-accent font-medium leading-relaxed text-center">
                        {t('home.whoWeAre.highlight')}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Foundation - Values */}
      <section className="py-16 surface-2">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('home.foundation.title')}</h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('home.foundation.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="p-5 surface-1 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="text-primary" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-foreground-secondary leading-relaxed text-[14px]">{value.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Initiatives - Projects with Visual */}
      <section className="py-16 surface-1">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('home.initiatives.title')}</h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('home.initiatives.subtitle')}
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <Card className="overflow-hidden surface-2 border-card-border rounded-gtn-lg shadow-brand-dark">
              <div className="aspect-video md:aspect-[21/9] overflow-hidden">
                <ImageWithFallback
                  src={image_a5b21d089fa83ec7fba24169035726b66fd94398}
                  alt="Modern sustainable architecture with renewable energy systems and green building design"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-foreground mb-3">{t('home.initiatives.heroTitle')}</h3>
                <p className="text-foreground-secondary leading-relaxed">
                  {t('home.initiatives.heroDesc')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Compact Project Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {projects.slice(0, 4).map((project, index) => {
              const IconComponent = project.icon;
              return (
                <Card 
                  key={index} 
                  className="surface-2 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">
                        {project.name}
                      </h3>
                      <Badge className={`${getStatusBadgeClasses(project.status)} text-xs ml-2`}>
                        {project.status === 'in progress' ? t('home.initiatives.statusLabel.active') :
                         project.status === 'in development' ? t('home.initiatives.statusLabel.building') :
                         project.status === 'partnership in progress' ? t('home.initiatives.statusLabel.partnership') :
                         t('home.initiatives.statusLabel.future')}
                      </Badge>
                    </div>
                    <p className="text-sm text-foreground-secondary leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => onNavigate('contact')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-glow-copper"
            >
              {t('home.initiatives.ctaPropose')}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Who We Invite */}
      <section className="py-20 surface-2">
        <div className="container py-[0px] px-[40px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('home.invite.title')}</h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('home.invite.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whoWeInvite.map((profile, index) => {
              const IconComponent = profile.icon;
              return (
                <Card key={index} className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                  <div className="mb-4 mx-auto w-16 h-16 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                    <IconComponent className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{profile.title}</h3>
                  <p className="text-foreground-secondary leading-relaxed">{profile.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your Journey with GTN */}
      <section className="py-16 surface-1">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('home.journey.title')}</h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('home.journey.subtitle')}
            </p>
          </div>

          {/* Compact Journey Steps */}
          <div className="max-w-5xl mx-auto space-y-6">
            {journeySteps.map((step, index) => {
              const IconComponent = step.icon;
              const colors = getColorClasses(step.color, false);
              
              return (
                <div key={index} className={`rounded-gtn-lg border ${colors.border} ${colors.bg} p-5 transition-all duration-300`}>
                  <div className="flex items-start gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-lg font-mono font-bold text-foreground-tertiary">
                        {step.number}
                      </div>
                      <div className={`w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="text-ivory" size={18} />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-lg font-semibold ${colors.text} mb-3`}>
                        {step.title}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        {step.items.map((item: string, itemIndex: number) => (
                          <div key={itemIndex} className="flex items-start gap-2 text-sm text-foreground-secondary">
                            <span className="text-foreground-tertiary mt-1">—</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Button 
              onClick={() => onNavigate('join')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-glow-copper"
            >
{t('home.hero.ctaApply')}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Possibilities with Visual */}
      <section className="py-20 surface-2">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('home.possibilities.title')}</h2>
            <p className="text-lg text-foreground-secondary  mx-auto">
              {t('home.possibilities.subtitle')}
            </p>
          </div>

          {/* Visual Introduction */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Card className="overflow-hidden surface-1 border-card-border rounded-gtn-lg shadow-brand-dark">
                  <div className="aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1609843025783-6a66a8f45e0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBwb3RlbnRpYWwlMjBmdXR1cmUlMjBvcHBvcnR1bml0aWVzfGVufDF8fHx8MTc1Njc2ODcwOXww&ixlib=rb-4.1.0&q=80&w=1080"
                      alt="Growth potential and future opportunities"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Card>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-foreground">{t('home.possibilities.introTitle')}</h3>
                <p className="text-lg text-foreground-secondary leading-relaxed">
                  {t('home.possibilities.introP1')}
                </p>
                <p className="text-foreground-secondary">
                  {t('home.possibilities.introP2')}
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(() => {
              const cards = get<any>('home.possibilities.cards') || [];
              const withIcons = [
                { icon: Building2, ...cards[0] },
                { icon: Users, ...cards[1] },
                { icon: Zap, ...cards[2] },
                { icon: Target, ...cards[3] },
              ];
              return withIcons;
            })().map((possibility, index) => {
              const IconComponent = possibility.icon;
              return (
                <Card key={index} className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                  <div className="mb-4 mx-auto w-12 h-12 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center">
                    <IconComponent className="text-accent" size={20} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3 text-[20px]">{possibility?.title}</h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">{possibility?.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How Selection Works */}
      <section className="py-20 surface-1">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('home.selection.title')}</h2>
            <p className="text-lg text-foreground-secondary max-w-2xl mx-auto">
              {t('home.selection.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {(() => {
              const steps = get<any>('home.selection.steps') || [];
              const iconMap = [BookOpen, Users, Target, CheckCircle];
              return steps.map((s: any, i: number) => ({
                step: `${(i+1).toString().padStart(2,'0')}`,
                title: s?.title,
                description: s?.description,
                icon: iconMap[i] || BookOpen,
              }));
            })().map((process: any, index: number) => {
              const IconComponent = process.icon;
              return (
                <Card key={index} className="p-6 surface-2 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="text-lg font-mono font-bold text-primary mb-3">
                        {process.step}
                      </div>
                      <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                        <IconComponent className="text-primary" size={20} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-3">{process?.title}</h3>
                      <p className="text-foreground-secondary leading-relaxed">{process?.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-foreground-secondary mb-6">
              {t('home.selection.closing')}
            </p>
            <Button 
              onClick={() => onNavigate('join')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-glow-copper"
              size="lg"
            >
              {t('home.selection.ctaBegin')}
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}