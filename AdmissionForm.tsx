import React, { useState } from 'react';
import { X, User, GraduationCap, Phone, Mail, Upload, Send, Check, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdmissionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdmissionForm: React.FC<AdmissionFormProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    academicLevel: '',
    major: '',
    whatsappNumber: '',
    email: '',
    passport: null as File | null,
    diploma: null as File | null
  });
  const { language, t } = useLanguage();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setCurrentStep(5); // Go to success screen
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      age: '',
      academicLevel: '',
      major: '',
      whatsappNumber: '',
      email: '',
      passport: null,
      diploma: null
    });
    setCurrentStep(1);
    onClose();
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.age;
      case 2:
        return formData.academicLevel && formData.major;
      case 3:
        return formData.whatsappNumber && formData.email;
      case 4:
        return formData.passport && formData.diploma;
      default:
        return false;
    }
  };

  const academicLevels = [
    { value: 'bachelor', label: language === 'ar' ? 'بكالوريوس' : 'Bachelor\'s' },
    { value: 'master', label: language === 'ar' ? 'ماجستير' : 'Master\'s' },
    { value: 'diploma', label: language === 'ar' ? 'دبلوم' : 'Diploma' },
    { value: 'phd', label: language === 'ar' ? 'دكتوراه' : 'PhD' },
    { value: 'associate', label: language === 'ar' ? 'دبلوم مشارك' : 'Associate' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className={`bg-white rounded-2xl sm:rounded-3xl w-full max-w-4xl h-[95vh] sm:h-[90vh] flex flex-col shadow-2xl ${language === 'ar' ? 'font-arabic' : ''}`}>
        {/* Header - Ultra Compact */}
        <div className={`flex justify-between items-center p-3 sm:p-4 border-b border-gray-100 flex-shrink-0 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          <div className={`flex items-center ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <span className="text-2xl sm:text-3xl mr-2 sm:mr-3">🎓</span>
            <div className={language === 'ar' ? 'text-right' : ''}>
              <h2 className="text-lg sm:text-xl font-bold text-dark-blue">
                {language === 'ar' ? 'هيا نبدأ!' : 'Let\'s Get Started!'}
              </h2>
              <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">
                {language === 'ar' 
                  ? 'أسئلة سريعة لأفضل الفرص'
                  : 'Quick questions for best opportunities'
                }
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-dark-blue transition-colors p-1 sm:p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Progress Indicators - Ultra Compact */}
        <div className="px-3 sm:px-6 py-2 sm:py-3 flex-shrink-0">
          <div className={`flex items-center justify-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'} sm:space-x-3`}>
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 border-2
                  ${currentStep >= step 
                    ? 'bg-bright-blue text-white border-bright-blue shadow-lg' 
                    : currentStep > step
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }
                `}>
                  {currentStep > step ? (
                    <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    step
                  )}
                </div>
                {index < 3 && (
                  <div className={`
                    w-4 sm:w-6 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded-full transition-all duration-300
                    ${currentStep > step + 1 
                      ? 'bg-green-500' 
                      : currentStep > step
                        ? 'bg-bright-blue'
                        : 'bg-gray-200'
                    }
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content - Fixed height with proper flex layout */}
        <div className="flex-1 px-3 sm:px-6 pb-3 sm:pb-6 overflow-hidden min-h-0">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="h-full bg-gradient-to-br from-off-white to-light-cyan/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-light-cyan/30 flex flex-col">
              <div className="flex-1 max-w-sm mx-auto w-full flex flex-col">
                <div className={`text-center mb-3 sm:mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-bright-blue rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark-blue mb-1 sm:mb-2">
                    {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Info'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? 'نود أن نعرف المزيد عنك' : 'We\'d love to know more about you'}
                  </p>
                </div>

                <div className="flex-1 space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 sm:mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'الاسم' : 'Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-dark-blue placeholder-gray-400 focus:border-bright-blue focus:ring-2 sm:focus:ring-4 focus:ring-bright-blue/20 transition-all outline-none text-sm sm:text-base ${language === 'ar' ? 'text-right' : ''}`}
                      placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your full name'}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 sm:mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'العمر' : 'Age'}
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => handleInputChange('age', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-dark-blue placeholder-gray-400 focus:border-bright-blue focus:ring-2 sm:focus:ring-4 focus:ring-bright-blue/20 transition-all outline-none text-sm sm:text-base ${language === 'ar' ? 'text-right' : ''}`}
                      placeholder={language === 'ar' ? 'عمرك' : 'Your age'}
                      min="16"
                      max="100"
                    />
                  </div>

                  <div className="bg-blue-50 border border-bright-blue/30 rounded-lg sm:rounded-xl p-2 sm:p-3">
                    <p className={`text-bright-blue text-xs ${language === 'ar' ? 'text-right' : ''}`}>
                      <strong>{language === 'ar' ? 'لماذا نسأل:' : 'Why we ask:'}</strong>{' '}
                      {language === 'ar' 
                        ? 'لتحديد الأهلية وتخصيص الخيارات'
                        : 'To determine eligibility and tailor options'
                      }
                    </p>
                  </div>
                </div>

                <button
                  onClick={nextStep}
                  disabled={!isStepComplete(1)}
                  className={`w-full bg-gradient-to-r from-bright-blue to-purple text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  {language === 'ar' ? 'التالي' : 'Next'}
                  <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${language === 'ar' ? 'transform scale-x-[-1]' : ''}`} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Academic Goals */}
          {currentStep === 2 && (
            <div className="h-full bg-gradient-to-br from-off-white to-purple/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-purple/30 flex flex-col">
              <div className="flex-1 max-w-sm mx-auto w-full flex flex-col">
                <div className={`text-center mb-3 sm:mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark-blue mb-1 sm:mb-2">
                    {language === 'ar' ? 'الأهداف الأكاديمية' : 'Academic Goals'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? 'ما تريد دراسته' : 'What you want to study'}
                  </p>
                </div>

                <div className="flex-1 space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 sm:mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'المستوى' : 'Level'}
                    </label>
                    <select
                      value={formData.academicLevel}
                      onChange={(e) => handleInputChange('academicLevel', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-dark-blue focus:border-purple focus:ring-2 sm:focus:ring-4 focus:ring-purple/20 transition-all outline-none text-sm sm:text-base ${language === 'ar' ? 'text-right' : ''}`}
                    >
                      <option value="">
                        {language === 'ar' ? 'اختر المستوى' : 'Select level'}
                      </option>
                      {academicLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 sm:mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'التخصص' : 'Major'}
                    </label>
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-dark-blue placeholder-gray-400 focus:border-purple focus:ring-2 sm:focus:ring-4 focus:ring-purple/20 transition-all outline-none text-sm sm:text-base ${language === 'ar' ? 'text-right' : ''}`}
                      placeholder={language === 'ar' ? 'مثل: الطب، الهندسة' : 'e.g., Medicine, Engineering'}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="bg-purple-50 border border-purple/30 rounded-lg sm:rounded-xl p-2 sm:p-3">
                    <p className={`text-purple text-xs ${language === 'ar' ? 'text-right' : ''}`}>
                      <strong>{language === 'ar' ? 'لماذا نسأل:' : 'Why we ask:'}</strong>{' '}
                      {language === 'ar' 
                        ? 'لإيجاد البرامج المناسبة لأهدافك'
                        : 'To find programs that align with your goals'
                      }
                    </p>
                  </div>
                </div>

                <div className={`flex gap-2 sm:gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-dark-blue py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 text-sm sm:text-base"
                  >
                    {language === 'ar' ? 'رجوع' : 'Back'}
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!isStepComplete(2)}
                    className={`flex-1 bg-gradient-to-r from-purple to-blue-purple text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${language === 'ar' ? 'transform scale-x-[-1]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {currentStep === 3 && (
            <div className="h-full bg-gradient-to-br from-off-white to-green-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-300 flex flex-col">
              <div className="flex-1 max-w-sm mx-auto w-full flex flex-col">
                <div className={`text-center mb-3 sm:mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark-blue mb-1 sm:mb-2">
                    {language === 'ar' ? 'معلومات التواصل' : 'Contact Info'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? 'للتواصل معك' : 'To reach out to you'}
                  </p>
                </div>

                <div className="flex-1 space-y-3 sm:space-y-4 mb-3 sm:mb-4">
                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 sm:mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                    </label>
                    <div className="relative">
                      <Phone className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <input
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                        className={`w-full py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-dark-blue placeholder-gray-400 focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-500/20 transition-all outline-none text-sm sm:text-base ${language === 'ar' ? 'pr-8 sm:pr-10 pl-3 sm:pl-4 text-right' : 'pl-8 sm:pl-10 pr-3 sm:pr-4'}`}
                        placeholder="+90 XXX XXX XXXX"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 sm:mb-2 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'الإيميل' : 'Email'}
                    </label>
                    <div className="relative">
                      <Mail className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 ${language === 'ar' ? 'right-3' : 'left-3'}`} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full py-2 sm:py-3 bg-white border-2 border-gray-200 rounded-lg sm:rounded-xl text-dark-blue placeholder-gray-400 focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-500/20 transition-all outline-none text-sm sm:text-base ${language === 'ar' ? 'pr-8 sm:pr-10 pl-3 sm:pl-4' : 'pl-8 sm:pl-10 pr-3 sm:pr-4'}`}
                        placeholder="example@email.com"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-500/30 rounded-lg sm:rounded-xl p-2 sm:p-3">
                    <p className={`text-green-700 text-xs ${language === 'ar' ? 'text-right' : ''}`}>
                      <strong>{language === 'ar' ? 'لماذا نسأل:' : 'Why we ask:'}</strong>{' '}
                      {language === 'ar' 
                        ? 'لإرسال أفضل العروض وإرشادك'
                        : 'To send best offers and guide you'
                      }
                    </p>
                  </div>
                </div>

                <div className={`flex gap-2 sm:gap-3 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-dark-blue py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 text-sm sm:text-base"
                  >
                    {language === 'ar' ? 'رجوع' : 'Back'}
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!isStepComplete(3)}
                    className={`flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    {language === 'ar' ? 'التالي' : 'Next'}
                    <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 ${language === 'ar' ? 'transform scale-x-[-1]' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Required Documents - Fixed Layout */}
          {currentStep === 4 && (
            <div className="h-full bg-gradient-to-br from-off-white to-orange-100 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-orange-300 flex flex-col">
              <div className="flex-1 max-w-sm mx-auto w-full flex flex-col">
                <div className={`text-center mb-3 sm:mb-4 ${language === 'ar' ? 'text-right' : ''}`}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-dark-blue mb-1 sm:mb-2">
                    {language === 'ar' ? 'الوثائق المطلوبة' : 'Documents'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {language === 'ar' ? 'تحميلات أخيرة' : 'Final uploads'}
                  </p>
                </div>

                <div className="flex-1 space-y-2 sm:space-y-3 mb-3 sm:mb-4 min-h-0">
                  {/* Passport Upload - Compact */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'جواز السفر' : 'Passport'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-3 text-center hover:border-orange-500 transition-colors bg-white">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-gray-600 text-xs mb-1">
                        {formData.passport ? formData.passport.name.substring(0, 20) + '...' : (language === 'ar' ? 'اختر ملف' : 'Choose file')}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('passport', e.target.files?.[0] || null)}
                        className="hidden"
                        id="passport-upload"
                      />
                      <label
                        htmlFor="passport-upload"
                        className="inline-block px-2 sm:px-3 py-1 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 transition-colors text-xs"
                      >
                        {language === 'ar' ? 'اختر' : 'Choose'}
                      </label>
                    </div>
                  </div>

                  {/* Diploma Upload - Compact */}
                  <div>
                    <label className={`block text-xs sm:text-sm font-semibold text-dark-blue mb-1 ${language === 'ar' ? 'text-right' : ''}`}>
                      {language === 'ar' ? 'الشهادة' : 'Diploma'}
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-2 sm:p-3 text-center hover:border-orange-500 transition-colors bg-white">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mx-auto mb-1" />
                      <p className="text-gray-600 text-xs mb-1">
                        {formData.diploma ? formData.diploma.name.substring(0, 20) + '...' : (language === 'ar' ? 'اختر ملف' : 'Choose file')}
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload('diploma', e.target.files?.[0] || null)}
                        className="hidden"
                        id="diploma-upload"
                      />
                      <label
                        htmlFor="diploma-upload"
                        className="inline-block px-2 sm:px-3 py-1 bg-orange-500 text-white rounded cursor-pointer hover:bg-orange-600 transition-colors text-xs"
                      >
                        {language === 'ar' ? 'اختر' : 'Choose'}
                      </label>
                    </div>
                  </div>

                  {/* Info Box - Compact */}
                  <div className="bg-orange-50 border border-orange-500/30 rounded-lg p-2">
                    <p className={`text-orange-700 text-xs ${language === 'ar' ? 'text-right' : ''}`}>
                      <strong>{language === 'ar' ? 'لماذا نسأل:' : 'Why we ask:'}</strong>{' '}
                      {language === 'ar' 
                        ? 'للتحقق من الأهلية وتسريع القبول'
                        : 'To verify eligibility and speed up admission'
                      }
                    </p>
                  </div>
                </div>

                {/* Buttons - Always visible at bottom */}
                <div className={`flex gap-2 sm:gap-3 flex-shrink-0 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={prevStep}
                    className="flex-1 bg-gray-200 text-dark-blue py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 text-sm sm:text-base"
                  >
                    {language === 'ar' ? 'رجوع' : 'Back'}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isStepComplete(4)}
                    className={`flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base ${language === 'ar' ? 'flex-row-reverse' : ''}`}
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    {language === 'ar' ? 'إرسال' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Success Screen */}
          {currentStep === 5 && (
            <div className="h-full bg-gradient-to-br from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-green-300 flex flex-col">
              <div className="flex-1 text-center flex flex-col justify-center">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎉</div>
                <h3 className="text-xl sm:text-2xl font-bold text-dark-blue mb-2 sm:mb-3">
                  {language === 'ar' ? 'تم الانتهاء!' : 'All Done!'}
                </h3>
                <p className={`text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base ${language === 'ar' ? 'text-right' : ''}`}>
                  {language === 'ar' 
                    ? 'شكراً لك! سيراجع فريقنا طلبك ويتواصل معك قريباً بأفضل الفرص.'
                    : 'Thank you! Our team will review your application and get in touch with you shortly with the best opportunities.'
                  }
                </p>
                
                <div className="bg-gradient-to-r from-bright-blue/10 to-purple/10 border border-bright-blue/30 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <div className="flex items-center justify-center mb-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2" />
                    <span className={`font-semibold text-dark-blue text-xs sm:text-sm ${language === 'ar' ? 'font-arabic' : ''}`}>
                      {language === 'ar' ? 'ما يحدث بعد ذلك:' : 'What happens next:'}
                    </span>
                  </div>
                  <ul className={`text-gray-600 space-y-1 text-xs ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <li className="flex items-center">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-bright-blue rounded-full mr-2"></span>
                      {language === 'ar' ? 'مراجعة خلال 24 ساعة' : 'Review within 24 hours'}
                    </li>
                    <li className="flex items-center">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple rounded-full mr-2"></span>
                      {language === 'ar' ? 'التواصل عبر الواتساب' : 'Contact via WhatsApp'}
                    </li>
                    <li className="flex items-center">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {language === 'ar' ? 'أفضل العروض المخصصة' : 'Best personalized offers'}
                    </li>
                  </ul>
                </div>
              </div>

              <button
                onClick={resetForm}
                className={`bg-gradient-to-r from-bright-blue to-purple text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base flex-shrink-0 ${language === 'ar' ? 'font-arabic' : ''}`}
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;