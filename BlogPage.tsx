import React, { useState, useRef } from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar, User, Clock, ArrowLeft, Eye } from 'lucide-react';
import Navigation from '../components/Navigation';
import WhatsAppButton from '../components/WhatsAppButton';
import { useLanguage } from '../contexts/LanguageContext';

// Blog categories with Arabic translations
const blogCategories = [
  {
    id: 'all',
    name: 'All Posts',
    nameAr: 'جميع المقالات',
    icon: '📚',
    color: 'from-bright-blue to-purple'
  },
  {
    id: 'life-in-cyprus',
    name: 'Life in Cyprus',
    nameAr: 'الحياة في قبرص',
    icon: '🏝️',
    color: 'from-blue-400 to-cyan-500',
    topic: 'Cost of living (rent, food, transportation)',
    topicAr: 'تكلفة المعيشة (الإيجار، الطعام، المواصلات)'
  },
  {
    id: 'universities',
    name: 'Universities in Cyprus',
    nameAr: 'الجامعات في قبرص',
    icon: '🎓',
    color: 'from-purple-500 to-pink-500',
    topic: 'List of top universities in Cyprus',
    topicAr: 'قائمة أفضل الجامعات في قبرص'
  },
  {
    id: 'registration',
    name: 'Student Registration & Admission',
    nameAr: 'تسجيل الطلاب والقبول',
    icon: '📝',
    color: 'from-green-500 to-emerald-500',
    topic: 'Step-by-step registration guide',
    topicAr: 'دليل التسجيل خطوة بخطوة'
  },
  {
    id: 'academics',
    name: 'Academics & Programs',
    nameAr: 'الأكاديميات والبرامج',
    icon: '📖',
    color: 'from-orange-500 to-red-500',
    topic: 'Most popular study programs',
    topicAr: 'أشهر البرامج الدراسية'
  },
  {
    id: 'support',
    name: 'Student Support & Services',
    nameAr: 'دعم الطلاب والخدمات',
    icon: '🤝',
    color: 'from-indigo-500 to-blue-600',
    topic: 'Housing support for students',
    topicAr: 'دعم السكن للطلاب'
  },
  {
    id: 'work',
    name: 'Work & Career Opportunities',
    nameAr: 'فرص العمل والمهنة',
    icon: '💼',
    color: 'from-yellow-500 to-orange-500',
    topic: 'Part-time jobs for students',
    topicAr: 'وظائف بدوام جزئي للطلاب'
  },
  {
    id: 'events',
    name: 'Events & Experiences',
    nameAr: 'الفعاليات والتجارب',
    icon: '🎉',
    color: 'from-pink-500 to-rose-500',
    topic: 'Upcoming student events and festivals',
    topicAr: 'فعاليات ومهرجانات الطلاب القادمة'
  },
  {
    id: 'settling',
    name: 'Settling In',
    nameAr: 'الاستقرار',
    icon: '🏠',
    color: 'from-teal-500 to-cyan-500',
    topic: 'How to open a bank account',
    topicAr: 'كيفية فتح حساب مصرفي'
  }
];

