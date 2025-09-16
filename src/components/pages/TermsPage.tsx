import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export function TermsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-foreground">
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Terms and Conditions for Evolution.Life LLC</h2>
              
              <p>
                These terms and conditions outline the rules and regulations for the use of Evolution.Life LLC's Website, 
                located at https://www.evolution.life and https://gtn.life.
              </p>
              
              <p>
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use 
                Evolution.Life or GTN if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Definitions</h2>
              <p>
                The following terminology applies to these terms and conditions: "Company" (or "we" or "us" or "our") 
                refers to Evolution.Life LLC. "You" refers to the user or viewer of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Evolution.Life's website 
                for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer 
                of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Prohibited Uses</h2>
              <p>You may not use our website:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">User Comments</h2>
              <p>
                Parts of this website offer users an opportunity to post and exchange opinions and information. 
                Evolution.Life LLC does not filter, edit, publish or review Comments prior to their presence on the website. 
                Comments do not reflect the views and opinions of Evolution.Life LLC, its agents, and/or affiliates.
              </p>
              
              <p>By posting Comments, you warrant and represent that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are entitled to post the Comments and have all necessary licenses and consents to do so</li>
                <li>The Comments do not invade any intellectual property right, including copyright, patent or trademark</li>
                <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material</li>
                <li>The Comments will not be used to solicit or promote business or present commercial activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Hyperlinking to our Content</h2>
              <p>The following organizations may link to our Website without prior written approval:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Government agencies</li>
                <li>Search engines</li>
                <li>News organizations</li>
                <li>Online directory distributors</li>
                <li>System wide Accredited Businesses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Disclaimer</h2>
              <p>
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, 
                this Company excludes all representations, warranties, conditions and terms whether express or implied, 
                statutory or otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Limitation of Liability</h2>
              <p>
                In no event shall Evolution.Life LLC, nor any of its officers, directors and employees, be held liable 
                for anything arising out of or in any way connected with your use of this website whether such liability 
                is under contract, tort or otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, 
                to understand our practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Changes to Terms</h2>
              <p>
                Evolution.Life LLC reserves the right to revise these terms at any time as it sees fit, and by using 
                this website, you are expected to review these terms on a regular basis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at:
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
