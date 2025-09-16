import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            {t('privacy.title')}
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.company')}</h2>
              
              <p>
                {t('privacy.intro1')}
              </p>
              
              <p>
                {t('privacy.intro2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.collect.title')}</h2>
              <p>
                {t('privacy.collect.intro')}
              </p>
              
              <p>{t('privacy.collect.types')}:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.collect.personal')}</li>
                <li>{t('privacy.collect.professional')}</li>
                <li>{t('privacy.collect.communication')}</li>
                <li>{t('privacy.collect.usage')}</li>
                <li>{t('privacy.collect.cookies')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.use.title')}</h2>
              <p>{t('privacy.use.intro')}:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.use.provide')}</li>
                <li>{t('privacy.use.improve')}</li>
                <li>{t('privacy.use.analyze')}</li>
                <li>{t('privacy.use.develop')}</li>
                <li>{t('privacy.use.communicate')}</li>
                <li>{t('privacy.use.process')}</li>
                <li>{t('privacy.use.send')}</li>
                <li>{t('privacy.use.prevent')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.logFiles.title')}</h2>
              <p>
                {t('privacy.logFiles.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.cookies.title')}</h2>
              <p>
                {t('privacy.cookies.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.thirdParty.title')}</h2>
              <p>
                {t('privacy.thirdParty.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.children.title')}</h2>
              <p>
                {t('privacy.children.content1')}
              </p>
              
              <p>
                {t('privacy.children.content2')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.security.title')}</h2>
              <p>
                {t('privacy.security.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.rights.title')}</h2>
              <p>{t('privacy.rights.intro')}</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>{t('privacy.rights.access')}</li>
                <li>{t('privacy.rights.rectification')}</li>
                <li>{t('privacy.rights.erasure')}</li>
                <li>{t('privacy.rights.restrict')}</li>
                <li>{t('privacy.rights.portability')}</li>
                <li>{t('privacy.rights.object')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.changes.title')}</h2>
              <p>
                {t('privacy.changes.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{t('privacy.contact.title')}</h2>
              <p>
                {t('privacy.contact.text')}:
              </p>
              <div className="bg-muted p-4 rounded-lg">
                <p><strong>Evolution.Life LLC</strong></p>
                <p>Email: <a href="mailto:support@evolution.life" className="text-primary hover:underline">support@evolution.life</a></p>
                <p>Phone: <a href="tel:+13232300323" className="text-primary hover:underline">+1 323 230 0323</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
