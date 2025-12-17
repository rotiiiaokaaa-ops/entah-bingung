import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Wand2, RefreshCw, PenLine } from 'lucide-react';

interface LoveLetterProps {
  boyName: string;
  girlName: string;
  isEditable: boolean;
  savedContent: string;
  onContentSave: (content: string) => void;
}

const LoveLetter: React.FC<LoveLetterProps> = ({ 
  boyName, 
  girlName, 
  isEditable,
  savedContent,
  onContentSave 
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateLetter = async () => {
    if (!process.env.API_KEY) {
      setError("API Key tidak ditemukan! Tidak bisa membuat surat cinta.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const prompt = `Buatkan sebuah cerita pendek atau puisi cinta yang sangat lucu, imut, dan romantis dalam Bahasa Indonesia untuk pasangan bernama ${boyName || "Cowok"} dan ${girlName || "Cewek"}. Buatlah jenaka, sebutkan hal-hal modern seperti hp atau makanan. Usahakan di bawah 100 kata.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response.text) {
        onContentSave(response.text);
      } else {
        setError("Gagal membuat surat. AI-nya lagi malu-malu.");
      }
    } catch (err) {
      console.error(err);
      setError("Ups! Ada masalah saat menghubungi satelit cinta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 border-pink-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-red-300 to-pink-300"></div>
      
      <div className="text-center mb-6">
        <h3 className="font-handwriting text-3xl text-pink-600 mb-2">Ramalan Cinta Kita</h3>
        <p className="text-gray-600 text-sm">
          {isEditable ? "Tulis pesan manismu sendiri atau minta bantuan AI!" : "Pesan spesial untuk pasangan bahagia."}
        </p>
      </div>

      {isEditable ? (
        // Tampilan Mode Edit (Admin)
        <div className="relative mb-6 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-purple-200 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
            <textarea
              value={savedContent}
              onChange={(e) => onContentSave(e.target.value)}
              placeholder="Tulis surat cinta, puisi, atau pesan lucu di sini secara manual..."
              className="relative w-full min-h-[200px] bg-white p-6 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 focus:outline-none transition-all font-serif text-lg text-gray-700 leading-relaxed resize-y placeholder:text-gray-300 placeholder:italic placeholder:font-sans"
            />
            <div className="absolute top-4 right-4 text-pink-300 pointer-events-none">
              <PenLine size={20} />
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">
              *Ketik manual di atas atau gunakan tombol AI di bawah
            </p>
        </div>
      ) : (
        // Tampilan Mode Baca (Pengunjung)
        savedContent ? (
          <div className="bg-white p-8 rounded-xl shadow-sm mb-6 transform rotate-1 border border-pink-100 relative">
             {/* Paper Texture Effect */}
            <div className="absolute inset-0 bg-orange-50 opacity-10 rounded-xl pointer-events-none"></div>
            
            <p className="text-gray-700 font-serif leading-relaxed whitespace-pre-line text-lg relative z-10">
              "{savedContent}"
            </p>
            <div className="mt-6 flex justify-end relative z-10">
              <HeartIcon color="#ec4899" />
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 italic mb-6 py-8 border-2 border-dashed border-pink-100 rounded-xl">
            Belum ada surat cinta yang ditulis...
          </div>
        )
      )}

      {error && (
        <div className="text-red-500 text-center mb-4 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {isEditable && (
        <div className="text-center border-t border-pink-100 pt-6">
          <p className="text-xs text-gray-400 mb-3">Kehabisan kata-kata? Biarkan AI membantu:</p>
          <button
            onClick={generateLetter}
            disabled={loading}
            className="group relative inline-flex items-center justify-center px-6 py-2 text-base font-medium text-white transition-all duration-200 bg-pink-400 rounded-full hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-pink-300/50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Sedang Merangkai Kata...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                {savedContent ? "Buat Ulang dengan AI" : "Buat Otomatis dengan AI"}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

const HeartIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default LoveLetter;