// Blog posts with Arabic translations
const allBlogPosts = [
  {
    id: '1',
    title: 'Complete Guide to Cost of Living in North Cyprus',
    titleAr: 'دليل شامل لتكلفة المعيشة في شمال قبرص',
    excerpt: 'Detailed breakdown of monthly expenses including rent, food, transportation, and entertainment for international students.',
    excerptAr: 'تفصيل مفصل للمصروفات الشهرية بما في ذلك الإيجار والطعام والمواصلات والترفيه للطلاب الدوليين.',
    content: 'Living in North Cyprus as an international student is surprisingly affordable compared to many European destinations...',
    contentAr: 'العيش في شمال قبرص كطالب دولي ميسور التكلفة بشكل مدهش مقارنة بالعديد من الوجهات الأوروبية...',
    author: 'Maria Santos',
    authorAr: 'ماريا سانتوس',
    date: '2024-01-20',
    dateAr: '20 يناير 2024',
    readTime: '12 min read',
    readTimeAr: '12 دقيقة قراءة',
    category: 'life-in-cyprus',
    image: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 2847
  },
  {
    id: '2',
    title: 'Top 10 Universities in North Cyprus: Complete Rankings 2024',
    titleAr: 'أفضل 10 جامعات في شمال قبرص: التصنيف الكامل 2024',
    excerpt: 'Comprehensive ranking of the best universities in North Cyprus based on academic excellence, facilities, and student satisfaction.',
    excerptAr: 'تصنيف شامل لأفضل الجامعات في شمال قبرص بناءً على التميز الأكاديمي والمرافق ورضا الطلاب.',
    content: 'North Cyprus hosts some of the most prestigious universities in the Eastern Mediterranean region...',
    contentAr: 'تستضيف شمال قبرص بعض أعرق الجامعات في منطقة شرق البحر المتوسط...',
    author: 'Dr. Elena Petrov',
    authorAr: 'د. إيلينا بيتروف',
    date: '2024-01-15',
    dateAr: '15 يناير 2024',
    readTime: '15 min read',
    readTimeAr: '15 دقيقة قراءة',
    category: 'universities',
    image: 'https://images.pexels.com/photos/5428836/pexels-photo-5428836.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 4521
  },
  {
    id: '3',
    title: 'Step-by-Step University Application Guide for North Cyprus',
    titleAr: 'دليل التقديم للجامعة خطوة بخطوة لشمال قبرص',
    excerpt: 'Complete walkthrough of the application process, required documents, deadlines, and tips for success.',
    excerptAr: 'شرح كامل لعملية التقديم والوثائق المطلوبة والمواعيد النهائية ونصائح للنجاح.',
    content: 'Applying to universities in North Cyprus is straightforward when you know the process...',
    contentAr: 'التقديم للجامعات في شمال قبرص أمر مباشر عندما تعرف العملية...',
    author: 'Sarah Johnson',
    authorAr: 'سارة جونسون',
    date: '2024-01-10',
    dateAr: '10 يناير 2024',
    readTime: '14 min read',
    readTimeAr: '14 دقيقة قراءة',
    category: 'registration',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 5234
  },
  {
    id: '4',
    title: 'Most Popular Study Programs in North Cyprus Universities',
    titleAr: 'أشهر البرامج الدراسية في جامعات شمال قبرص',
    excerpt: 'Discover the top academic programs that attract international students and their career prospects.',
    excerptAr: 'اكتشف أهم البرامج الأكاديمية التي تجذب الطلاب الدوليين وآفاقها المهنية.',
    content: 'North Cyprus universities offer a wide range of programs, but some stand out for their quality and popularity...',
    contentAr: 'تقدم جامعات شمال قبرص مجموعة واسعة من البرامج، لكن بعضها يبرز لجودته وشعبيته...',
    author: 'Dr. Fatma Özkan',
    authorAr: 'د. فاطمة أوزكان',
    date: '2024-01-05',
    dateAr: '5 يناير 2024',
    readTime: '11 min read',
    readTimeAr: '11 دقيقة قراءة',
    category: 'academics',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 3789
  },
  {
    id: '5',
    title: 'Complete Guide to Student Housing in North Cyprus',
    titleAr: 'دليل شامل لسكن الطلاب في شمال قبرص',
    excerpt: 'Everything about on-campus dormitories, off-campus apartments, and how to secure the best accommodation.',
    excerptAr: 'كل شيء عن المساكن الجامعية والشقق خارج الحرم الجامعي وكيفية تأمين أفضل سكن.',
    content: 'Finding suitable housing is one of the first challenges international students face...',
    contentAr: 'العثور على سكن مناسب هو أحد التحديات الأولى التي يواجهها الطلاب الدوليون...',
    author: 'Lisa Rodriguez',
    authorAr: 'ليزا رودريغيز',
    date: '2024-01-01',
    dateAr: '1 يناير 2024',
    readTime: '16 min read',
    readTimeAr: '16 دقيقة قراءة',
    category: 'support',
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 4123
  },
  {
    id: '6',
    title: 'Part-time Job Opportunities for Students in North Cyprus',
    titleAr: 'فرص العمل بدوام جزئي للطلاب في شمال قبرص',
    excerpt: 'Legal requirements, popular job sectors, and tips for finding part-time work while studying.',
    excerptAr: 'المتطلبات القانونية وقطاعات العمل الشائعة ونصائح للعثور على عمل بدوام جزئي أثناء الدراسة.',
    content: 'Many international students seek part-time employment to support their studies and gain experience...',
    contentAr: 'يسعى العديد من الطلاب الدوليين للحصول على عمل بدوام جزئي لدعم دراستهم واكتساب الخبرة...',
    author: 'Carlos Mendez',
    authorAr: 'كارلوس مينديز',
    date: '2023-12-25',
    dateAr: '25 ديسمبر 2023',
    readTime: '10 min read',
    readTimeAr: '10 دقائق قراءة',
    category: 'work',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 3456
  },
  {
    id: '7',
    title: 'Student Events and Festivals in North Cyprus: 2024 Calendar',
    titleAr: 'فعاليات ومهرجانات الطلاب في شمال قبرص: تقويم 2024',
    excerpt: 'Complete guide to cultural events, festivals, and student activities throughout the academic year.',
    excerptAr: 'دليل شامل للفعاليات الثقافية والمهرجانات وأنشطة الطلاب طوال العام الأكاديمي.',
    content: 'North Cyprus offers a vibrant calendar of events and festivals that enrich the student experience...',
    contentAr: 'تقدم شمال قبرص تقويماً نابضاً بالحياة من الفعاليات والمهرجانات التي تثري تجربة الطلاب...',
    author: 'Sophia Papadopoulos',
    authorAr: 'صوفيا بابادوبولوس',
    date: '2023-12-20',
    dateAr: '20 ديسمبر 2023',
    readTime: '12 min read',
    readTimeAr: '12 دقيقة قراءة',
    category: 'events',
    image: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 2789
  },
  {
    id: '8',
    title: 'How to Open a Bank Account in North Cyprus as a Student',
    titleAr: 'كيفية فتح حساب مصرفي في شمال قبرص كطالب',
    excerpt: 'Step-by-step guide to opening a bank account, required documents, and best banks for students.',
    excerptAr: 'دليل خطوة بخطوة لفتح حساب مصرفي والوثائق المطلوبة وأفضل البنوك للطلاب.',
    content: 'Opening a bank account is one of the first practical steps for international students...',
    contentAr: 'فتح حساب مصرفي هو أحد الخطوات العملية الأولى للطلاب الدوليين...',
    author: 'Jennifer Park',
    authorAr: 'جينيفر بارك',
    date: '2023-12-15',
    dateAr: '15 ديسمبر 2023',
    readTime: '6 min read',
    readTimeAr: '6 دقائق قراءة',
    category: 'settling',
    image: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    views: 4567
  }
];

