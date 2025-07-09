@@ .. @@
   const getStatusText = (status: string) => {
     switch (status) {
       case 'low_stock':
         return 'Stock Bajo';
       case 'expiring_soon':
         return 'Por Vencer';
+      case 'expired':
+        return 'Vencido';
       default:
         return 'Normal';
     }
   };