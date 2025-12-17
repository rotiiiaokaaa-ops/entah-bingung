import React, { useState, useEffect } from 'react';
import Login from './Login';
import PhotoFrame from './PhotoFrame';
import MusicPlayer from './MusicPlayer';
import FloatingHearts from './FloatingHearts';
import LoveLetter from './LoveLetter';
import { DEFAULT_BOY_PHOTO, DEFAULT_GIRL_PHOTO } from '../constants';
import { Heart, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Initialize state from LocalStorage or Defaults
  const [boyName, setBoyName] = useState(() => localStorage.getItem('boyName') || "Cowok");
  const [girlName, setGirlName] = useState(() => localStorage.getItem('girlName') || "Cewek");
  
  // Photos stored in LocalStorage need to be Base64 to persist across refreshes properly
  // Falls back to defaults if nothing saved
  const [boyPhoto, setBoyPhoto] = useState(() => localStorage.getItem('boyPhoto') || DEFAULT_BOY_PHOTO);
  const [girlPhoto, setGirlPhoto] = useState(() => localStorage.getItem('girlPhoto') || DEFAULT_GIRL_PHOTO);
  
  const [loveLetter, setLoveLetter] = useState(() => localStorage.getItem('loveLetter') || "");

  // Persistence Effects
  useEffect(() => { localStorage.setItem('boyName', boyName); }, [boyName]);
  useEffect(() => { localStorage.setItem('girlName', girlName); }, [girlName]);
  useEffect(() => { localStorage.setItem('boyPhoto', boyPhoto); }, [boyPhoto]);
  useEffect(() => { localStorage.setItem('girlPhoto', girlPhoto); }, [girlPhoto]);
  useEffect(() => { localStorage.setItem('loveLetter', loveLetter); }, [loveLetter]);

  const handleLogin = (email: string, adminStatus: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(adminStatus);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  // Helper to convert file to Base64 for LocalStorage storage
  const convertToBase64 = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBoyPhotoChange = (file: File) => {
    convertToBase64(file, (base64) => setBoyPhoto(base64));
  };

  const handleGirlPhotoChange = (file: File) => {
    convertToBase64(file, (base64) => setGirlPhoto(base64));
  };

  if (!isLoggedIn) {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 overflow-hidden">
        <FloatingHearts />
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 pb-20">
      <FloatingHearts />
      <MusicPlayer />

      {/* Admin Status Bar */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
        <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${isAdmin ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
          {isAdmin ? "Mode Admin" : "Tampilan Pengunjung"}
        </div>
        <button 
          onClick={handleLogout}
          className="p-2 bg-white/80 rounded-full hover:bg-white text-pink-500 transition-colors shadow-sm"
          title="Keluar"
        >
          <LogOut size={20} />
        </button>
      </div>

      <header className="pt-10 pb-6 text-center relative z-10">
        <h1 className="font-handwriting text-5xl md:text-7xl text-pink-600 drop-shadow-sm">
          Kisah Cinta Kita
        </h1>
        <p className="mt-4 text-gray-600 font-light flex items-center justify-center gap-2">
          <span className="h-px w-12 bg-pink-300"></span>
          <span>Selamanya & Abadi</span>
          <span className="h-px w-12 bg-pink-300"></span>
        </p>
      </header>

      <main className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4 items-center justify-center max-w-4xl mx-auto mt-8">
          
          {/* Boy Frame */}
          <div className="md:order-1">
            <PhotoFrame 
              photo={boyPhoto}
              name={boyName}
              onNameChange={setBoyName}
              label="Si Ganteng"
              color="blue"
              isEditable={isAdmin}
              onPhotoChange={handleBoyPhotoChange}
            />
          </div>

          {/* Center Connector (Desktop) */}
          <div className="hidden md:flex justify-center items-center md:order-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
             <div className="bg-white p-3 rounded-full shadow-lg border-2 border-pink-200 animate-pulse">
               <Heart className="text-pink-500 fill-current w-8 h-8" />
             </div>
          </div>

          {/* Girl Frame */}
          <div className="md:order-3">
            <PhotoFrame 
              photo={girlPhoto}
              name={girlName}
              onNameChange={setGirlName}
              label="Si Cantik"
              color="pink"
              isEditable={isAdmin}
              onPhotoChange={handleGirlPhotoChange}
            />
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center mt-12 mb-8">
           {isAdmin ? (
             <p className="text-sm text-pink-600 bg-pink-100 inline-block px-4 py-1 rounded-full border border-pink-200 font-medium">
               👑 Mode Admin: Klik foto untuk mengganti & edit nama langsung!
             </p>
           ) : (
             <p className="text-sm text-gray-500 bg-white/50 inline-block px-4 py-1 rounded-full border border-gray-200">
               ✨ Kamu sedang melihat halaman pasangan bahagia ini.
             </p>
           )}
        </div>

        {/* AI Generator */}
        <LoveLetter 
          boyName={boyName} 
          girlName={girlName} 
          isEditable={isAdmin}
          savedContent={loveLetter}
          onContentSave={setLoveLetter}
        />

      </main>

      <footer className="text-center py-8 text-gray-400 text-sm relative z-10">
        <p>Dibuat dengan ❤️ menggunakan React & Gemini</p>
      </footer>
    </div>
  );
};

export default App;