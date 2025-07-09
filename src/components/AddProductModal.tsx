@@ .. @@
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
-    const status = parseInt(formData.stock) <= 10 ? 'low_stock' : 'normal';
+    const stockNumber = parseInt(formData.stock);
+    const priceNumber = parseFloat(formData.price);
+    
+    // Validaciones adicionales
+    if (stockNumber < 0) {
+      alert('El stock no puede ser negativo');
+      return;
+    }
+    
+    if (priceNumber <= 0) {
+      alert('El precio debe ser mayor a 0');
+      return;
+    }
+    
+    // Verificar fecha de vencimiento
+    const expiryDate = new Date(formData.expiryDate);
+    const today = new Date();
+    const daysDiff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
+    
+    let status = 'normal';
+    if (stockNumber <= 10) {
+      status = 'low_stock';
+    } else if (daysDiff <= 7) {
+      status = 'expiring_soon';
+    }
     
     onSave({
       ...formData,
-      stock: parseInt(formData.stock),
-      price: parseFloat(formData.price),
+      stock: stockNumber,
+      price: priceNumber,
       status
     });