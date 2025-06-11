import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations
const translations = {
  en: {
    // Navigation
    'nav.services': 'Our Services',
    'nav.universities': 'Universities',
    'nav.blog': 'Blog',
    'nav.about': 'About Us',
    'nav.faq': 'FAQ',
    'nav.apply': 'Apply Now',
    'nav.partner': 'Your Education Partner',
    'nav.backHome': 'Back to Home',

    // Hero Section
    'hero.title1': 'Your journey to studying in',
    'hero.title2': 'North Cyprus',
    'hero.title3': 'begins here',
    'hero.subtitle': 'Guided, simple, and completely free. As certified education agents, we connect you with top universities and provide full support every step of the way, from application to admission.',
    'hero.cta': 'Start Your Application Free',

    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'As an accredited education agency, we provide comprehensive support throughout your academic journey. Our expert team offers complete assistance from application to graduation.',
    'services.accredited': 'Accredited Agency',
    'services.free': '100% Free Service',
    'services.fast': 'Fast Processing',
    'services.note': 'All our services are completely free of charge, as we are official representatives of the universities we work with.',

    'service.consultation.title': 'Free Consultation',
    'service.consultation.desc': 'Book a free session with our advisors to discuss your goals, documents, and study opportunities.',
    'service.admission.title': 'University Admission',
    'service.admission.desc': 'We manage your application and ensure fast acceptance from recognized institutions.',
    'service.airport.title': 'Airport Reception',
    'service.airport.desc': 'Meet-and-greet service at the airport with transportation to your accommodation.',
    'service.housing.title': 'Student Housing',
    'service.housing.desc': 'Assistance in securing suitable on-campus or off-campus accommodation based on your needs.',
    'service.residency.title': 'Residency & Insurance',
    'service.residency.desc': 'We handle your residence permit application and provide health insurance coverage for Cyprus.',
    'service.vip.title': 'VIP Service Packages',
    'service.vip.desc': 'Premium bundles that include full student support, documentation, and priority processing.',

    // Universities Section
    'universities.title': 'Partner Universities',
    'universities.subtitle': 'We specialize in connecting students with top-ranked, internationally recognized universities in North Cyprus.',
    'universities.students': 'Students We Help',
    'universities.partners': 'Partner Universities',
    'universities.acceptance': 'Acceptance Rate',
    'universities.programs': 'Programs',
    'universities.students_count': 'Students',
    'universities.location': 'Location',
    'universities.specialties': 'Specialties',
    'universities.learn_more': 'Learn More',
    'universities.cta_text': 'Ready to start your journey at one of these prestigious universities?',
    'universities.cta_button': 'Apply Now - It\'s Free!',

    // Blog Section
    'blog.title': 'Latest Blog Posts',
    'blog.subtitle': 'Stay updated with the latest insights, tips, and news about studying abroad and university life in North Cyprus.',
    'blog.read_more': 'Read Full Article',
    'blog.view_all': 'View All Blog Posts',
    'blog.most_important': 'Most Important',
    'blog.featured': 'Featured',
    'blog.min_read': 'min read',

    // About Section
    'about.title': 'About Us',
    'about.hero_title': 'Your Trusted Education Partner',
    'about.hero_subtitle': 'Guiding students to achieve their academic dreams',
    'about.description1': 'We are an educational consultancy agency dedicated to helping students achieve their study-abroad goals. Our experienced advisors guide you through every step of your journey — from choosing a university to securing your visa and accommodation.',
    'about.description2': 'We are official representatives of accredited universities in North Cyprus. This status allows us to offer exclusive deals such as free application processing and discounts on tuition.',
    'about.values_title': 'Our Values',
    'about.value1': 'Transparency & honesty in our communication',
    'about.value2': 'Professionalism in every step of the service',
    'about.value3': 'Commitment to providing the best experience',
    'about.value4': 'Student-centered care, ethics, and long-term support',
    'about.licensed': 'Licensed & Certified',
    'about.licensed_desc': 'Official university representatives',

    // FAQ Section
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Get answers to the most common questions about studying in North Cyprus',
    'faq.cta_text': 'Still have questions? We\'re here to help!',
    'faq.cta_button': 'Get Free Consultation',

    'faq.airport.q': 'Do you offer airport pickup?',
    'faq.airport.a': 'Yes, we welcome our students at the airport and drive them safely to their accommodation while assisting with formalities.',
    'faq.exams.q': 'Are TOEFL/IELTS or YÖS exams required?',
    'faq.exams.a': 'No, most North Cyprus universities do not require entrance exams. You can join an English preparatory year if needed.',
    'faq.scholarships.q': 'Are full scholarships available?',
    'faq.scholarships.a': 'No fully funded scholarships are offered, but partial scholarships and tuition discounts are widely available for strong applicants.',
    'faq.best_unis.q': 'Which universities are the best in North Cyprus?',
    'faq.best_unis.a': 'Top recommendations include Near East University, Cyprus International University, Eastern Mediterranean University, and Bahçeşehir Cyprus University.',
    'faq.process_time.q': 'How long does the application process take?',
    'faq.process_time.a': 'The application process typically takes 2 days to 7 working days from submission to acceptance. In some cases, it might take longer depending on the university and program requirements.',

    // Footer
    'footer.tagline': 'Your trusted partner in achieving global education dreams.',
    'footer.quick_links': 'Quick Links',
    'footer.contact_info': 'Contact Info',
    'footer.copyright': '© 2024 EduConsult. All rights reserved.',

    // WhatsApp
    'whatsapp.tooltip': 'Chat with us on WhatsApp!',
    'whatsapp.message': 'Hello! I\'m interested in studying in North Cyprus. Can you help me with more information?',

    // Form - Updated for new 4-step process
    'form.title': 'Let\'s Get You Started!',
    'form.subtitle': 'Just a few quick questions to help us match you with the best academic opportunities and offers. This will only take a minute!',
    'form.personal_info': 'Step 1: Personal Info',
    'form.personal_subtitle': 'To begin, we\'d love to know more about you!',
    'form.academic_goals': 'Step 2: Your Academic Goals',
    'form.academic_subtitle': 'Now let\'s talk about what you want to study.',
    'form.contact_info': 'Step 3: Contact Information',
    'form.contact_subtitle': 'We\'ll need a way to reach out with personalized options.',
    'form.documents': 'Step 4: Required Documents',
    'form.documents_subtitle': 'A few final uploads to complete your application.',
    'form.success': 'All Done!',
    'form.success_message': 'Thank you for submitting your information. Our team will carefully review your application and get in touch with you shortly with the best opportunities for your academic journey.',
    
    'form.full_name': 'What\'s your name?',
    'form.age': 'How old are you?',
    'form.academic_level': 'Which academic level will you pursue?',
    'form.major': 'What major are you interested in?',
    'form.whatsapp': 'Your WhatsApp number:',
    'form.email': 'Your email address:',
    'form.passport': 'Upload your passport (PDF or image):',
    'form.diploma': 'Upload your high school diploma:',
    'form.choose_file': 'Choose File',
    'form.back': 'Back',
    'form.next_step': 'Next Step',
    'form.submit': 'Submit Application',
    'form.close': 'Close',
    
    'form.why_ask': 'Why we ask this:',
    'form.age_reason': 'Your age helps us determine eligibility and tailor options suited to your academic stage.',
    'form.academic_reason': 'Knowing your study preferences allows us to find programs that align with your goals and aspirations.',
    'form.contact_reason': 'We\'ll use this to send you the best offers and guide you through the next steps in your academic journey.',
    'form.documents_reason': 'These documents help us verify your eligibility and speed up the admission process.',
    
    'form.what_next': 'What happens next:',
    'form.review_24h': 'Review your application within 24 hours',
    'form.contact_whatsapp': 'Contact you via WhatsApp',
    'form.present_offers': 'Present the best personalized offers'
  },
  ar: {
    // Navigation
    'nav.services': 'خدماتنا',
    'nav.universities': 'الجامعات',
    'nav.blog': 'المدونة',
    'nav.about': 'من نحن',
    'nav.faq': 'الأسئلة الشائعة',
    'nav.apply': 'قدم الآن',
    'nav.partner': 'شريكك التعليمي',
    'nav.backHome': 'العودة للرئيسية',

    // Hero Section
    'hero.title1': 'رحلتك للدراسة في',
    'hero.title2': 'شمال قبرص',
    'hero.title3': 'تبدأ من هنا',
    'hero.subtitle': 'موجهة وبسيطة ومجانية تماماً. كوكلاء تعليميين معتمدين، نربطك بأفضل الجامعات ونقدم الدعم الكامل في كل خطوة من التقديم حتى القبول.',
    'hero.cta': 'ابدأ طلبك مجاناً',

    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'كوكالة تعليمية معتمدة، نقدم الدعم الشامل طوال رحلتك الأكاديمية. فريقنا المتخصص يقدم المساعدة الكاملة من التقديم حتى التخرج.',
    'services.accredited': 'وكالة معتمدة',
    'services.free': 'خدمة مجانية 100%',
    'services.fast': 'معالجة سريعة',
    'services.note': 'جميع خدماتنا مجانية تماماً، حيث أننا ممثلون رسميون للجامعات التي نتعامل معها.',

    'service.consultation.title': 'استشارة مجانية',
    'service.consultation.desc': 'احجز جلسة مجانية مع مستشارينا لمناقشة أهدافك ووثائقك وفرص الدراسة.',
    'service.admission.title': 'قبول جامعي',
    'service.admission.desc': 'نتولى إدارة طلبك ونضمن القبول السريع من المؤسسات المعترف بها.',
    'service.airport.title': 'استقبال المطار',
    'service.airport.desc': 'خدمة الاستقبال والترحيب في المطار مع النقل إلى مكان الإقامة.',
    'service.housing.title': 'سكن الطلاب',
    'service.housing.desc': 'المساعدة في تأمين سكن مناسب داخل الحرم الجامعي أو خارجه حسب احتياجاتك.',
    'service.residency.title': 'الإقامة والتأمين',
    'service.residency.desc': 'نتولى طلب تصريح الإقامة ونوفر تغطية التأمين الصحي لقبرص.',
    'service.vip.title': 'باقات الخدمة المميزة',
    'service.vip.desc': 'باقات متميزة تشمل الدعم الكامل للطلاب والوثائق والمعالجة ذات الأولوية.',

    // Universities Section
    'universities.title': 'الجامعات الشريكة',
    'universities.subtitle': 'نتخصص في ربط الطلاب بالجامعات المرموقة والمعترف بها دولياً في شمال قبرص.',
    'universities.students': 'الطلاب الذين نساعدهم',
    'universities.partners': 'الجامعات الشريكة',
    'universities.acceptance': 'معدل القبول',
    'universities.programs': 'البرامج',
    'universities.students_count': 'الطلاب',
    'universities.location': 'الموقع',
    'universities.specialties': 'التخصصات',
    'universities.learn_more': 'اعرف المزيد',
    'universities.cta_text': 'مستعد لبدء رحلتك في إحدى هذه الجامعات المرموقة؟',
    'universities.cta_button': 'قدم الآن - مجاناً!',

    // Blog Section
    'blog.title': 'أحدث مقالات المدونة',
    'blog.subtitle': 'ابق على اطلاع بأحدث الرؤى والنصائح والأخبار حول الدراسة في الخارج والحياة الجامعية في شمال قبرص.',
    'blog.read_more': 'اقرأ المقال كاملاً',
    'blog.view_all': 'عرض جميع مقالات المدونة',
    'blog.most_important': 'الأهم',
    'blog.featured': 'مميز',
    'blog.min_read': 'دقيقة قراءة',

    // About Section
    'about.title': 'من نحن',
    'about.hero_title': 'شريكك التعليمي الموثوق',
    'about.hero_subtitle': 'نوجه الطلاب لتحقيق أحلامهم الأكاديمية',
    'about.description1': 'نحن وكالة استشارات تعليمية مكرسة لمساعدة الطلاب على تحقيق أهدافهم في الدراسة بالخارج. مستشارونا ذوو الخبرة يوجهونك خلال كل خطوة من رحلتك - من اختيار الجامعة إلى تأمين التأشيرة والسكن.',
    'about.description2': 'نحن ممثلون رسميون للجامعات المعتمدة في شمال قبرص. هذا المركز يتيح لنا تقديم عروض حصرية مثل معالجة الطلبات المجانية وخصومات على الرسوم الدراسية.',
    'about.values_title': 'قيمنا',
    'about.value1': 'الشفافية والصدق في تواصلنا',
    'about.value2': 'المهنية في كل خطوة من الخدمة',
    'about.value3': 'الالتزام بتقديم أفضل تجربة',
    'about.value4': 'الرعاية المتمحورة حول الطالب والأخلاق والدعم طويل المدى',
    'about.licensed': 'مرخص ومعتمد',
    'about.licensed_desc': 'ممثلون رسميون للجامعات',

    // FAQ Section
    'faq.title': 'الأسئلة الشائعة',
    'faq.subtitle': 'احصل على إجابات لأكثر الأسئلة شيوعاً حول الدراسة في شمال قبرص',
    'faq.cta_text': 'لا تزال لديك أسئلة؟ نحن هنا للمساعدة!',
    'faq.cta_button': 'احصل على استشارة مجانية',

    'faq.airport.q': 'هل تقدمون خدمة استقبال المطار؟',
    'faq.airport.a': 'نعم، نرحب بطلابنا في المطار ونقلهم بأمان إلى مكان إقامتهم مع المساعدة في الإجراءات.',
    'faq.exams.q': 'هل امتحانات TOEFL/IELTS أو YÖS مطلوبة؟',
    'faq.exams.a': 'لا، معظم جامعات شمال قبرص لا تتطلب امتحانات دخول. يمكنك الانضمام لسنة تحضيرية في اللغة الإنجليزية إذا لزم الأمر.',
    'faq.scholarships.q': 'هل تتوفر منح دراسية كاملة؟',
    'faq.scholarships.a': 'لا تُقدم منح دراسية كاملة التمويل، لكن المنح الجزئية وخصومات الرسوم الدراسية متاحة على نطاق واسع للمتقدمين المتميزين.',
    'faq.best_unis.q': 'ما هي أفضل الجامعات في شمال قبرص؟',
    'faq.best_unis.a': 'أهم التوصيات تشمل جامعة الشرق الأدنى، جامعة قبرص الدولية، جامعة شرق البحر المتوسط، وجامعة باهتشه شهير قبرص.',
    'faq.process_time.q': 'كم يستغرق وقت عملية التقديم؟',
    'faq.process_time.a': 'عملية التقديم تستغرق عادة من يومين إلى 7 أيام عمل من التقديم حتى القبول. في بعض الحالات، قد تستغرق وقتاً أطول حسب الجامعة ومتطلبات البرنامج.',

    // Footer
    'footer.tagline': 'شريكك الموثوق في تحقيق أحلام التعليم العالمي.',
    'footer.quick_links': 'روابط سريعة',
    'footer.contact_info': 'معلومات الاتصال',
    'footer.copyright': '© 2024 EduConsult. جميع الحقوق محفوظة.',

    // WhatsApp
    'whatsapp.tooltip': 'تحدث معنا على واتساب!',
    'whatsapp.message': 'مرحباً! أنا مهتم بالدراسة في شمال قبرص. هل يمكنكم مساعدتي بمزيد من المعلومات؟',

    // Form - Updated for new 4-step process
    'form.title': 'هيا نبدأ!',
    'form.subtitle': 'فقط بضعة أسئلة سريعة لمساعدتنا في مطابقتك مع أفضل الفرص الأكاديمية والعروض. لن يستغرق هذا سوى دقيقة!',
    'form.personal_info': 'الخطوة 1: المعلومات الشخصية',
    'form.personal_subtitle': 'للبداية، نود أن نعرف المزيد عنك!',
    'form.academic_goals': 'الخطوة 2: أهدافك الأكاديمية',
    'form.academic_subtitle': 'الآن دعنا نتحدث عما تريد دراسته.',
    'form.contact_info': 'الخطوة 3: معلومات التواصل',
    'form.contact_subtitle': 'سنحتاج إلى طريقة للتواصل معك بخيارات مخصصة.',
    'form.documents': 'الخطوة 4: الوثائق المطلوبة',
    'form.documents_subtitle': 'بضعة تحميلات أخيرة لإكمال طلبك.',
    'form.success': 'تم الانتهاء!',
    'form.success_message': 'شكراً لك على تقديم معلوماتك. سيقوم فريقنا بمراجعة طلبك بعناية والتواصل معك قريباً بأفضل الفرص لرحلتك الأكاديمية.',
    
    'form.full_name': 'ما اسمك؟',
    'form.age': 'كم عمرك؟',
    'form.academic_level': 'ما المستوى الأكاديمي الذي ستتابعه؟',
    'form.major': 'ما التخصص الذي تهتم به؟',
    'form.whatsapp': 'رقم الواتساب الخاص بك:',
    'form.email': 'عنوان بريدك الإلكتروني:',
    'form.passport': 'رفع جواز السفر (PDF أو صورة):',
    'form.diploma': 'رفع شهادة الثانوية العامة:',
    'form.choose_file': 'اختر ملف',
    'form.back': 'رجوع',
    'form.next_step': 'الخطوة التالية',
    'form.submit': 'إرسال الطلب',
    'form.close': 'إغلاق',
    
    'form.why_ask': 'لماذا نسأل عن هذا:',
    'form.age_reason': 'عمرك يساعدنا في تحديد الأهلية وتخصيص الخيارات المناسبة لمرحلتك الأكاديمية.',
    'form.academic_reason': 'معرفة تفضيلاتك الدراسية تتيح لنا العثور على البرامج التي تتماشى مع أهدافك وطموحاتك.',
    'form.contact_reason': 'سنستخدم هذا لإرسال أفضل العروض لك وإرشادك خلال الخطوات التالية في رحلتك الأكاديمية.',
    'form.documents_reason': 'هذه الوثائق تساعدنا في التحقق من أهليتك وتسريع عملية القبول.',
    
    'form.what_next': 'ما يحدث بعد ذلك:',
    'form.review_24h': 'مراجعة طلبك خلال 24 ساعة',
    'form.contact_whatsapp': 'التواصل معك عبر الواتساب',
    'form.present_offers': 'تقديم أفضل العروض المخصصة'
  }
};

// Helper function to get language from URL or localStorage
const getInitialLanguage = (): 'en' | 'ar' => {
  // First check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get('lang') as 'en' | 'ar';
  
  if (langFromUrl && (langFromUrl === 'en' || langFromUrl === 'ar')) {
    return langFromUrl;
  }
  
  // Then check localStorage
  const savedLanguage = localStorage.getItem('language') as 'en' | 'ar';
  if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
    return savedLanguage;
  }
  
  // Default to English
  return 'en';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>(getInitialLanguage);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize language from URL or localStorage
    const initialLang = getInitialLanguage();
    setLanguage(initialLang);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    // Save language preference and update document direction
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update body class for Arabic styling
    if (language === 'ar') {
      document.body.classList.add('arabic');
    } else {
      document.body.classList.remove('arabic');
    }

    // Update URL parameter to maintain language state
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url.toString());
  }, [language, isInitialized]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};