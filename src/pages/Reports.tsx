import React from 'react';
import { BarChart3, FileText, Download, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Reports: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('reports.title')}</h1>
        
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-5 h-5" />
            {t('reports.export')}
          </button>
        </div>
      </div>

      {/* Date Filter */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">{t('reports.period')}:</span>
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="today">{t('dashboard.today')}</option>
              <option value="week">{t('dashboard.week')}</option>
              <option value="month">{t('dashboard.month')}</option>
              <option value="quarter">{t('reports.quarter')}</option>
              <option value="year">{t('reports.year')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Financial Report */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('reports.financial')}</h3>
              <p className="text-sm text-gray-600">{t('reports.financialDesc')}</p>
            </div>
          </div>
        </div>

        {/* Inventory Report */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('reports.inventory')}</h3>
              <p className="text-sm text-gray-600">{t('reports.inventoryDesc')}</p>
            </div>
          </div>
        </div>

        {/* Performance Report */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{t('reports.performance')}</h3>
              <p className="text-sm text-gray-600">{t('reports.performanceDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        <div className="text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('reports.comingSoon')}</h3>
          <p className="text-gray-600">{t('reports.comingSoonDesc')}</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;