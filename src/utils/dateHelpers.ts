// Utilidades para manejo de fechas
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export const getDaysUntilExpiry = (expiryDate: string): number => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isExpiringSoon = (expiryDate: string, daysThreshold: number = 7): boolean => {
  const daysUntilExpiry = getDaysUntilExpiry(expiryDate);
  return daysUntilExpiry <= daysThreshold && daysUntilExpiry > 0;
};

export const isExpired = (expiryDate: string): boolean => {
  return getDaysUntilExpiry(expiryDate) <= 0;
};

export const getProductStatus = (stock: number, expiryDate: string): string => {
  if (isExpired(expiryDate)) {
    return 'expired';
  }
  if (isExpiringSoon(expiryDate)) {
    return 'expiring_soon';
  }
  if (stock <= 10) {
    return 'low_stock';
  }
  return 'normal';
};