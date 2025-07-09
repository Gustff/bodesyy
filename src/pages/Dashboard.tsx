@@ .. @@
 const Dashboard = () => {
   const { products, sales, users, currentUser } = useAppContext();
 
+  // Verificar autenticación
+  if (!currentUser) {
+    return (
+      <Layout>
+        <div className="p-8">
+          <div className="text-center py-16">
+            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sesión no válida</h2>
+            <p className="text-gray-600 mb-8">Por favor, inicia sesión para acceder al dashboard.</p>
+            <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
+              Ir a Login
+            </Link>
+          </div>
+        </div>
+      </Layout>
+    );
+  }
+
   // Calcular estadísticas dinámicas