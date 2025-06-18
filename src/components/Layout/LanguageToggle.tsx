import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="relative">
      <button
        onClick={() => setLanguage(language === 'ar' ? 'fr' : 'ar')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
        title={language === 'ar' ? 'Changer en français' : 'تغيير إلى العربية'}
      >
        <Languages className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {language === 'ar' ? 'FR' : 'العربية'}
        </span>
      </button>
    </div>
  );
};

export default LanguageToggle;