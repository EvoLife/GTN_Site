import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Mail, MapPin, MessageCircle, Linkedin, Lightbulb } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useState } from 'react';

export function ContactPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  const sendToTelegram = async (type: string, data: any) => {
    const TELEGRAM_BOT_TOKEN = '7608359591:AAHf7uO_sdSblv4Dy3MoDquECHOyxEh8lzA';
    const TELEGRAM_CHAT_ID = '48195187';
    
    let message = '';
    if (type === 'contact') {
      const contacts: string[] = [];
      if (data.telegram) contacts.push(`💬 *Telegram:* ${data.telegram}`);
      if (data.whatsapp) contacts.push(`📱 *WhatsApp:* ${data.whatsapp}`);
      if (data.linkedin) contacts.push(`🔗 *LinkedIn:* ${data.linkedin}`);

      message = `📨 *Новое сообщение через форму контактов*\n\n` +
        `👤 *Имя:* ${data.name}\n` +
        (contacts.length ? contacts.join('\n') + '\n' : '') +
        `📋 *Тема:* ${data.subject}\n\n` +
        `💬 *Сообщение:*\n${data.message}`;
    }

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setValidationError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      telegram: formData.get('telegram'),
      whatsapp: formData.get('whatsapp'),
      linkedin: formData.get('linkedin'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    const hasContact = Boolean((data.telegram && String(data.telegram).trim()) || (data.whatsapp && String(data.whatsapp).trim()) || (data.linkedin && String(data.linkedin).trim()));
    if (!hasContact) {
      setValidationError(t('contact.form.validation.contactRequired'));
      setIsSubmitting(false);
      return;
    }

    try {
      await sendToTelegram('contact', data);
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl mb-4">{t('contact.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>

      {/* Project Proposal Section */}
      <div className="mb-12">
        <Card className="surface-2 border-accent/20 bg-accent/5">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-accent/10 border border-accent/20">
                <Lightbulb className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">{t('contact.proposal.title')}</h3>
                <p className="text-lg text-foreground-secondary leading-relaxed">
                  {t('contact.proposal.description')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Mail className="mb-2 text-primary" size={24} />
              <CardTitle>{t('contact.info.email')}</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="mailto:1@evolution.life" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                1@evolution.life
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageCircle className="mb-2 text-accent" size={24} />
              <CardTitle>{t('contact.info.telegram')}</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="https://t.me/GlobalTalentNation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                @GlobalTalentNation
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Linkedin className="mb-2 text-secondary" size={24} />
              <CardTitle>{t('contact.info.linkedin')}</CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href="https://www.linkedin.com/company/globaltalentnation/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-secondary transition-colors"
              >
                Global Talent Nation
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('contact.form.title')}</CardTitle>
              <CardDescription>
                {t('contact.form.subtitle')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input id="name" name="name" required placeholder={t('contact.form.namePlaceholder')} />
                  </div>
                  <div>
                    <Label>{t('contact.form.hintContact')}</Label>
                    <div className="text-xs text-foreground-tertiary">{t('contact.form.hintContact')}</div>
                  </div>
                </div>

                {/* Contact Methods */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="telegram">{t('contact.form.telegram')}</Label>
                    <Input id="telegram" name="telegram" placeholder={t('contact.form.telegramPlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="whatsapp">{t('contact.form.whatsapp')}</Label>
                    <Input id="whatsapp" name="whatsapp" placeholder={t('contact.form.whatsappPlaceholder')} />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">{t('contact.form.linkedin')}</Label>
                    <Input id="linkedin" name="linkedin" type="url" placeholder={t('contact.form.linkedinPlaceholder')} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">{t('contact.form.subject')}</Label>
                  <Input id="subject" name="subject" required placeholder={t('contact.form.subjectPlaceholder')} />
                </div>

                <div>
                  <Label htmlFor="message">{t('contact.form.message')}</Label>
                  <Textarea 
                    id="message" 
                    name="message"
                    required
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={6}
                  />
                </div>

                {validationError && (
                  <div className="text-amber-700 bg-amber-50 border border-amber-200 rounded p-3 text-sm text-center">
                    {validationError}
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? 'Отправляется...' : t('contact.form.submit')}
                </Button>

                {submitStatus === 'success' && (
                  <div className="text-green-600 text-center">
                    ✅ Сообщение успешно отправлено!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-600 text-center">
                    ❌ Ошибка отправки. Попробуйте еще раз.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}