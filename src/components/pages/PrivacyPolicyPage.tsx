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
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Log Files</h2>
              <p>
                Evolution.Life LLC follows a standard procedure of using log files. These files log visitors when they 
                visit websites. All hosting companies do this and a part of hosting services' analytics. The information 
                collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), 
                date and time stamp, referring/exit pages, and possibly the number of clicks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Cookies and Web Beacons</h2>
              <p>
                Like any other website, Evolution.Life LLC uses 'cookies'. These cookies are used to store information 
                including visitors' preferences, and the pages on the website that the visitor accessed or visited. 
                The information is used to optimize the users' experience by customizing our web page content based on 
                visitors' browser type and/or other information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Third-Party Privacy Policies</h2>
              <p>
                Evolution.Life LLC's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising 
                you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. 
                It may include their practices and instructions about how to opt-out of certain options.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Children's Information</h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage 
                parents and guardians to observe, participate in, and/or monitor and guide their online activity.
              </p>
              
              <p>
                Evolution.Life LLC does not knowingly collect any Personal Identifiable Information from children under 
                the age of 13. If you think that your child provided this kind of information on our website, we strongly 
                encourage you to contact us immediately and we will do our best efforts to promptly remove such information 
                from our records.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access your personal data</li>
                <li>The right to rectification of inaccurate data</li>
                <li>The right to erasure of your data</li>
                <li>The right to restrict processing</li>
                <li>The right to data portability</li>
                <li>The right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "last updated" date.
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
