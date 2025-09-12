import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import gtnLogo from 'figma:asset/7a413933a32971077f976d5901124a6b70ce9581.png';
import { useLanguage } from './i18n/LanguageContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'evo-living', label: t('nav.evoLiving') },
    { id: 'impact', label: t('nav.impact') },
    { id: 'contact', label: t('nav.contact') }
  ];

  return (
    <nav className="bg-ink-800/50 backdrop-blur-xl border-b border-border sticky top-0 z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 group"
            >
              {/* GTN Logo with enhanced styling */}
              <div className="p-2 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:shadow-glow-dark transition-all duration-300">
                <img 
                  src={gtnLogo} 
                  alt="GTN Logo" 
                  className="h-6 w-auto filter brightness-0 invert"
                />
              </div>
              {/* GTN Wordmark */}
              <span className="text-2xl font-bold text-ivory group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'var(--font-headline)' }}>
                GTN
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                  currentPage === item.id
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow-dark'
                    : 'text-foreground-secondary hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20'
                }`}
                style={{ fontFamily: 'var(--font-body)', fontWeight: '500' }}
              >
                <span className="relative z-10">{item.label}</span>
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5"></div>
                )}
              </button>
            ))}
          </div>

          {/* Language Switcher + Primary CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center bg-ink-800 border border-border rounded-lg overflow-hidden">
              {(['en','ru','es'] as const).map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-3 py-2 text-sm uppercase ${
                    lang === code
                      ? 'bg-primary/20 text-primary border-r border-border'
                      : 'text-foreground-secondary hover:text-primary hover:bg-primary/5 border-r border-transparent hover:border-primary/20'
                  }`}
                  aria-pressed={lang === code}
                  aria-label={`Switch language to ${code.toUpperCase()}`}
                >
                  {code}
                </button>
              ))}
            </div>
            <Button 
              onClick={() => onNavigate('join')}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium px-6 shadow-glow-copper hover:shadow-xl transition-all duration-300"
            >
              {t('cta.join')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground-secondary hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/20"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-ink-800/80 backdrop-blur-xl">
            <div className="py-6 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-6 py-4 rounded-lg transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'text-foreground-secondary hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: '500', minHeight: '44px' }}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-6 border-t border-border mt-4">
                {/* Mobile language switcher */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                  {(['en','ru','es'] as const).map((code) => (
                    <button
                      key={code}
                      onClick={() => setLang(code)}
                      className={`px-4 py-2 rounded-lg text-sm uppercase ${
                        lang === code
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-foreground-secondary hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/20'
                      }`}
                    >
                      {code}
                    </button>
                  ))}
                </div>
                <Button 
                  onClick={() => {
                    onNavigate('join');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium shadow-glow-copper"
                  style={{ minHeight: '44px' }}
                >
                  {t('mobile.apply')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}