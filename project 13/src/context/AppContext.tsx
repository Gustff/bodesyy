import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
}

interface Supplier {
  id: number;
  companyName: string;
  ruc: string;
  email: string;
  phone: string;
  contact: string;
  product: string;
  status: string;
}

interface Product {
  id: number;
  name: string;
  expiryDate: string;
  supplier: string;
  category: string;
  stock: number;
  price: number;
  entryDate: string;
  status: string;
}

interface Sale {
  id: number;
  date: string;
  time: string;
  customer: string;
  quantity: number;
  unitPrice: number;
  productCode: string;
  product: string;
  total: number;
}

interface Purchase {
  id: number;
  date: string;
  time: string;
  supplier: string;
  quantity: number;
  totalPrice: number;
  productCode: string;
  product: string;
  unitPrice: number;
}

interface AppContextType {
  users: User[];
  suppliers: Supplier[];
  products: Product[];
  sales: Sale[];
  purchases: Purchase[];
  currentUser: any;
  addUser: (user: Omit<User, 'id'>) => void;
  addSupplier: (supplier: Omit<Supplier, 'id'>) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  addSale: (sale: Omit<Sale, 'id'>) => void;
  addPurchase: (purchase: Omit<Purchase, 'id'>) => void;
  updateProductStock: (productName: string, quantity: number, operation: 'add' | 'subtract') => void;
  setCurrentUser: (user: any) => void;
  resetDashboard: () => void;
  updateUser: (id: number, userData: Partial<User>) => void;
  deleteUser: (id: number) => void;
  updateSupplier: (id: number, supplierData: Partial<Supplier>) => void;
  deleteSupplier: (id: number) => void;
  updateProduct: (id: number, productData: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  deleteSale: (id: number) => void;
  deletePurchase: (id: number) => void;
  importUsers: (userData: any[]) => void;
  importSuppliers: (supplierData: any[]) => void;
  importProducts: (productData: any[]) => void;
  importSales: (salesData: any[]) => void;
  importPurchases: (purchaseData: any[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Datos iniciales para usuarios existentes (solo para el usuario de prueba)
const getInitialData = (isTestUser: boolean) => {
  if (isTestUser) {
    return {
      users: [
        {
          id: 1,
          name: 'Laura',
          lastName: 'Ríos Arévalo',
          email: 'laura.rios@bodesy.com',
          role: 'Gerente de Marketing',
          status: 'active',
          joinDate: '2024-01-15'
        },
        {
          id: 2,
          name: 'Camila',
          lastName: 'Soto Vargas',
          email: 'camila.soto@bodesy.com',
          role: 'Analista Financiero',
          status: 'active',
          joinDate: '2024-02-20'
        },
        {
          id: 3,
          name: 'Carlos',
          lastName: 'Mendoza López',
          email: 'carlos.mendoza@bodesy.com',
          role: 'Supervisor de Inventario',
          status: 'active',
          joinDate: '2024-03-10'
        },
        {
          id: 4,
          name: 'Ana',
          lastName: 'García Torres',
          email: 'ana.garcia@bodesy.com',
          role: 'Asistente de Ventas',
          status: 'inactive',
          joinDate: '2024-01-05'
        },
      ],
      suppliers: [
        {
          id: 1,
          companyName: 'AJE PERIS',
          ruc: '20516400472',
          email: 'ventas@aje.com.pe',
          phone: '+51-1-234-5678',
          product: 'COCA COLA 600ML',
          contact: 'María González',
          status: 'active'
        },
        {
          id: 2,
          companyName: 'GLORIA S.A.',
          ruc: '20100190797',
          email: 'proveedores@gloria.com.pe',
          phone: '+51-1-456-7890',
          product: 'LECHE GLORIA TARRO',
          contact: 'Carlos Rodríguez',
          status: 'active'
        },
        {
          id: 3,
          companyName: 'CASA GRANDE',
          ruc: '20131827221',
          email: 'ventas@casagrande.com.pe',
          phone: '+51-44-523-1000',
          product: 'AZÚCAR RUBIA',
          contact: 'Ana Martínez',
          status: 'active'
        },
        {
          id: 4,
          companyName: 'LAIVE S.A.',
          ruc: '20100128218',
          email: 'comercial@laive.com.pe',
          phone: '+51-1-317-6000',
          product: 'YOGURT NATURAL',
          contact: 'Roberto Silva',
          status: 'inactive'
        },
      ],
      products: [
        {
          id: 1,
          name: 'COCA COLA 600ML',
          expiryDate: '2026-01-06',
          supplier: 'AJE PERIS',
          category: 'Bebidas',
          stock: 21,
          price: 3.00,
          entryDate: '2025-06-15',
          status: 'normal'
        },
        {
          id: 2,
          name: 'LECHE GLORIA TARRO',
          expiryDate: '2026-03-17',
          supplier: 'GLORIA S.A.',
          category: 'Lácteos',
          stock: 41,
          price: 4.00,
          entryDate: '2025-06-20',
          status: 'normal'
        },
        {
          id: 3,
          name: 'AZÚCAR RUBIA',
          expiryDate: '2026-12-31',
          supplier: 'CASA GRANDE',
          category: 'Abarrotes',
          stock: 5,
          price: 2.50,
          entryDate: '2025-06-10',
          status: 'low_stock'
        },
        {
          id: 4,
          name: 'YOGURT NATURAL',
          expiryDate: '2025-07-10',
          supplier: 'LAIVE S.A.',
          category: 'Lácteos',
          stock: 12,
          price: 3.50,
          entryDate: '2025-07-05',
          status: 'expiring_soon'
        },
      ],
      sales: [
        {
          id: 1,
          date: '2025-07-06',
          time: '19:35',
          customer: 'Ríos Arévalo',
          quantity: 1,
          unitPrice: 3.00,
          productCode: 'CocaCo1314',
          product: 'COCA COLA 600ML',
          total: 3.00
        },
        {
          id: 2,
          date: '2025-07-06',
          time: '18:20',
          customer: 'García Mendoza',
          quantity: 2,
          unitPrice: 4.00,
          productCode: 'LecheGl1520',
          product: 'LECHE GLORIA TARRO',
          total: 8.00
        },
        {
          id: 3,
          date: '2025-07-06',
          time: '17:45',
          customer: 'Soto Vargas',
          quantity: 3,
          unitPrice: 2.50,
          productCode: 'AzucarRb1102',
          product: 'AZÚCAR RUBIA',
          total: 7.50
        },
        {
          id: 4,
          date: '2025-07-06',
          time: '16:30',
          customer: 'Pérez Silva',
          quantity: 1,
          unitPrice: 3.50,
          productCode: 'YogurtNt1205',
          product: 'YOGURT NATURAL',
          total: 3.50
        },
      ],
      purchases: [
        {
          id: 1,
          date: '2025-07-06',
          time: '19:35',
          supplier: 'AJE PERIS',
          quantity: 210,
          totalPrice: 300.00,
          productCode: 'CocaCo1314',
          product: 'COCA COLA 600ML',
          unitPrice: 1.43
        },
        {
          id: 2,
          date: '2025-07-06',
          time: '18:15',
          supplier: 'GLORIA S.A.',
          quantity: 150,
          totalPrice: 450.00,
          productCode: 'LecheGl1520',
          product: 'LECHE GLORIA TARRO',
          unitPrice: 3.00
        },
        {
          id: 3,
          date: '2025-07-05',
          time: '16:20',
          supplier: 'CASA GRANDE',
          quantity: 100,
          totalPrice: 180.00,
          productCode: 'AzucarRb1102',
          product: 'AZÚCAR RUBIA',
          unitPrice: 1.80
        },
        {
          id: 4,
          date: '2025-07-05',
          time: '14:30',
          supplier: 'LAIVE S.A.',
          quantity: 80,
          totalPrice: 200.00,
          productCode: 'YogurtNt1205',
          product: 'YOGURT NATURAL',
          unitPrice: 2.50
        },
      ]
    };
  } else {
    // Dashboard completamente limpio para nuevos usuarios
    return {
      users: [],
      suppliers: [],
      products: [],
      sales: [],
      purchases: []
    };
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  // Determinar si es el usuario de prueba
  const isTestUser = currentUser?.usuario === 'PRUEBAUSUARIO20';
  const initialData = getInitialData(isTestUser);
  
  const [users, setUsers] = useState<User[]>(initialData.users);
  const [suppliers, setSuppliers] = useState<Supplier[]>(initialData.suppliers);
  const [products, setProducts] = useState<Product[]>(initialData.products);
  const [sales, setSales] = useState<Sale[]>(initialData.sales);
  const [purchases, setPurchases] = useState<Purchase[]>(initialData.purchases);

  // Resetear dashboard cuando cambia el usuario
  useEffect(() => {
    const newData = getInitialData(isTestUser);
    setUsers(newData.users);
    setSuppliers(newData.suppliers);
    setProducts(newData.products);
    setSales(newData.sales);
    setPurchases(newData.purchases);
  }, [currentUser]);

  const resetDashboard = () => {
    setUsers([]);
    setSuppliers([]);
    setProducts([]);
    setSales([]);
    setPurchases([]);
  };

  // CRUD Operations for Users
  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
      ...userData,
      id: Date.now()
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: number, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  // CRUD Operations for Suppliers
  const addSupplier = (supplierData: Omit<Supplier, 'id'>) => {
    const newSupplier = {
      ...supplierData,
      id: Date.now()
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const updateSupplier = (id: number, supplierData: Partial<Supplier>) => {
    setSuppliers(prev => prev.map(supplier => 
      supplier.id === id ? { ...supplier, ...supplierData } : supplier
    ));
  };

  const deleteSupplier = (id: number) => {
    setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
  };

  // CRUD Operations for Products
  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...productData } : product
    ));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  // CRUD Operations for Sales
  const addSale = (saleData: Omit<Sale, 'id'>) => {
    const newSale = {
      ...saleData,
      id: Date.now()
    };
    setSales(prev => [...prev, newSale]);
    
    // Actualizar stock del producto
    updateProductStock(saleData.product, saleData.quantity, 'subtract');
  };

  const deleteSale = (id: number) => {
    const sale = sales.find(s => s.id === id);
    if (sale) {
      // Restaurar stock del producto
      updateProductStock(sale.product, sale.quantity, 'add');
    }
    setSales(prev => prev.filter(sale => sale.id !== id));
  };

  // CRUD Operations for Purchases
  const addPurchase = (purchaseData: Omit<Purchase, 'id'>) => {
    const newPurchase = {
      ...purchaseData,
      id: Date.now()
    };
    setPurchases(prev => [...prev, newPurchase]);
    
    // Actualizar stock del producto
    updateProductStock(purchaseData.product, purchaseData.quantity, 'add');
  };

  const deletePurchase = (id: number) => {
    const purchase = purchases.find(p => p.id === id);
    if (purchase) {
      // Reducir stock del producto
      updateProductStock(purchase.product, purchase.quantity, 'subtract');
    }
    setPurchases(prev => prev.filter(purchase => purchase.id !== id));
  };

  const updateProductStock = (productName: string, quantity: number, operation: 'add' | 'subtract') => {
    setProducts(prev => prev.map(product => {
      if (product.name === productName) {
        const newStock = operation === 'add' 
          ? product.stock + quantity 
          : product.stock - quantity;
        
        const newStatus = newStock <= 10 ? 'low_stock' : 'normal';
        
        return {
          ...product,
          stock: Math.max(0, newStock),
          status: newStatus
        };
      }
      return product;
    }));
  };

  // Import Functions
  const importUsers = (userData: any[]) => {
    const newUsers = userData.map((user, index) => ({
      id: Date.now() + index,
      name: user.Nombre || user.name || '',
      lastName: user.Apellidos || user.lastName || '',
      email: user.Email || user.email || '',
      role: user.Cargo || user.role || '',
      status: user.Estado || user.status || 'active',
      joinDate: user['Fecha de Ingreso'] || user.joinDate || new Date().toISOString().split('T')[0]
    }));
    setUsers(prev => [...prev, ...newUsers]);
  };

  const importSuppliers = (supplierData: any[]) => {
    const newSuppliers = supplierData.map((supplier, index) => ({
      id: Date.now() + index,
      companyName: supplier['Razón Social'] || supplier.companyName || '',
      ruc: supplier.RUC || supplier.ruc || '',
      email: supplier.Email || supplier.email || '',
      phone: supplier.Teléfono || supplier.phone || '',
      contact: supplier.Contacto || supplier.contact || '',
      product: supplier.Producto || supplier.product || '',
      status: supplier.Estado || supplier.status || 'active'
    }));
    setSuppliers(prev => [...prev, ...newSuppliers]);
  };

  const importProducts = (productData: any[]) => {
    const newProducts = productData.map((product, index) => ({
      id: Date.now() + index,
      name: product.Producto || product.name || '',
      expiryDate: product['Fecha de Vencimiento'] || product.expiryDate || '',
      supplier: product.Proveedor || product.supplier || '',
      category: product.Categoría || product.category || '',
      stock: parseInt(product.Stock || product.stock || '0'),
      price: parseFloat(product.Precio || product.price || '0'),
      entryDate: product['Fecha de Ingreso'] || product.entryDate || new Date().toISOString().split('T')[0],
      status: parseInt(product.Stock || product.stock || '0') <= 10 ? 'low_stock' : 'normal'
    }));
    setProducts(prev => [...prev, ...newProducts]);
  };

  const importSales = (salesData: any[]) => {
    const newSales = salesData.map((sale, index) => ({
      id: Date.now() + index,
      date: sale.Fecha || sale.date || new Date().toISOString().split('T')[0],
      time: sale.Hora || sale.time || new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      customer: sale.Cliente || sale.customer || '',
      quantity: parseInt(sale.Cantidad || sale.quantity || '0'),
      unitPrice: parseFloat(sale['Precio Unitario'] || sale.unitPrice || '0'),
      productCode: sale['Código Producto'] || sale.productCode || '',
      product: sale.Producto || sale.product || '',
      total: parseFloat(sale.Total || sale.total || '0')
    }));
    setSales(prev => [...prev, ...newSales]);
  };

  const importPurchases = (purchaseData: any[]) => {
    const newPurchases = purchaseData.map((purchase, index) => ({
      id: Date.now() + index,
      date: purchase.Fecha || purchase.date || new Date().toISOString().split('T')[0],
      time: purchase.Hora || purchase.time || new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      supplier: purchase.Proveedor || purchase.supplier || '',
      quantity: parseInt(purchase.Cantidad || purchase.quantity || '0'),
      totalPrice: parseFloat(purchase['Precio Total'] || purchase.totalPrice || '0'),
      productCode: purchase['Código Producto'] || purchase.productCode || '',
      product: purchase.Producto || purchase.product || '',
      unitPrice: parseFloat(purchase['Precio Unitario'] || purchase.unitPrice || '0')
    }));
    setPurchases(prev => [...prev, ...newPurchases]);
  };

  const value: AppContextType = {
    users,
    suppliers,
    products,
    sales,
    purchases,
    currentUser,
    addUser,
    addSupplier,
    addProduct,
    addSale,
    addPurchase,
    updateProductStock,
    setCurrentUser,
    resetDashboard,
    updateUser,
    deleteUser,
    updateSupplier,
    deleteSupplier,
    updateProduct,
    deleteProduct,
    deleteSale,
    deletePurchase,
    importUsers,
    importSuppliers,
    importProducts,
    importSales,
    importPurchases
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};