const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { language, t } = useLanguage();

  // Filter posts based on selected category and search term
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const title = language === 'ar' ? post.titleAr : post.title;
    const excerpt = language === 'ar' ? post.excerptAr : post.excerpt;
    const author = language === 'ar' ? post.authorAr : post.author;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Language-aware scroll functions
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      // In Arabic (RTL), "left" button should scroll right in the container
      const direction = language === 'ar' ? scrollAmount : -scrollAmount;
      scrollContainerRef.current.scrollBy({ left: direction, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      // In Arabic (RTL), "right" button should scroll left in the container
      const direction = language === 'ar' ? -scrollAmount : scrollAmount;
      scrollContainerRef.current.scrollBy({ left: direction, behavior: 'smooth' });
    }
  };

  const handleReadMore = (postId: string) => {
    console.log('Navigate to post:', postId);
  };

  return (
    <div className={`bg-off-white text-dark-blue min-h-screen ${language === 'ar' ? 'font-arabic' : ''}`}>
      {/* Navigation */}
      <Navigation onOpenForm={() => setIsFormOpen(true)} />

      {/* Blog Header */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-br from-off-white via-light-cyan/20 to-off-white">
        <div className="max-w-6xl mx-auto text-center">
          <button
            onClick={() => window.location.href = `/?lang=${language}`}
            className={`inline-flex items-center text-bright-blue hover:text-purple transition-colors duration-300 mb-6 group ${language === 'ar' ? 'font-arabic flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300 ${language === 'ar' ? 'ml-2 transform scale-x-[-1]' : 'mr-2'}`} />
            {t('nav.backHome')}
          </button>
          
          <h1 className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('blog.title').split(' ')[0]} <span className="bg-gradient-to-r from-bright-blue to-purple bg-clip-text text-transparent">{t('blog.title').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className={`text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 ${language === 'ar' ? 'font-arabic allow-wrap' : ''}`}>
            {t('blog.subtitle')}
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${language === 'ar' ? 'right-4' : 'left-4'}`} />
              <input
                type="text"
                placeholder={language === 'ar' ? 'البحث في مقالات المدونة...' : 'Search blog posts...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full py-3 sm:py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-xl text-dark-blue placeholder-gray-400 focus:border-bright-blue focus:ring-4 focus:ring-bright-blue/20 transition-all outline-none text-center ${language === 'ar' ? 'font-arabic pr-12 pl-4' : 'pl-12 pr-4'}`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scrolling Categories */}
      <section className="py-6 sm:py-8 px-4 bg-white/50 backdrop-blur-sm border-y border-gray-200/50">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Left Scroll Button - Fixed positioning for Arabic */}
            <button
              onClick={scrollLeft}
              className={`absolute top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-bright-blue hover:text-white transition-all duration-300 hover:scale-110 ${language === 'ar' ? 'right-0' : 'left-0'}`}
            >
              {/* Fixed arrow direction for Arabic */}
              {language === 'ar' ? (
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Right Scroll Button - Fixed positioning for Arabic */}
            <button
              onClick={scrollRight}
              className={`absolute top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-bright-blue hover:text-white transition-all duration-300 hover:scale-110 ${language === 'ar' ? 'left-0' : 'right-0'}`}
            >
              {/* Fixed arrow direction for Arabic */}
              {language === 'ar' ? (
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>

            {/* Scrollable Categories Container - Enhanced mobile spacing */}
            <div
              ref={scrollContainerRef}
              className={`flex overflow-x-auto scrollbar-hide py-4 ${language === 'ar' ? 'flex-row-reverse px-12 sm:px-16 gap-4 sm:gap-6' : 'px-12 sm:px-16 gap-4 sm:gap-6'}`}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {blogCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`
                    flex-shrink-0 group relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105
                    ${selectedCategory === category.id 
                      ? 'ring-4 ring-bright-blue/30 shadow-xl scale-105' 
                      : 'hover:shadow-lg'
                    }
                  `}
                >
                  <div className={`
                    bg-gradient-to-br ${category.color} p-4 sm:p-6 min-w-[260px] sm:min-w-[300px] relative
                    ${selectedCategory === category.id ? 'shadow-2xl' : 'shadow-lg'}
                  `}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    <div className="absolute inset-0 opacity-5">
                      <div className={`absolute text-4xl sm:text-6xl opacity-20 ${language === 'ar' ? 'top-2 left-2' : 'top-2 right-2'}`}>{category.icon}</div>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <div className={`flex items-center justify-center mb-3 sm:mb-4 ${language === 'ar' ? 'flex-row-reverse gap-3' : 'gap-3'}`}>
                        <span className="text-2xl sm:text-3xl drop-shadow-lg">{category.icon}</span>
                        <div className="text-center">
                          <h3 className={`font-bold text-base sm:text-lg leading-tight text-white drop-shadow-lg mb-1 ${language === 'ar' ? 'font-arabic' : ''}`}>
                            {language === 'ar' ? category.nameAr : category.name}
                          </h3>
                          {category.topic && (
                            <p className={`text-white/95 text-xs sm:text-sm leading-tight drop-shadow-md font-medium ${language === 'ar' ? 'font-arabic allow-wrap' : ''}`}>
                              {language === 'ar' ? category.topicAr : category.topic}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <span className={`text-white/90 text-xs sm:text-sm font-medium drop-shadow-md ${language === 'ar' ? 'font-arabic' : ''}`}>
                          {category.id === 'all' 
                            ? `${allBlogPosts.length} ${language === 'ar' ? 'مقال' : 'posts'}` 
                            : `${allBlogPosts.filter(p => p.category === category.id).length} ${language === 'ar' ? 'مقال' : 'post'}`
                          }
                        </span>
                        {selectedCategory === category.id && (
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse shadow-lg ${language === 'ar' ? 'mr-2' : 'ml-2'}`}></div>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-center mb-8 text-center">
            <h2 className={`text-xl sm:text-2xl font-bold text-dark-blue ${language === 'ar' ? 'font-arabic' : ''}`}>
              {selectedCategory === 'all' 
                ? (language === 'ar' ? 'جميع المقالات' : 'All Posts')
                : (language === 'ar' 
                    ? blogCategories.find(c => c.id === selectedCategory)?.nameAr
                    : blogCategories.find(c => c.id === selectedCategory)?.name
                  )
              }
              <span className={`text-gray-500 font-normal ${language === 'ar' ? 'mr-2' : 'ml-2'}`}>
                ({filteredPosts.length} {language === 'ar' ? 'مقال' : 'posts'})
              </span>
            </h2>
            
            {searchTerm && (
              <div className={`text-gray-600 mt-2 text-sm sm:text-base ${language === 'ar' ? 'font-arabic' : ''}`}>
                {language === 'ar' ? 'نتائج البحث عن:' : 'Search results for:'} <span className="font-semibold text-bright-blue">"{searchTerm}"</span>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white/90 backdrop-blur-sm rounded-xl hover:bg-gradient-to-br hover:from-white/95 hover:to-light-cyan/30 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-gray-200/50 hover:border-bright-blue group overflow-hidden shadow-lg"
                >
                  {/* Post Image */}
                  <div className="h-40 sm:h-48 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={language === 'ar' ? post.titleAr : post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Category Badge */}
                    <div className={`absolute top-3 ${language === 'ar' ? 'right-3' : 'left-3'}`}>
                      <span className={`
                        bg-gradient-to-r ${blogCategories.find(c => c.id === post.category)?.color || 'from-bright-blue to-purple'} 
                        text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${language === 'ar' ? 'font-arabic' : ''}
                      `}>
                        {language === 'ar' 
                          ? blogCategories.find(c => c.id === post.category)?.nameAr
                          : blogCategories.find(c => c.id === post.category)?.name
                        }
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {post.featured && (
                      <div className={`absolute top-3 ${language === 'ar' ? 'left-3' : 'right-3'} bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold`}>
                        {t('blog.featured')}
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-6 text-center">
                    {/* Post Meta */}
                    <div className={`flex items-center justify-center text-xs sm:text-sm text-gray-500 mb-3 gap-2 sm:gap-4 flex-wrap ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="flex items-center">
                        <User className={`w-3 h-3 sm:w-4 sm:h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                        <span className={language === 'ar' ? 'font-arabic' : ''}>{language === 'ar' ? post.authorAr : post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className={`w-3 h-3 sm:w-4 sm:h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                        <span>{language === 'ar' ? post.dateAr : post.date}</span>
                      </div>
                    </div>

                    <div className={`flex items-center justify-center text-xs sm:text-sm text-gray-500 mb-4 gap-2 sm:gap-4 flex-wrap ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <div className="flex items-center">
                        <Clock className={`w-3 h-3 sm:w-4 sm:h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                        <span className={language === 'ar' ? 'font-arabic' : ''}>{language === 'ar' ? post.readTimeAr : post.readTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Eye className={`w-3 h-3 sm:w-4 sm:h-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                        <span>{post.views.toLocaleString()} {language === 'ar' ? 'مشاهدة' : 'views'}</span>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h3 className={`text-lg sm:text-xl font-bold text-dark-blue mb-3 line-clamp-2 group-hover:text-bright-blue transition-colors duration-300 ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? post.titleAr : post.title}
                    </h3>

                    {/* Post Excerpt */}
                    <p className={`text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base ${language === 'ar' ? 'font-arabic allow-wrap' : ''}`}>
                      {language === 'ar' ? post.excerptAr : post.excerpt}
                    </p>

                    {/* Read More Button */}
                    <button
                      onClick={() => handleReadMore(post.id)}
                      className={`w-full bg-gradient-to-r from-bright-blue/10 to-purple/10 hover:from-bright-blue/20 hover:to-purple/20 text-dark-blue py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 border border-bright-blue/20 hover:border-bright-blue/40 group/btn text-sm sm:text-base ${language === 'ar' ? 'font-arabic' : ''}`}
                    >
                      <span className={`flex items-center justify-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        {t('blog.read_more')}
                        <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-300 ${language === 'ar' ? 'mr-2 transform scale-x-[-1]' : 'ml-2'}`} />
                      </span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 ${language === 'ar' ? 'font-arabic' : ''}`}>
              <div className="text-4xl sm:text-6xl mb-4">📝</div>
              <h3 className="text-xl sm:text-2xl font-bold text-dark-blue mb-2">
                {language === 'ar' ? 'لم يتم العثور على مقالات' : 'No posts found'}
              </h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {searchTerm 
                  ? (language === 'ar' 
                      ? `لا توجد مقالات تطابق بحثك عن "${searchTerm}"`
                      : `No posts match your search for "${searchTerm}"`
                    )
                  : (language === 'ar'
                      ? 'لا توجد مقالات متاحة في هذه الفئة بعد.'
                      : 'No posts available in this category yet.'
                    )
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className={`bg-gradient-to-r from-bright-blue to-purple text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base ${language === 'ar' ? 'font-arabic' : ''}`}
                >
                  {language === 'ar' ? 'مسح البحث' : 'Clear Search'}
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default BlogPage;