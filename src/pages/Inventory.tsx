import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react';
import AddSparePartModal from '../components/Modals/AddSparePartModal';
import { useSpareParts } from '../hooks/useSupabase';
import { useLanguage } from '../contexts/LanguageContext';

const Inventory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showLowStock, setShowLowStock] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { spareParts, loading, addSparePart, updateSparePart, deleteSparePart } = useSpareParts();
  const { t, language } = useLanguage();

  const handleAddSparePart = async (newSparePart: any) => {
    try {
      const sparePartData = {
        name: newSparePart.name,
        part_type: newSparePart.part_type,
        screen_quality: newSparePart.screen_quality || undefined,
        brand_id: newSparePart.brand_id,
        model_id: newSparePart.model_id,
        quantity: newSparePart.quantity,
        purchase_price: newSparePart.purchase_price,
        selling_price: newSparePart.selling_price,
        low_stock_alert: newSparePart.low_stock_alert
      };

      await addSparePart(sparePartData);
    } catch (error) {
      console.error('Error adding spare part:', error);
      alert(language === 'ar' ? 'حدث خطأ في إضافة قطعة الغيار' : 'Erreur lors de l\'ajout de la pièce détachée');
    }
  };

  const handleUpdateQuantity = async (partId: string, newQuantity: number) => {
    if (newQuantity < 0) return;
    
    try {
      await updateSparePart(partId, { quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert(language === 'ar' ? 'حدث خطأ في تحديث الكمية' : 'Erreur lors de la mise à jour de la quantité');
    }
  };

  const handleDeletePart = async (partId: string) => {
    const confirmMessage = language === 'ar' 
      ? 'هل أنت متأكد من حذف هذه القطعة؟'
      : 'Êtes-vous sûr de vouloir supprimer cette pièce ?';
    
    if (window.confirm(confirmMessage)) {
      try {
        await deleteSparePart(partId);
      } catch (error) {
        console.error('Error deleting spare part:', error);
        alert(language === 'ar' ? 'حدث خطأ في حذف القطعة' : 'Erreur lors de la suppression');
      }
    }
  };

  const partTypes = [
    { value: 'شاشة', label: t('partTypes.screen') },
    { value: 'بطارية', label: t('partTypes.battery') },
    { value: 'مايك', label: t('partTypes.microphone') },
    { value: 'سماعة', label: t('partTypes.speaker') },
    { value: 'كاميرا', label: t('partTypes.camera') },
    { value: 'شاحن', label: t('partTypes.charger') },
    { value: 'أخرى', label: t('partTypes.other') }
  ];

  const filteredParts = spareParts.filter(part => {
    const matchesSearch = 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.brand?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.model?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || part.part_type === typeFilter;
    const matchesLowStock = !showLowStock || part.quantity <= part.low_stock_alert;
    
    return matchesSearch && matchesType && matchesLowStock;
  });

  const isLowStock = (quantity: number, alertLevel: number) => quantity <= alertLevel;
  const isOutOfStock = (quantity: number) => quantity === 0;

  const lowStockCount = spareParts.filter(part => isLowStock(part.quantity, part.low_stock_alert)).length;
  const outOfStockCount = spareParts.filter(part => isOutOfStock(part.quantity)).length;
  const totalValue = spareParts.reduce((sum, part) => sum + (part.quantity * part.purchase_price), 0);

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">{t('inventory.title')}</h1>
        
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          {t('inventory.addSparePart')}
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <Package className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">{t('inventory.totalParts')}</p>
              <p className="text-2xl font-bold text-blue-800">{spareParts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center gap-3">
            <TrendingDown className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-sm text-red-600 font-medium">{t('inventory.lowStock')}</p>
              <p className="text-2xl font-bold text-red-800">{lowStockCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600 font-medium">{t('inventory.outOfStock')}</p>
              <p className="text-2xl font-bold text-gray-800">{outOfStockCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">{t('inventory.stockValue')}</p>
              <p className="text-2xl font-bold text-green-800">{totalValue.toLocaleString()} {t('common.currency')}</p>
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
              placeholder={t('inventory.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">{t('inventory.allTypes')}</option>
                {partTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showLowStock}
                onChange={(e) => setShowLowStock(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{t('inventory.lowStockOnly')}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      {lowStockCount > 0 && !showLowStock && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">
                {t('inventory.lowStockAlert').replace('{count}', lowStockCount.toString())}
              </span>
            </div>
            <button
              onClick={() => setShowLowStock(true)}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              {t('inventory.viewParts')}
            </button>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredParts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.part')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.type')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.compatibleDevice')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.quantity')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.purchasePrice')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.sellingPrice')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.profit')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('inventory.totalValue')}</th>
                  <th className={`px-6 py-4 ${language === 'ar' ? 'text-right' : 'text-left'} text-sm font-semibold text-gray-900`}>{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredParts.map((part) => (
                  <tr key={part.id} className={`hover:bg-gray-50 ${isOutOfStock(part.quantity) ? 'bg-red-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{part.name}</p>
                        {part.screen_quality && (
                          <p className="text-sm text-gray-600">{t('inventory.quality')}: {part.screen_quality}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {partTypes.find(type => type.value === part.part_type)?.label || part.part_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{part.brand?.name}</p>
                        <p className="text-sm text-gray-600">{part.model?.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleUpdateQuantity(part.id, part.quantity - 1)}
                            disabled={part.quantity <= 0}
                            className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-bold"
                          >
                            -
                          </button>
                          <span className={`font-medium min-w-[3rem] text-center ${
                            isOutOfStock(part.quantity) ? 'text-red-600' : 
                            isLowStock(part.quantity, part.low_stock_alert) ? 'text-orange-600' : 'text-gray-900'
                          }`}>
                            {part.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(part.id, part.quantity + 1)}
                            className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                        {isLowStock(part.quantity, part.low_stock_alert) && (
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {t('inventory.alertAt')}: {part.low_stock_alert}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-900">{part.purchase_price} {t('common.currency')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{part.selling_price} {t('common.currency')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-green-600">
                        {(part.selling_price - part.purchase_price).toFixed(2)} {t('common.currency')}
                      </span>
                      <p className="text-xs text-gray-500">
                        ({(((part.selling_price - part.purchase_price) / part.purchase_price) * 100).toFixed(1)}%)
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">
                        {(part.quantity * part.purchase_price).toFixed(2)} {t('common.currency')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeletePart(part.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
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
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">{t('inventory.noParts')}</h3>
            <p className="text-gray-600 mb-6">{t('inventory.addFirstPart')}</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              {t('inventory.addSparePart')}
            </button>
          </div>
        )}
      </div>

      {/* Add Spare Part Modal */}
      <AddSparePartModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSparePart}
      />
    </div>
  );
};

export default Inventory;