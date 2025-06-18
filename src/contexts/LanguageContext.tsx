import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'ar' | 'fr';
  setLanguage: (lang: 'ar' | 'fr') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.repairs': 'الإصلاحات',
    'nav.inventory': 'المخزون',
    'nav.brands': 'الماركات والموديلات',
    'nav.reports': 'التقارير',
    'nav.archive': 'الأرشيف',
    'nav.settings': 'الإعدادات',
    
    // Header
    'header.title': 'نظام إدارة الورشة',
    'header.manager': 'مدير الورشة',
    'header.role': 'مدير',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.totalRevenue': 'إجمالي الإيرادات',
    'dashboard.partsCost': 'تكلفة القطع',
    'dashboard.netProfit': 'صافي الأرباح',
    'dashboard.repairsCount': 'عدد الإصلاحات',
    'dashboard.weeklyProfit': 'تطور الأرباح الأسبوعية',
    'dashboard.popularModels': 'الموديلات الأكثر إصلاحاً',
    'dashboard.commonIssues': 'الأعطال الأكثر شيوعاً',
    'dashboard.noData': 'لا توجد بيانات للعرض',
    'dashboard.addRepairs': 'قم بإضافة عمليات إصلاح لرؤية الإحصائيات',
    'dashboard.today': 'اليوم',
    'dashboard.week': 'هذا الأسبوع',
    'dashboard.month': 'هذا الشهر',
    'dashboard.lastMonth': 'عن الشهر الماضي',
    
    // Repairs
    'repairs.title': 'إدارة الإصلاحات',
    'repairs.newRepair': 'إصلاح جديد',
    'repairs.pending': 'في الانتظار',
    'repairs.inProgress': 'قيد التنفيذ',
    'repairs.completed': 'مكتمل',
    'repairs.archived': 'مؤرشف',
    'repairs.customer': 'العميل',
    'repairs.device': 'الجهاز',
    'repairs.issue': 'العطل',
    'repairs.usedParts': 'القطع المستخدمة',
    'repairs.cost': 'التكلفة',
    'repairs.profit': 'الربح',
    'repairs.status': 'الحالة',
    'repairs.date': 'التاريخ',
    'repairs.actions': 'الإجراءات',
    'repairs.search': 'البحث باسم العميل، الهاتف، أو الجهاز...',
    'repairs.allStatuses': 'جميع الحالات',
    'repairs.noRepairs': 'لا توجد عمليات إصلاح',
    'repairs.addFirstRepair': 'ابدأ بإضافة عملية إصلاح جديدة',
    'repairs.startWork': 'بدء العمل',
    'repairs.complete': 'إكمال',
    'repairs.archive': 'أرشفة',
    'repairs.noParts': 'لا توجد قطع',
    'repairs.labor': 'عمالة',
    'repairs.completedOn': 'اكتمل',
    
    // Inventory
    'inventory.title': 'إدارة المخزون',
    'inventory.addSparePart': 'إضافة قطعة غيار',
    'inventory.totalParts': 'إجمالي القطع',
    'inventory.lowStock': 'مخزون منخفض',
    'inventory.outOfStock': 'نفد المخزون',
    'inventory.stockValue': 'قيمة المخزون',
    'inventory.search': 'البحث عن القطع...',
    'inventory.allTypes': 'جميع الأنواع',
    'inventory.lowStockOnly': 'مخزون منخفض فقط',
    'inventory.part': 'القطعة',
    'inventory.type': 'النوع',
    'inventory.compatibleDevice': 'الجهاز المتوافق',
    'inventory.quantity': 'الكمية',
    'inventory.purchasePrice': 'سعر الشراء',
    'inventory.sellingPrice': 'سعر البيع',
    'inventory.profit': 'الربح',
    'inventory.totalValue': 'القيمة الإجمالية',
    'inventory.quality': 'جودة',
    'inventory.alertAt': 'تنبيه عند',
    'inventory.lowStockAlert': 'تنبيه: {count} قطعة تحتاج إلى إعادة تخزين',
    'inventory.viewParts': 'عرض القطع',
    'inventory.noParts': 'لا توجد قطع غيار',
    'inventory.addFirstPart': 'ابدأ بإضافة قطع الغيار إلى المخزون',
    
    // Brands
    'brands.title': 'إدارة الماركات والموديلات',
    'brands.addBrand': 'إضافة ماركة',
    'brands.addModel': 'إضافة موديل',
    'brands.brands': 'الماركات',
    'brands.models': 'الموديلات',
    'brands.allModels': 'جميع الموديلات',
    'brands.modelsFor': 'موديلات {brand}',
    'brands.search': 'البحث عن الماركات...',
    'brands.noBrands': 'لا توجد ماركات',
    'brands.addFirstBrand': 'ابدأ بإضافة ماركات الأجهزة',
    'brands.addNewBrand': 'إضافة ماركة جديدة',
    'brands.noModels': 'لا توجد موديلات لـ {brand}',
    'brands.addModelsForBrand': 'أضف موديلات جديدة لهذه الماركة',
    'brands.addNewModel': 'إضافة موديل جديد',
    'brands.selectBrand': 'اختر ماركة',
    'brands.selectBrandToView': 'اختر ماركة من القائمة لعرض موديلاتها',
    'brands.modelCount': '{count} موديل',
    
    // Settings
    'settings.title': 'إعدادات الورشة',
    'settings.saved': 'تم حفظ الإعدادات بنجاح',
    'settings.workshopInfo': 'معلومات الورشة',
    'settings.workshopName': 'اسم الورشة',
    'settings.phone': 'رقم الهاتف',
    'settings.address': 'العنوان',
    'settings.thankYouMessage': 'رسالة الشكر',
    'settings.thankYouDescription': 'هذه الرسالة ستظهر أسفل وصلات الاستلام',
    'settings.save': 'حفظ الإعدادات',
    'settings.saving': 'جاري الحفظ...',
    'settings.accountSettings': 'إعدادات الحساب',
    'settings.addUser': 'إضافة مستخدم جديد',
    'settings.addUserDescription': 'يمكن للمدير إضافة فنيين جدد للنظام',
    'settings.addUserButton': 'إضافة مستخدم',
    'settings.changePassword': 'تغيير كلمة المرور',
    'settings.changePasswordDescription': 'قم بتحديث كلمة المرور الخاصة بك بانتظام',
    'settings.changePasswordButton': 'تغيير كلمة المرور',
    
    // Reports
    'reports.title': 'التقارير',
    'reports.export': 'تصدير التقرير',
    'reports.period': 'الفترة',
    'reports.quarter': 'هذا الربع',
    'reports.year': 'هذا العام',
    'reports.financial': 'التقرير المالي',
    'reports.financialDesc': 'تقرير شامل عن الإيرادات والأرباح',
    'reports.inventory': 'تقرير المخزون',
    'reports.inventoryDesc': 'حالة المخزون والقطع المطلوبة',
    'reports.performance': 'تقرير الأداء',
    'reports.performanceDesc': 'إحصائيات الأداء والإنتاجية',
    'reports.comingSoon': 'قريباً',
    'reports.comingSoonDesc': 'ستتوفر التقارير التفصيلية قريباً',
    
    // Archive
    'archive.title': 'الأرشيف',
    'archive.exportAll': 'تصدير الكل',
    'archive.totalItems': 'إجمالي العناصر',
    'archive.repairs': 'الإصلاحات',
    'archive.thisMonth': 'هذا الشهر',
    'archive.search': 'البحث في الأرشيف...',
    'archive.allPeriods': 'جميع الفترات',
    'archive.item': 'العنصر',
    'archive.customer': 'العميل',
    'archive.date': 'التاريخ',
    'archive.amount': 'المبلغ',
    'archive.noItems': 'لا توجد عناصر مؤرشفة',
    'archive.noItemsDesc': 'ستظهر العناصر المؤرشفة هنا',
    
    // Common
    'common.add': 'إضافة',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.search': 'البحث',
    'common.filter': 'تصفية',
    'common.actions': 'الإجراءات',
    'common.loading': 'جاري التحميل...',
    'common.currency': 'د.ت',
    'common.required': 'مطلوب',
    'common.optional': 'اختياري',
    'common.yes': 'نعم',
    'common.no': 'لا',
    'common.confirm': 'تأكيد',
    'common.close': 'إغلاق',
    
    // Days
    'days.sunday': 'الأحد',
    'days.monday': 'الاثنين',
    'days.tuesday': 'الثلاثاء',
    'days.wednesday': 'الأربعاء',
    'days.thursday': 'الخميس',
    'days.friday': 'الجمعة',
    'days.saturday': 'السبت',
    
    // Part types
    'partTypes.screen': 'شاشة',
    'partTypes.battery': 'بطارية',
    'partTypes.microphone': 'مايك',
    'partTypes.speaker': 'سماعة',
    'partTypes.camera': 'كاميرا',
    'partTypes.charger': 'شاحن',
    'partTypes.other': 'أخرى',
    
    // Issue types
    'issueTypes.screenBreak': 'كسر الشاشة',
    'issueTypes.batteryIssue': 'مشكلة البطارية',
    'issueTypes.microphoneIssue': 'عطل المايك',
    'issueTypes.speakerIssue': 'مشكلة السماعة',
    'issueTypes.cameraIssue': 'عطل الكاميرا',
    'issueTypes.chargingIssue': 'مشكلة الشحن',
    'issueTypes.softwareIssue': 'عطل البرمجيات',
    'issueTypes.otherIssue': 'مشكلة أخرى',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.repairs': 'Réparations',
    'nav.inventory': 'Inventaire',
    'nav.brands': 'Marques et modèles',
    'nav.reports': 'Rapports',
    'nav.archive': 'Archive',
    'nav.settings': 'Paramètres',
    
    // Header
    'header.title': 'Système de gestion d\'atelier',
    'header.manager': 'Gestionnaire d\'atelier',
    'header.role': 'Gestionnaire',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.totalRevenue': 'Revenus totaux',
    'dashboard.partsCost': 'Coût des pièces',
    'dashboard.netProfit': 'Bénéfice net',
    'dashboard.repairsCount': 'Nombre de réparations',
    'dashboard.weeklyProfit': 'Évolution des bénéfices hebdomadaires',
    'dashboard.popularModels': 'Modèles les plus réparés',
    'dashboard.commonIssues': 'Pannes les plus courantes',
    'dashboard.noData': 'Aucune donnée à afficher',
    'dashboard.addRepairs': 'Ajoutez des réparations pour voir les statistiques',
    'dashboard.today': 'Aujourd\'hui',
    'dashboard.week': 'Cette semaine',
    'dashboard.month': 'Ce mois',
    'dashboard.lastMonth': 'par rapport au mois dernier',
    
    // Repairs
    'repairs.title': 'Gestion des réparations',
    'repairs.newRepair': 'Nouvelle réparation',
    'repairs.pending': 'En attente',
    'repairs.inProgress': 'En cours',
    'repairs.completed': 'Terminé',
    'repairs.archived': 'Archivé',
    'repairs.customer': 'Client',
    'repairs.device': 'Appareil',
    'repairs.issue': 'Panne',
    'repairs.usedParts': 'Pièces utilisées',
    'repairs.cost': 'Coût',
    'repairs.profit': 'Bénéfice',
    'repairs.status': 'Statut',
    'repairs.date': 'Date',
    'repairs.actions': 'Actions',
    'repairs.search': 'Rechercher par nom client, téléphone ou appareil...',
    'repairs.allStatuses': 'Tous les statuts',
    'repairs.noRepairs': 'Aucune réparation',
    'repairs.addFirstRepair': 'Commencez par ajouter une nouvelle réparation',
    'repairs.startWork': 'Commencer',
    'repairs.complete': 'Terminer',
    'repairs.archive': 'Archiver',
    'repairs.noParts': 'Aucune pièce',
    'repairs.labor': 'Main-d\'œuvre',
    'repairs.completedOn': 'Terminé le',
    
    // Inventory
    'inventory.title': 'Gestion de l\'inventaire',
    'inventory.addSparePart': 'Ajouter une pièce détachée',
    'inventory.totalParts': 'Total des pièces',
    'inventory.lowStock': 'Stock faible',
    'inventory.outOfStock': 'Rupture de stock',
    'inventory.stockValue': 'Valeur du stock',
    'inventory.search': 'Rechercher des pièces...',
    'inventory.allTypes': 'Tous les types',
    'inventory.lowStockOnly': 'Stock faible uniquement',
    'inventory.part': 'Pièce',
    'inventory.type': 'Type',
    'inventory.compatibleDevice': 'Appareil compatible',
    'inventory.quantity': 'Quantité',
    'inventory.purchasePrice': 'Prix d\'achat',
    'inventory.sellingPrice': 'Prix de vente',
    'inventory.profit': 'Bénéfice',
    'inventory.totalValue': 'Valeur totale',
    'inventory.quality': 'Qualité',
    'inventory.alertAt': 'Alerte à',
    'inventory.lowStockAlert': 'Alerte : {count} pièce(s) nécessitent un réapprovisionnement',
    'inventory.viewParts': 'Voir les pièces',
    'inventory.noParts': 'Aucune pièce détachée',
    'inventory.addFirstPart': 'Commencez par ajouter des pièces détachées à l\'inventaire',
    
    // Brands
    'brands.title': 'Gestion des marques et modèles',
    'brands.addBrand': 'Ajouter une marque',
    'brands.addModel': 'Ajouter un modèle',
    'brands.brands': 'Marques',
    'brands.models': 'Modèles',
    'brands.allModels': 'Tous les modèles',
    'brands.modelsFor': 'Modèles {brand}',
    'brands.search': 'Rechercher des marques...',
    'brands.noBrands': 'Aucune marque',
    'brands.addFirstBrand': 'Commencez par ajouter des marques d\'appareils',
    'brands.addNewBrand': 'Ajouter une nouvelle marque',
    'brands.noModels': 'Aucun modèle pour {brand}',
    'brands.addModelsForBrand': 'Ajoutez de nouveaux modèles pour cette marque',
    'brands.addNewModel': 'Ajouter un nouveau modèle',
    'brands.selectBrand': 'Choisir une marque',
    'brands.selectBrandToView': 'Choisissez une marque dans la liste pour voir ses modèles',
    'brands.modelCount': '{count} modèle(s)',
    
    // Settings
    'settings.title': 'Paramètres de l\'atelier',
    'settings.saved': 'Paramètres sauvegardés avec succès',
    'settings.workshopInfo': 'Informations de l\'atelier',
    'settings.workshopName': 'Nom de l\'atelier',
    'settings.phone': 'Numéro de téléphone',
    'settings.address': 'Adresse',
    'settings.thankYouMessage': 'Message de remerciement',
    'settings.thankYouDescription': 'Ce message apparaîtra en bas des reçus',
    'settings.save': 'Sauvegarder les paramètres',
    'settings.saving': 'Sauvegarde en cours...',
    'settings.accountSettings': 'Paramètres du compte',
    'settings.addUser': 'Ajouter un nouvel utilisateur',
    'settings.addUserDescription': 'Le gestionnaire peut ajouter de nouveaux techniciens au système',
    'settings.addUserButton': 'Ajouter un utilisateur',
    'settings.changePassword': 'Changer le mot de passe',
    'settings.changePasswordDescription': 'Mettez à jour votre mot de passe régulièrement',
    'settings.changePasswordButton': 'Changer le mot de passe',
    
    // Reports
    'reports.title': 'Rapports',
    'reports.export': 'Exporter le rapport',
    'reports.period': 'Période',
    'reports.quarter': 'Ce trimestre',
    'reports.year': 'Cette année',
    'reports.financial': 'Rapport financier',
    'reports.financialDesc': 'Rapport complet sur les revenus et bénéfices',
    'reports.inventory': 'Rapport d\'inventaire',
    'reports.inventoryDesc': 'État du stock et pièces requises',
    'reports.performance': 'Rapport de performance',
    'reports.performanceDesc': 'Statistiques de performance et productivité',
    'reports.comingSoon': 'Bientôt disponible',
    'reports.comingSoonDesc': 'Les rapports détaillés seront bientôt disponibles',
    
    // Archive
    'archive.title': 'Archive',
    'archive.exportAll': 'Exporter tout',
    'archive.totalItems': 'Total des éléments',
    'archive.repairs': 'Réparations',
    'archive.thisMonth': 'Ce mois',
    'archive.search': 'Rechercher dans l\'archive...',
    'archive.allPeriods': 'Toutes les périodes',
    'archive.item': 'Élément',
    'archive.customer': 'Client',
    'archive.date': 'Date',
    'archive.amount': 'Montant',
    'archive.noItems': 'Aucun élément archivé',
    'archive.noItemsDesc': 'Les éléments archivés apparaîtront ici',
    
    // Common
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Sauvegarder',
    'common.cancel': 'Annuler',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.actions': 'Actions',
    'common.loading': 'Chargement...',
    'common.currency': '€',
    'common.required': 'Requis',
    'common.optional': 'Optionnel',
    'common.yes': 'Oui',
    'common.no': 'Non',
    'common.confirm': 'Confirmer',
    'common.close': 'Fermer',
    
    // Days
    'days.sunday': 'Dimanche',
    'days.monday': 'Lundi',
    'days.tuesday': 'Mardi',
    'days.wednesday': 'Mercredi',
    'days.thursday': 'Jeudi',
    'days.friday': 'Vendredi',
    'days.saturday': 'Samedi',
    
    // Part types
    'partTypes.screen': 'Écran',
    'partTypes.battery': 'Batterie',
    'partTypes.microphone': 'Microphone',
    'partTypes.speaker': 'Haut-parleur',
    'partTypes.camera': 'Caméra',
    'partTypes.charger': 'Chargeur',
    'partTypes.other': 'Autre',
    
    // Issue types
    'issueTypes.screenBreak': 'Écran cassé',
    'issueTypes.batteryIssue': 'Problème de batterie',
    'issueTypes.microphoneIssue': 'Panne du microphone',
    'issueTypes.speakerIssue': 'Problème de haut-parleur',
    'issueTypes.cameraIssue': 'Panne de caméra',
    'issueTypes.chargingIssue': 'Problème de charge',
    'issueTypes.softwareIssue': 'Panne logicielle',
    'issueTypes.otherIssue': 'Autre problème',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'ar' | 'fr'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'ar' | 'fr') || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
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