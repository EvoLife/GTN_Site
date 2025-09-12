export type Lang = 'en' | 'ru' | 'es';

export const translations: Record<Lang, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.evoLiving': 'Evo Living',
    'nav.impact': 'Impact',
    'nav.contact': 'Contact',

    'cta.join': 'Join',
    'mobile.apply': 'Apply',

    'footer.community': 'Community',
    'footer.workImpact': 'Work & Impact',
    'footer.connect': 'Connect',

    'footer.joinGtn': 'Join GTN',
    'footer.evoLiving': 'Evo Living',
    'footer.impactGov': 'Impact & Governance',
    'footer.getInTouch': 'Get in Touch',
    'footer.pressMedia': 'Press & Media',
    'footer.privacyPolicy': 'Privacy Policy',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.evoLiving': 'Evo Living',
    'nav.impact': 'Влияние',
    'nav.contact': 'Контакты',

    'cta.join': 'Вступить',
    'mobile.apply': 'Подать заявку',

    'footer.community': 'Сообщество',
    'footer.workImpact': 'Работа и Влияние',
    'footer.connect': 'Связаться',

    'footer.joinGtn': 'Присоединиться к GTN',
    'footer.evoLiving': 'Evo Living',
    'footer.impactGov': 'Влияние и Управление',
    'footer.getInTouch': 'Связаться с нами',
    'footer.pressMedia': 'Пресса и Медиа',
    'footer.privacyPolicy': 'Политика конфиденциальности',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.evoLiving': 'Evo Living',
    'nav.impact': 'Impacto',
    'nav.contact': 'Contacto',

    'cta.join': 'Unirse',
    'mobile.apply': 'Aplicar',

    'footer.community': 'Comunidad',
    'footer.workImpact': 'Trabajo e Impacto',
    'footer.connect': 'Conectar',

    'footer.joinGtn': 'Unirse a GTN',
    'footer.evoLiving': 'Evo Living',
    'footer.impactGov': 'Impacto y Gobernanza',
    'footer.getInTouch': 'Ponerse en contacto',
    'footer.pressMedia': 'Prensa y Medios',
    'footer.privacyPolicy': 'Política de Privacidad',
  },
};
