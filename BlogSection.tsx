import React from 'react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BlogPost {
  id: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string;
  contentAr: string;
  author: string;
  authorAr: string;
  date: string;
  dateAr: string;
  readTime: string;
  readTimeAr: string;
  category: string;
  image: string;
  featured: boolean;
}

interface BlogSectionProps {
  posts: BlogPost[];
  onReadMore: (postId: string) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts, onReadMore }) => {
  const { language, t } = useLanguage();
  const importantPosts = posts.filter(post => post.featured).slice(0, 3);

  if (importantPosts.length === 0) {
    return null;
  }

  return (
    <section id="blog" className="py-20 px-4 bg-gradient-to-br from-off-white to-light-cyan/10 scroll-animate opacity-0">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {t('blog.title').split(' ')[0]} <span className="bg-gradient-to-r from-bright-blue to-purple bg-clip-text text-transparent">{t('blog.title').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto mb-8 ${language === 'ar' ? 'font-arabic allow-wrap' : ''}`}>
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Three Important Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {importantPosts.map((post, index) => (
            <article
              key={post.id}
              className="bg-white/90 backdrop-blur-sm rounded-2xl hover:bg-gradient-to-br hover:from-white/95 hover:to-light-cyan/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-200/50 hover:border-bright-blue group overflow-hidden shadow-xl"
            >
              {/* Post Image */}
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={language === 'ar' ? post.titleAr : post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-bright-blue text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {language === 'ar' ? getCategoryNameAr(post.category) : getCategoryName(post.category)}
                </div>
                
                {/* Priority Badge */}
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
                  {index === 0 ? t('blog.most_important') : t('blog.featured')}
                </div>
              </div>

              <div className="p-6 text-center">
                {/* Post Meta */}
                <div className="flex flex-wrap items-center justify-center text-sm text-gray-500 mb-4 gap-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span className={`font-medium ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? post.authorAr : post.author}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{language === 'ar' ? post.dateAr : post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? post.readTimeAr : post.readTime}
                    </span>
                  </div>
                </div>

                {/* Post Title */}
                <h3 className={`text-xl font-bold text-dark-blue mb-3 leading-tight group-hover:text-bright-blue transition-colors duration-300 line-clamp-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {language === 'ar' ? post.titleAr : post.title}
                </h3>

                {/* Post Excerpt */}
                <p className={`text-gray-600 mb-6 leading-relaxed line-clamp-3 ${language === 'ar' ? 'font-arabic allow-wrap' : ''}`}>
                  {language === 'ar' ? post.excerptAr : post.excerpt}
                </p>

                {/* Read More Button */}
                <button
                  onClick={() => onReadMore(post.id)}
                  className={`w-full bg-gradient-to-r from-bright-blue to-purple text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 group/btn flex items-center justify-center ${language === 'ar' ? 'font-arabic' : ''}`}
                >
                  {t('blog.read_more')}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <button
            onClick={() => window.location.href = '/blog'}
            className={`bg-gradient-to-r from-bright-blue to-purple text-white px-10 py-4 rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-white/20 ${language === 'ar' ? 'font-arabic' : ''}`}
          >
            {t('blog.view_all')}
          </button>
        </div>
      </div>
    </section>
  );
};

// Helper functions to get category names
const getCategoryName = (categoryId: string): string => {
  const categories: { [key: string]: string } = {
    'visa-immigration': 'Visa & Immigration',
    'universities': 'Universities',
    'student-life': 'Student Life',
    'academics': 'Academics',
    'support': 'Student Support',
    'work': 'Work & Career',
    'events': 'Events',
    'settling': 'Settling In'
  };
  return categories[categoryId] || 'General';
};

const getCategoryNameAr = (categoryId: string): string => {
  const categories: { [key: string]: string } = {
    'visa-immigration': 'التأشيرة والهجرة',
    'universities': 'الجامعات',
    'student-life': 'حياة الطلاب',
    'academics': 'الأكاديميات',
    'support': 'دعم الطلاب',
    'work': 'العمل والمهنة',
    'events': 'الفعاليات',
    'settling': 'الاستقرار'
  };
  return categories[categoryId] || 'عام';
};

export default BlogSection;