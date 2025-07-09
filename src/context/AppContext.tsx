export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
   const [currentUser, setCurrentUser] = useState<any>(null);
   
   // Cargar usuario desde localStorage al inicializar
   useEffect(() => {
     const savedUser = localStorage.getItem('currentUser');
     if (savedUser) {
       try {
         setCurrentUser(JSON.parse(savedUser));
       } catch (error) {
         console.error('Error parsing saved user:', error);
         localStorage.removeItem('currentUser');
       }
     }
   }, []);

   // Determinar si es el usuario de prueba
   const isTestUser = currentUser?.usuario === 'PRUEBAUSUARIO20';
   const initialData = getInitialData(isTestUser);
}