import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Check, Users, Building2, BarChart3, Target, Clock, MessageSquare, Bot, Search, Wrench, HandHeart, Rocket, Home, Vote, Play } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useState, useRef } from 'react';

export function JoinPage() {
  const { t, get } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Video state management
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const sendToTelegram = async (type: string, data: any) => {
    let message = '';
    if (type === 'application') {
      const contacts: string[] = [];
      if (data.telegram) contacts.push(`Telegram: ${data.telegram}`);
      if (data.whatsapp) contacts.push(`WhatsApp: ${data.whatsapp}`);
      if (data.linkedin) contacts.push(`LinkedIn: ${data.linkedin}`);

      message = `New GTN application\n\n` +
        `Name: ${data.firstName} ${data.lastName}\n` +
        (contacts.length ? contacts.join('\n') + '\n' : '') +
        `Location: ${data.location}\n` +
        `Role: ${data.role}\n` +
        `Portfolio: ${data.portfolio ? (data.portfolio.startsWith('http') ? data.portfolio : `https://${data.portfolio}`) : 'Not provided'}\n` +
        (data.referral && String(data.referral).trim() ? `Referred by: ${data.referral}\n` : '') +
        `\nWhat they want to build:\n${data.build}\n\n` +
        `How they will contribute:\n${data.contribute}\n\n` +
        `Why GTN:\n${data.why}`;
    }

    // Используем Vercel API routes для отправки через серверную функцию
    const response = await fetch('/api/send-telegram', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        type: type
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || 'Unknown error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setValidationError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      location: formData.get('location'),
      role: formData.get('role'),
      portfolio: formData.get('portfolio'),
      build: formData.get('build'),
      contribute: formData.get('contribute'),
      why: formData.get('why'),
      telegram: formData.get('telegram'),
      whatsapp: formData.get('whatsapp'),
      linkedin: formData.get('linkedin'),
      referral: formData.get('referral'),
    };

    // Validate at least one contact method
    const hasContact = Boolean((data.telegram && String(data.telegram).trim()) || (data.whatsapp && String(data.whatsapp).trim()) || (data.linkedin && String(data.linkedin).trim()));
    if (!hasContact) {
      setValidationError(t('join.form.validation.contactRequired'));
      setIsSubmitting(false);
      return;
    }

    try {
      await sendToTelegram('application', data);
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const inviteCards = get<any>('join.invite.cards') || [];
  const inviteTypes = inviteCards.map((c: any) => ({ title: c?.title, description: c?.desc }));

  const ecosystemToolsData = get<any>('join.ecosystem.tools') || [];
  const ecosystemTools = [
    { icon: Users, title: ecosystemToolsData[0]?.title, subtitle: ecosystemToolsData[0]?.subtitle, description: ecosystemToolsData[0]?.desc },
    { icon: Building2, title: ecosystemToolsData[1]?.title, subtitle: ecosystemToolsData[1]?.subtitle, description: ecosystemToolsData[1]?.desc },
    { icon: BarChart3, title: ecosystemToolsData[2]?.title, subtitle: ecosystemToolsData[2]?.subtitle, description: ecosystemToolsData[2]?.desc },
  ];

  const timeline = (get<any>('join.selection.timeline') || []).map((i: any) => ({ step: i?.step, time: i?.time, description: i?.desc }));

  return (
    <div className="min-h-screen surface-1">
      {/* Hero Section */}
      <section className="py-16 md:py-24 surface-2">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-foreground mb-6">{t('join.hero.title')}</h1>
            <p className="text-xl text-foreground-secondary mb-8">
              {t('join.hero.subtitle')}
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
              <a 
                href="#apply"
                className="text-sm text-primary font-medium hover:text-primary-light transition-colors duration-200"
              >
                {t('join.hero.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 surface-1">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-surface-2 rounded-gtn-lg overflow-hidden shadow-brand-dark border border-card-border">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  src="https://elhcqyzbqyfwewemhfwh.supabase.co/storage/v1/object/public/GTN/GTN%20Life%20Client%20Journey.mp4"
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
                      aria-label="Play GTN video"
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-ivory ml-1" />
                      
                      {/* Pulse animation rings */}
                      <div className="absolute inset-0 rounded-full bg-ivory/20 animate-ping"></div>
                      <div className="absolute inset-0 rounded-full bg-ivory/10 animate-pulse"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Invite */}
      <section className="py-16 surface-1">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-foreground mb-4">{t('join.invite.title')}</h2>
              <p className="text-xl text-foreground-secondary">
                {t('join.invite.subtitle')}
              </p>
            </div>

            {/* First row - 2 cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {inviteTypes.slice(0, 2).map((type, index) => (
                <Card key={index} className="p-8 surface-2 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                    <p className="text-foreground-secondary leading-relaxed">{type.description}</p>
                  </div>
                </Card>
              ))}
            </div>
            
            {/* Second row - 3 cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {inviteTypes.slice(2, 5).map((type, index) => (
                <Card key={index + 2} className="p-8 surface-2 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{type.title}</h3>
                    <p className="text-foreground-secondary leading-relaxed">{type.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Possibilities - What You Get */}
      <section className="py-20 surface-2">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-foreground mb-6">{t('join.possibilities.title')}</h2>
              <p className="text-xl text-foreground-secondary mb-8">
                {t('join.possibilities.subtitle')}
              </p>
            </div>

            {/* Three Equal Sections */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              
              {/* 1. Inside GTN, You Get Access To */}
              <Card className="p-8 surface-1 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-primary" size={32} />
                  </div>
                  <h3 className="text-[28px] leading-tight text-foreground mb-4 text-center max-w-[240px] mx-auto">{t('join.possibilities.inside.title')}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.inside.clarity.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.inside.clarity.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.inside.collab.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.inside.collab.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.inside.projects.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.inside.projects.desc')}</p>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-primary font-medium text-center">{t('join.possibilities.inside.cta')}</p>
                </div>
              </Card>

              {/* 2. A Personalized Growth System */}
              <Card className="p-8 surface-1 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="text-primary" size={32} />
                  </div>
                  <h3 className="text-[28px] leading-tight text-foreground mb-4 text-center max-w-[220px] mx-auto">{t('join.possibilities.growth.title')}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.growth.aiMentor.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.growth.aiMentor.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.growth.matching.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.growth.matching.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.growth.evolution.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.growth.evolution.desc')}</p>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                  <p className="text-accent font-medium text-center">{t('join.possibilities.growth.cta')}</p>
                </div>
              </Card>

              {/* 3. Opportunity to Contribute */}
              <Card className="p-8 surface-1 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HandHeart className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl md:text-2xl text-foreground mb-4 text-[28px]">{t('join.possibilities.contribute.title')}</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.contribute.cocreate.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.contribute.cocreate.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.contribute.ownership.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.contribute.ownership.desc')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">{t('join.possibilities.contribute.impact.title')}</h4>
                    <p className="text-foreground-secondary text-sm">{t('join.possibilities.contribute.impact.desc')}</p>
                  </div>
                </div>

                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="text-ivory font-medium text-center">{t('join.possibilities.contribute.cta')}</p>
                </div>
              </Card>
            </div>

            {/* Summary Statement - HIDDEN */}
            {false && (
            <div className="text-center">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-gtn-lg p-8 max-w-4xl mx-auto">
                <p className="text-xl text-foreground-secondary leading-relaxed mb-4">{t('join.possibilities.summary.l1')}</p>
                <p className="text-2xl text-primary font-semibold">{t('join.possibilities.summary.l2')}</p>
              </div>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Ecosystem Tools - HIDDEN */}
      {false && (
      <section className="py-20 surface-1">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-foreground mb-6">{t('join.ecosystem.title')}</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {ecosystemTools.map((tool, index) => {
                const IconComponent = tool.icon;
                return (
                  <Card key={index} className="p-8 surface-2 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                    <div className="text-center mb-6">
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                          <IconComponent className="text-primary" size={32} />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{tool.title}</h3>
                        <p className="text-primary font-medium mb-3">{tool.subtitle}</p>
                        <p className="text-foreground-secondary leading-relaxed">{tool.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center">
              <p className="text-foreground-secondary text-lg italic">{t('join.ecosystem.note')}</p>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* What You Step Into */}
      <section className="py-20 surface-2">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl text-foreground mb-6">{t('join.stepInto.title')}</h2>
              <p className="text-xl text-foreground-secondary">
                {t('join.stepInto.subtitle')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <Card className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                    <Search className="text-primary" size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{t('join.stepInto.cards.0.title')}</h3>
                <p className="text-sm text-foreground-secondary">{t('join.stepInto.cards.0.desc')}</p>
              </Card>

              <Card className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                    <Wrench className="text-primary" size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{t('join.stepInto.cards.1.title')}</h3>
                <p className="text-sm text-foreground-secondary">{t('join.stepInto.cards.1.desc')}</p>
              </Card>

              <Card className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                    <HandHeart className="text-primary" size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{t('join.stepInto.cards.2.title')}</h3>
                <p className="text-sm text-foreground-secondary">{t('join.stepInto.cards.2.desc')}</p>
              </Card>

              <Card className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                    <Rocket className="text-primary" size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{t('join.stepInto.cards.3.title')}</h3>
                <p className="text-sm text-foreground-secondary">{t('join.stepInto.cards.3.desc')}</p>
              </Card>

              <Card className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                    <Home className="text-primary" size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{t('join.stepInto.cards.4.title')}</h3>
                <p className="text-sm text-foreground-secondary">{t('join.stepInto.cards.4.desc')}</p>
              </Card>

              <Card className="p-6 surface-1 border-card-border rounded-gtn-lg text-center hover:shadow-brand-dark transition-all duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-full flex items-center justify-center">
                    <Vote className="text-primary" size={24} />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-3">{t('join.stepInto.cards.5.title')}</h3>
                <p className="text-sm text-foreground-secondary">{t('join.stepInto.cards.5.desc')}</p>
              </Card>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-gtn-lg p-8">
                <p className="text-xl text-foreground-secondary leading-relaxed mb-4">{t('join.stepInto.summary.l1')}</p>
                <p className="text-2xl text-primary font-semibold">{t('join.stepInto.summary.l2')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Selection Works - Minimal */}
      <section className="py-12 surface-1">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl text-foreground mb-2">{t('join.selection.title')}</h2>
              <p className="text-foreground-secondary">{t('join.selection.subtitle')}</p>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-border"></div>
              
              <div className="grid md:grid-cols-5 gap-6 relative">
                {timeline.map((item, index) => (
                  <div key={index} className="text-center relative">
                    {/* Step circle */}
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm mx-auto mb-4 relative z-10 border-4 border-surface-1">
                      {index + 1}
                    </div>
                    
                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground text-sm">{item.step}</h3>
                      <div className="flex items-center justify-center">
                        <Badge variant="outline" className="text-xs border-foreground-tertiary text-foreground-tertiary">
                          <Clock size={10} className="mr-1" />
                          {item.time}
                        </Badge>
                      </div>
                      <p className="text-xs text-foreground-secondary leading-snug">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 surface-2" id="apply">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="surface-1 border-card-border rounded-gtn-lg shadow-brand-dark">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-foreground">{t('join.form.title')}</CardTitle>
                <CardDescription className="text-foreground-secondary">{t('join.form.subtitle')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground">{t('join.form.labels.firstName')}</Label>
                    <Input 
                      id="firstName" 
                      name="firstName"
                      placeholder={t('join.form.placeholders.firstName')}
                      className="mt-1 surface-2 border-input-border focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-foreground">{t('join.form.labels.lastName')}</Label>
                    <Input 
                      id="lastName" 
                      name="lastName"
                      placeholder={t('join.form.placeholders.lastName')}
                      className="mt-1 surface-2 border-input-border focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="telegram" className="text-foreground">{t('join.form.labels.telegram')}</Label>
                    <Input
                      id="telegram"
                      name="telegram"
                      placeholder={t('join.form.placeholders.telegram')}
                      className="mt-1 surface-2 border-input-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp" className="text-foreground">{t('join.form.labels.whatsapp')}</Label>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      placeholder={t('join.form.placeholders.whatsapp')}
                      className="mt-1 surface-2 border-input-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin" className="text-foreground">{t('join.form.labels.linkedin')}</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      type="url"
                      placeholder={t('join.form.placeholders.linkedin')}
                      className="mt-1 surface-2 border-input-border focus:border-primary"
                    />
                  </div>
                </div>
                {/* Removed duplicate hintContact text per request */}

                <div>
                  <Label htmlFor="location" className="text-foreground">{t('join.form.labels.location')}</Label>
                  <Input 
                    id="location" 
                    name="location"
                    placeholder={t('join.form.placeholders.location')}
                    className="mt-1 surface-2 border-input-border focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-foreground">{t('join.form.labels.role')}</Label>
                  <Input 
                    id="role" 
                    name="role"
                    placeholder={t('join.form.placeholders.role')}
                    className="mt-1 surface-2 border-input-border focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio" className="text-foreground">{t('join.form.labels.portfolio')}</Label>
                  <Input 
                    id="portfolio" 
                    name="portfolio"
                    placeholder={t('join.form.placeholders.portfolio')}
                    className="mt-1 surface-2 border-input-border focus:border-primary"
                  />
                </div>

                <Separator className="bg-card-border" />

                <div>
                  <Label htmlFor="build" className="text-foreground">{t('join.form.labels.build')}</Label>
                  <Textarea 
                    id="build" 
                    name="build"
                    placeholder={t('join.form.placeholders.build')}
                    rows={4}
                    className="mt-1 surface-2 border-input-border focus:border-primary resize-none"
                    required
                  />
                  <p className="text-xs text-foreground-tertiary mt-1">{t('join.form.hint')}</p>
                </div>

                <div>
                  <Label htmlFor="contribute" className="text-foreground">{t('join.form.labels.contribute')}</Label>
                  <Textarea 
                    id="contribute" 
                    name="contribute"
                    placeholder={t('join.form.placeholders.contribute')}
                    rows={3}
                    className="mt-1 surface-2 border-input-border focus:border-primary resize-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="why" className="text-foreground">{t('join.form.labels.why')}</Label>
                  <Textarea 
                    id="why" 
                    name="why"
                    placeholder={t('join.form.placeholders.why')}
                    rows={3}
                    className="mt-1 surface-2 border-input-border focus:border-primary resize-none"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="referral" className="text-foreground">{t('join.form.labels.referral')}</Label>
                  <Input 
                    id="referral" 
                    name="referral"
                    placeholder={t('join.form.placeholders.referral')}
                    className="mt-1 surface-2 border-input-border focus:border-primary"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm font-medium">
                      {t('join.form.messages.success')}
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm font-medium">
                      {t('join.form.messages.error')}
                    </p>
                  </div>
                )}

                {validationError && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-amber-800 text-sm font-medium">{validationError}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 shadow-glow-copper disabled:opacity-50"
                  style={{ minHeight: '44px' }}
                >
                  {isSubmitting ? t('join.form.messages.submitting') : t('join.form.submit')}
                </Button>

                <div className="text-center pt-4">
                  <p className="text-sm text-foreground-secondary">{t('join.form.disclaimer')}</p>
                </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}