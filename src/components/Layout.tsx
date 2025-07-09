@@ .. @@
 import React from 'react';
-import { Link, useLocation } from 'react-router-dom';
+import { Link, useLocation, useNavigate } from 'react-router-dom';
+import { useAppContext } from '../context/AppContext';
 import { 
   LayoutDashboard, 
   Users, 
@@ .. @@
 
 const Layout: React.FC<LayoutProps> = ({ children }) => {
   const location = useLocation();
+  const navigate = useNavigate();
+  const { setCurrentUser } = useAppContext();
+
+  const handleLogout = () => {
+    setCurrentUser(null);
+    localStorage.removeItem('currentUser');
+    navigate('/');
+  };
 
   const menuItems = [
@@ .. @@
         <div className="absolute bottom-4 left-4 right-4">
-          <Link
-            to="/"
+          <button
+            onClick={handleLogout}
             className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-400/20 hover:text-red-300 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/30"
           >
             <LogOut className="w-5 h-5" />
             <span className="text-sm">Cerrar Sesión</span>
-          </Link>
+          </button>
         </div>