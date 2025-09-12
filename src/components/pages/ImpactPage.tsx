import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Download, ExternalLink, MapPin, Users, Globe, Settings, Handshake } from 'lucide-react';
import { GlobalHubMap } from '../GlobalHubMap';
import { useLanguage } from '../i18n/LanguageContext';

interface ImpactPageProps {
  onNavigate: (page: string) => void;
}

export function ImpactPage({ onNavigate }: ImpactPageProps) {
  const { t, get } = useLanguage();
  const growthPhases = (get<any>('impact.growth.phases') || []) as Array<{phase:string;period:string;title:string;description:string;milestone:string;status:'completed'|'current'|'upcoming'|'future'}>;


  return (
    <div className="min-h-screen surface-1">
      {/* Hero Section */}
      <section className="py-16 md:py-24 surface-2">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-foreground mb-6">{t('impact.hero.title')}</h1>
            <p className="text-xl text-foreground-secondary mb-8">
              {t('impact.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-copper">
                <Download className="mr-2" size={16} />
                {t('impact.hero.buttons.downloadReport')}
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <ExternalLink className="mr-2" size={16} />
                {t('impact.hero.buttons.liveDashboard')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Hub Map Section */}
      <GlobalHubMap />

      {/* GTN Growth Path */}
      <section className="py-20 surface-1">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground mb-6">{t('impact.growth.title')}</h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
              {t('impact.growth.subtitle')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-12">
            {growthPhases.map((phase, index) => (
              <Card key={index} className={`surface-2 border-card-border rounded-gtn-lg overflow-hidden transition-all duration-300 ${
                phase.status === 'current' ? 'border-primary shadow-glow-dark' : ''
              }`}>
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Phase Badge & Timeline */}
                    <div className="flex-shrink-0">
                      <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border ${
                        phase.status === 'completed' ? 'bg-primary/10 border-primary/30 text-primary' :
                        phase.status === 'current' ? 'bg-accent/10 border-accent/30 text-accent' :
                        'bg-muted/10 border-muted/30 text-muted-foreground'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          phase.status === 'completed' ? 'bg-primary' :
                          phase.status === 'current' ? 'bg-accent animate-pulse' :
                          'bg-muted-foreground'
                        }`}></div>
                        <span className="font-mono font-semibold">{phase.phase}</span>
                        <span className="text-sm opacity-80">{phase.period}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-3">{phase.title}</h3>
                        <p className="text-lg text-foreground-secondary leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                      
                      {/* Milestone */}
                      <div className="flex items-start gap-3 bg-surface-3 border border-card-border rounded-lg p-4">
                        <div className="p-2 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                          <span className="text-primary"><MapPin className="text-primary w-4 h-4" /></span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground mb-1">{t('impact.growth.milestoneLabel')}</h4>
                          <p className="text-foreground-secondary">{phase.milestone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex-shrink-0">
                      <Badge 
                        variant={phase.status === 'completed' ? 'default' : 'outline'}
                        className={`${
                          phase.status === 'completed' ? 'bg-primary text-primary-foreground' :
                          phase.status === 'current' ? 'border-accent text-accent bg-accent/10' :
                          'border-muted text-muted-foreground'
                        }`}
                      >
                        {phase.status === 'completed' ? t('impact.growth.statusLabels.completed') :
                         phase.status === 'current' ? t('impact.growth.statusLabels.current') :
                         phase.status === 'upcoming' ? t('impact.growth.statusLabels.upcoming') : t('impact.growth.statusLabels.future')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes GTN a Real Network State? */}
      <section className="py-20 surface-2">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl text-foreground mb-6">{t('impact.networkState.title')}</h2>
            <p className="text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed mb-8">
              {t('impact.networkState.p1')}
            </p>
            <p className="text-lg text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
              {t('impact.networkState.p2')}
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Network State Criteria Grid */}
            <div className="grid gap-6 mb-12">
              {/* Permanent Population */}
              <Card className="surface-1 border-card-border rounded-gtn-lg">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{t('impact.networkState.cards.0.stdTitle')}</h3>
                        <h4 className="text-lg font-medium text-primary mb-3">{t('impact.networkState.cards.0.itemTitle')}</h4>
                        <p className="text-foreground-secondary">{t('impact.networkState.cards.0.stdDesc')}</p>
                      </div>
                    </div>
                    <div className="lg:border-l lg:border-card-border lg:pl-8">
                      <h4 className="text-lg font-medium text-accent mb-3">{t('impact.networkState.cards.0.implTitle')}</h4>
                      <p className="text-foreground-secondary mb-4">{t('impact.networkState.cards.0.implDesc')}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm text-primary font-medium">{t('impact.networkState.cards.0.badge')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Defined Territory */}
              <Card className="surface-1 border-card-border rounded-gtn-lg">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-secondary/10 border border-secondary/20 flex-shrink-0">
                        <Globe className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{t('impact.networkState.cards.1.stdTitle')}</h3>
                        <h4 className="text-lg font-medium text-secondary mb-3">{t('impact.networkState.cards.1.itemTitle')}</h4>
                        <p className="text-foreground-secondary">{t('impact.networkState.cards.1.stdDesc')}</p>
                      </div>
                    </div>
                    <div className="lg:border-l lg:border-card-border lg:pl-8">
                      <h4 className="text-lg font-medium text-accent mb-3">{t('impact.networkState.cards.1.implTitle')}</h4>
                      <p className="text-foreground-secondary mb-4">{t('impact.networkState.cards.1.implDesc')}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm text-secondary font-medium">{t('impact.networkState.cards.1.badge')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Governing Structure */}
              <Card className="surface-1 border-card-border rounded-gtn-lg">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-accent/10 border border-accent/20 flex-shrink-0">
                        <Settings className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{t('impact.networkState.cards.2.stdTitle')}</h3>
                        <h4 className="text-lg font-medium text-accent mb-3">{t('impact.networkState.cards.2.itemTitle')}</h4>
                        <p className="text-foreground-secondary">{t('impact.networkState.cards.2.stdDesc')}</p>
                      </div>
                    </div>
                    <div className="lg:border-l lg:border-card-border lg:pl-8">
                      <h4 className="text-lg font-medium text-accent mb-3">{t('impact.networkState.cards.2.implTitle')}</h4>
                      <p className="text-foreground-secondary mb-4">{t('impact.networkState.cards.2.implDesc')}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                        <span className="text-sm text-accent font-medium">{t('impact.networkState.cards.2.badge')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Capacity for Diplomacy */}
              <Card className="surface-1 border-card-border rounded-gtn-lg">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-full bg-success-500/10 border border-success-500/20 flex-shrink-0">
                        <Handshake className="w-6 h-6 text-success-500" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{t('impact.networkState.cards.3.stdTitle')}</h3>
                        <h4 className="text-lg font-medium text-success-500 mb-3">{t('impact.networkState.cards.3.itemTitle')}</h4>
                        <p className="text-foreground-secondary">{t('impact.networkState.cards.3.stdDesc')}</p>
                      </div>
                    </div>
                    <div className="lg:border-l lg:border-card-border lg:pl-8">
                      <h4 className="text-lg font-medium text-accent mb-3">{t('impact.networkState.cards.3.implTitle')}</h4>
                      <p className="text-foreground-secondary mb-4">{t('impact.networkState.cards.3.implDesc')}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                        <span className="text-sm text-success-500 font-medium">{t('impact.networkState.cards.3.badge')}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-8">{t('impact.cta.title')}</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
                <Button 
                  variant="default"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-dark"
                  size="lg"
                >
                  <ExternalLink className="mr-2" size={16} />
                  {t('impact.cta.buttons.visionDeck')}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground shadow-glow-copper"
                  size="lg"
                  onClick={() => onNavigate('investment-roadmap')}
                >
                  <ExternalLink className="mr-2" size={16} />
                  {t('impact.cta.buttons.investmentRoadmap')}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground shadow-brand-dark"
                  size="lg"
                >
                  <ExternalLink className="mr-2" size={16} />
                  {t('impact.cta.buttons.partnership')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-20 gradient-brand-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-ivory mb-6">{t('impact.downloads.title')}</h2>
            <p className="text-xl text-ivory/80 mb-8">
              {t('impact.downloads.subtitle')}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">

              
              <Button 
                variant="outline" 
                className="border-ivory text-ivory hover:bg-ivory hover:text-ink p-6 h-auto flex-col"
              >
                <Download className="mb-2" size={24} />
                <span className="font-semibold">{t('impact.downloads.items.0.title')}</span>
                <span className="text-xs opacity-70">{t('impact.downloads.items.0.subtitle')}</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="border-ivory text-ivory hover:bg-ivory hover:text-ink p-6 h-auto flex-col"
              >
                <Download className="mb-2" size={24} />
                <span className="font-semibold">{t('impact.downloads.items.1.title')}</span>
                <span className="text-xs opacity-70">{t('impact.downloads.items.1.subtitle')}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}