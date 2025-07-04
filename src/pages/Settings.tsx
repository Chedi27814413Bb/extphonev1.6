import React, { useState, useEffect } from 'react';
import { Save, Building, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useWorkshopSettings } from '../hooks/useSupabase';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const { settings, loading, updateSettings } = useWorkshopSettings();
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    thank_you_message: ''
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        name: settings.name,
        address: settings.address,
        phone: settings.phone,
        thank_you_message: settings.thank_you_message
      });
    }
  }, [settings]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error updating settings:', error);
      alert(language === 'ar' ? 'حدث خطأ في حفظ الإعدادات' : 'Erreur lors de la sauvegarde des paramètres');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('settings.title')}</h1>
        
        {saved && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
            {t('settings.saved')}
          </div>
        )}
      </div>

      {/* Workshop Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Building className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">{t('settings.workshopInfo')}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.workshopName')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={language === 'ar' ? 'أدخل اسم الورشة' : 'Entrez le nom de l\'atelier'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.phone')}
            </label>
            <div className="relative">
              <Phone className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder={language === 'ar' ? '01234567890' : '+33 1 23 45 67 89'}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.address')}
            </label>
            <div className="relative">
              <MapPin className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400 w-5 h-5`} />
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder={language === 'ar' ? 'أدخل عنوان الورشة' : 'Entrez l\'adresse de l\'atelier'}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('settings.thankYouMessage')}
            </label>
            <div className="relative">
              <MessageSquare className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-3 text-gray-400 w-5 h-5`} />
              <textarea
                value={formData.thank_you_message}
                onChange={(e) => setFormData({...formData, thank_you_message: e.target.value})}
                rows={3}
                className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                placeholder={language === 'ar' ? 'رسالة تظهر في أسفل الوصلات' : 'Message qui apparaît en bas des reçus'}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              {t('settings.thankYouDescription')}
            </p>
          </div>
        </div>

        <div className={`flex ${language === 'ar' ? 'justify-start' : 'justify-end'} mt-6`}>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? t('settings.saving') : t('settings.save')}
          </button>
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t('settings.accountSettings')}</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">{t('settings.addUser')}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('settings.addUserDescription')}
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              {t('settings.addUserButton')}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">{t('settings.changePassword')}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {t('settings.changePasswordDescription')}
            </p>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
              {t('settings.changePasswordButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;