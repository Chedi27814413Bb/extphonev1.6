import React, { useState } from 'react';
import { Archive as ArchiveIcon, Search, Filter, Calendar, FileText, Download, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Archive: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');

  // Mock archived data - in real app this would come from your data source
  const archivedItems = [
    {
      id: '1',
      type: 'repair',
      title: language === 'ar' ? 'إصلاح iPhone 14 - أحمد محمد' : 'Réparation iPhone 14 - Ahmed Mohamed',
      date: '2024-01-15',
      customer: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      amount: 250
    },
    {
      id: '2',
      type: 'repair',
      title: language === 'ar' ? 'إصلاح Samsung Galaxy - فاطمة علي' : 'Réparation Samsung Galaxy - Fatima Ali',
      date: '2024-01-10',
      customer: language === 'ar' ? 'فاطمة علي' : 'Fatima Ali',
      amount: 180
    }
  ];

  const filteredItems = archivedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const itemDate = new Date(item.date);
      const now = new Date();
      
      switch (dateFilter) {
        case 'month':
          matchesDate = itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
          break;
        case 'quarter':
          const currentQuarter = Math.floor(now.getMonth() / 3);
          const itemQuarter = Math.floor(itemDate.getMonth() / 3);
          matchesDate = itemQuarter === currentQuarter && itemDate.getFullYear() === now.getFullYear();
          break;
        case 'year':
          matchesDate = itemDate.getFullYear() === now.getFullYear();
          break;
      }
    }
    
    return matchesSearch && matchesDate;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('archive.title')}</h1>
        
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            {t('archive.exportAll')}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <ArchiveIcon className="w-8 h-8 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">{t('archive.totalItems')}</p>
              <p className="text-2xl font-bold text-gray-800">{archivedItems.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">{t('archive.repairs')}</p>
              <p className="text-2xl font-bold text-blue-800">
                {archivedItems.filter(item => item.type === 'repair').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">{t('archive.thisMonth')}</p>
              <p className="text-2xl font-bold text-green-800">
                {archivedItems.filter(item => {
                  const itemDate = new Date(item.date);
                  const now = new Date();
                  return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute ${language === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5`} />
            <input
              type="text"
              placeholder={t('archive.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">{t('archive.allPeriods')}</option>
              <option value="month">{t('dashboard.month')}</option>
              <option value="quarter">{t('reports.quarter')}</option>
              <option value="year">{t('reports.year')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Archive Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('archive.item')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('archive.customer')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('archive.date')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('archive.amount')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{item.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">
                        {new Date(item.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'fr-FR')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{item.amount} {t('common.currency')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <ArchiveIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('archive.noItems')}</h3>
            <p className="text-gray-600">{t('archive.noItemsDesc')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;