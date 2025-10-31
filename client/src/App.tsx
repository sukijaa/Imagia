import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { Toaster } from 'sonner'; // <-- 1. Import Sonner

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet /> 
      </main>
      <Toaster richColors closeButton /> {/* <-- 2. Add the component here */}
    </div>
  );
}

export default App;