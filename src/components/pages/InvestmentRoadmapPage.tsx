import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Download, 
  ExternalLink, 
  ArrowRight, 
  Target, 
  Rocket, 
  Building, 
  Users,
  Globe,
  Coins,
  HandHeart,
  Briefcase
} from 'lucide-react';

interface InvestmentRoadmapPageProps {
  onNavigate: (page: string) => void;
}

export function InvestmentRoadmapPage({ onNavigate }: InvestmentRoadmapPageProps) {
  const currentMilestones = [
    {
      title: "GTN Passport (live beta)",
      status: "active"
    },
    {
      title: "Talent-matching platform MVP (in development)",
      status: "development"
    },
    {
      title: "Project onboarding and DAO tools",
      status: "development"
    },
    {
      title: "$GTN and $TALENT token frameworks",
      status: "planning"
    },
    {
      title: "Evo Living site planning (Indonesia + Portugal)",
      status: "active"
    },
    {
      title: "Private investor conversations and early ecosystem partners",
      status: "active"
    }
  ];

  const nextPhaseMilestones = [
    {
      title: "Launch of Evo Living pilots (token-integrated community living)",
      impact: "Physical infrastructure foundation"
    },
    {
      title: "Full platform rollout (talent onboarding, project matching, proposal system)",
      impact: "Ecosystem activation"
    },
    {
      title: "Token utility deployment across services and governance",
      impact: "Economic sovereignty"
    },
    {
      title: "Expansion of physical hubs and digital contributor roles",
      impact: "Network effects"
    },
    {
      title: "Legal structuring for land ownership, co-ops, and DAO-based revenue systems",
      impact: "Institutional framework"
    }
  ];

  const visionTimeline = [
    {
      year: "2025",
      milestone: "Platform MVP, onboarding first 1,000 builders, Evo Living sites in development",
      icon: Target
    },
    {
      year: "2026", 
      milestone: "Token utility live, first pilot communities open, internal economy in use",
      icon: Rocket
    },
    {
      year: "2027–2028",
      milestone: "Regional hubs, co-owned projects, first state-level recognition proposals",
      icon: Building
    },
    {
      year: "2030+",
      milestone: "Sovereign infrastructure, living network governance, multi-hub statehood",
      icon: Globe
    }
  ];

  const participationWays = [
    {
      title: "Equity + Token Investment",
      description: "Strategic capital into GTN core org (SAFE or hybrid deals)",
      icon: Coins,
      color: "primary"
    },
    {
      title: "Land & Infrastructure Co-Investment", 
      description: "Shared development of Evo Living pilots and revenue assets",
      icon: Building,
      color: "secondary"
    },
    {
      title: "Ecosystem Partnerships",
      description: "Build tools, launch ventures, or contribute services aligned with GTN's mission",
      icon: Briefcase,
      color: "accent"
    },
    {
      title: "Grant & Philanthropic Support",
      description: "For education, regenerative systems, and long-term public goods",
      icon: HandHeart,
      color: "success"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        icon: 'text-primary',
        text: 'text-primary'
      },
      secondary: {
        bg: 'bg-secondary/10',
        border: 'border-secondary/20',
        icon: 'text-secondary',
        text: 'text-secondary'
      },
      accent: {
        bg: 'bg-accent/10',
        border: 'border-accent/20',
        icon: 'text-accent',
        text: 'text-accent'
      },
      success: {
        bg: 'bg-success-500/10',
        border: 'border-success-500/20',
        icon: 'text-success-500',
        text: 'text-success-500'
      }
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="min-h-screen surface-1">
      {/* Hero Section */}
      <section className="py-16 md:py-24 gradient-brand-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('impact')}
                className="text-ivory/80 hover:text-ivory hover:bg-ivory/10 mb-8"
              >
                <ArrowRight className="mr-2 rotate-180" size={16} />
                Back to Impact & Governance
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl text-ivory mb-6">GTN Investment Roadmap</h1>
            <p className="text-xl text-ivory/90 mb-8 leading-relaxed">
              From platform to planet — building the infrastructure of a purpose-aligned civilization.
            </p>
            <p className="text-lg text-ivory/80 max-w-3xl mx-auto leading-relaxed">
              GTN is building a living ecosystem of talent, projects, and regenerative communities. This roadmap outlines how strategic capital will accelerate our platform, launch physical pilots, and support the evolution toward recognized network-state infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Where We Are Now */}
      <section className="py-20 surface-1">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-4xl">🔹</div>
                <h2 className="text-3xl md:text-4xl text-foreground">Where We Are Now (Q3–Q4 2025)</h2>
              </div>
              <p className="text-xl text-foreground-secondary">Laying the foundation for scale</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentMilestones.map((milestone, index) => (
                <Card key={index} className="surface-2 border-card-border rounded-gtn-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        milestone.status === 'active' ? 'bg-primary/10 border border-primary/20' :
                        milestone.status === 'development' ? 'bg-accent/10 border border-accent/20' :
                        'bg-secondary/10 border border-secondary/20'
                      }`}>
                        <div className={`w-3 h-3 rounded-full ${
                          milestone.status === 'active' ? 'bg-primary animate-pulse' :
                          milestone.status === 'development' ? 'bg-accent' :
                          'bg-secondary'
                        }`}></div>
                      </div>
                      <div className="flex-1">
                        <p className="text-foreground leading-relaxed">{milestone.title}</p>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 text-xs ${
                            milestone.status === 'active' ? 'border-primary text-primary' :
                            milestone.status === 'development' ? 'border-accent text-accent' :
                            'border-secondary text-secondary'
                          }`}
                        >
                          {milestone.status === 'active' ? 'Live' :
                           milestone.status === 'development' ? 'In Development' :
                           'Planning'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next Phase Milestones */}
      <section className="py-20 surface-2">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="text-4xl">🔸</div>
                <h2 className="text-3xl md:text-4xl text-foreground">Next Phase Milestones (Q1–Q4 2026)</h2>
              </div>
              <p className="text-xl text-foreground-secondary">Capital directly enables:</p>
            </div>

            <div className="space-y-6">
              {nextPhaseMilestones.map((milestone, index) => (
                <Card key={index} className="surface-1 border-card-border rounded-gtn-lg">
                  <CardContent className="p-6">
                    <div className="grid lg:grid-cols-3 gap-6 items-center">
                      <div className="lg:col-span-2">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{milestone.title}</h3>
                      </div>
                      <div className="lg:text-right">
                        <Badge variant="outline" className="border-accent text-accent bg-accent/10">
                          {milestone.impact}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision Timeline */}
      <section className="py-20 surface-1">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-foreground mb-6">Vision Timeline</h2>
              <p className="text-xl text-foreground-secondary">Year — Milestone</p>
            </div>

            <div className="space-y-8">
              {visionTimeline.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="surface-2 border-card-border rounded-gtn-lg">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <div className="p-4 rounded-full bg-primary/10 border border-primary/20 flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                            <div className="font-mono text-2xl font-bold text-primary">{item.year}</div>
                            <div className="w-12 h-px bg-border hidden sm:block"></div>
                          </div>
                          <p className="text-lg text-foreground leading-relaxed">{item.milestone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Participate */}
      <section className="py-20 surface-2">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl text-foreground mb-6">Ways to Participate</h2>
              <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
                We welcome aligned partners ready to co-create a purpose-driven economic and social framework.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {participationWays.map((way, index) => {
                const IconComponent = way.icon;
                const colors = getColorClasses(way.color);
                
                return (
                  <Card key={index} className="surface-1 border-card-border rounded-gtn-lg hover:shadow-brand-dark transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-full ${colors.bg} border ${colors.border} flex-shrink-0`}>
                          <IconComponent className={`w-6 h-6 ${colors.icon}`} />
                        </div>
                        <div>
                          <h3 className={`text-xl font-semibold mb-3 ${colors.text}`}>{way.title}</h3>
                          <p className="text-foreground-secondary leading-relaxed">{way.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Support GTN */}
      <section className="py-20 gradient-brand-dark">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-ivory mb-6">Ready to Support GTN?</h2>
            <p className="text-lg text-ivory/80 mb-12 leading-relaxed max-w-2xl mx-auto">
              Serious inquiries only. GTN operates with long-term trust, values alignment, and co-ownership in mind.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 shadow-glow-copper"
              >
                <Download className="mr-2" size={20} />
                Download Investment Deck
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-ivory text-ivory hover:bg-ivory hover:text-ink px-8"
                onClick={() => onNavigate('contact')}
              >
                Become a Strategic Partner
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}