import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Wrench, 
  Settings,
  BarChart3,
  Archive,
  Smartphone
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t, language } = useLanguage();

  const menuItems = [
    { icon: Home, label: t('nav.dashboard'), path: '/dashboard' },
    { icon: Wrench, label: t('nav.repairs'), path: '/repairs' },
    { icon: Package, label: t('nav.inventory'), path: '/inventory' },
    { icon: Smartphone, label: t('nav.brands'), path: '/brands' },
    { icon: BarChart3, label: t('nav.reports'), path: '/reports' },
    { icon: Archive, label: t('nav.archive'), path: '/archive' },
    { icon: Settings, label: t('nav.settings'), path: '/settings' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed ${language === 'ar' ? 'right-0' : 'left-0'} top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : language === 'ar' ? 'translate-x-full' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-none
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <h2 className={`text-xl font-bold text-gray-800 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'ورشة الإصلاح' : 'Atelier de Réparation'}
            </h2>
            <p className={`text-sm text-gray-600 mt-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
              {language === 'ar' ? 'نظام إدارة شامل' : 'Système de gestion complet'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
                      ${language === 'ar' ? 'flex-row' : 'flex-row'}
                      ${isActive(item.path)
                        ? `bg-blue-50 text-blue-600 ${language === 'ar' ? 'border-r-4' : 'border-l-4'} border-blue-600`
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;