import React, { useState, useEffect } from 'react';
import { X, User, Hash, ArrowRight, AlertCircle } from 'lucide-react';
import Button from './Button';
import useEditorStore from '../../store/useEditorStore';

const IdentityModal = ({ isOpen, onClose, onComplete }) => {
  const { setUserProfile, clearProjectData } = useEditorStore();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isKnownUser, setIsKnownUser] = useState(false);

  useEffect(() => {
    if (!id.trim()) {
      setIsKnownUser(false);
      setError('');
      return;
    }

    const knownUsers = JSON.parse(localStorage.getItem('kraft_known_users') || '[]');
    const exists = knownUsers.some(u => u.id === id.trim());
    setIsKnownUser(exists);
    
    if (exists) {
      const user = knownUsers.find(u => u.id === id.trim());
      setName(user.name);
      setError('User found! Welcome back.');
    } else {
      setError('');
    }
  }, [id]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanId = id.trim();
    if (!cleanId) return;
    
    const knownUsers = JSON.parse(localStorage.getItem('kraft_known_users') || '[]');
    const exists = knownUsers.some(u => u.id === cleanId);

    if (!exists) {
      // New user logic
      const newUser = { id: cleanId, name: name.trim() || 'Anonymous Designer' };
      localStorage.setItem('kraft_known_users', JSON.stringify([...knownUsers, newUser]));
      
      // Trigger tutorial for new users
      localStorage.removeItem('kraft_onboarded');
      
      // Clear previous project data for a "New Editor" experience
      localStorage.removeItem('kraft-save');
    } else {
      // Returning user
      localStorage.setItem('kraft_onboarded', 'true');
    }

    // Save to store
    setUserProfile({
      id: cleanId,
      name: name.trim() || 'Anonymous Designer',
      avatarSeed: name.trim() || cleanId
    });
    
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-ivory border-4 border-black w-full max-w-md relative overflow-hidden solid-shadow-lg">
        {/* Header */}
        <div className="bg-orange border-b-4 border-black p-6 flex justify-between items-center">
          <h2 className="font-editorial text-3xl font-bold text-black">Who are you?</h2>
          <button onClick={onClose} className="hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="flex items-center gap-2 font-bold uppercase text-sm tracking-widest text-gray-700">
              <Hash size={16} /> Unique ID
            </label>
            <input
              type="text"
              required
              placeholder="e.g. adnan-01"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`w-full bg-white border-4 border-black p-4 font-bold text-lg focus:outline-none focus:ring-4 transition-all placeholder:text-gray-300 ${isKnownUser ? 'focus:ring-green-400/30' : 'focus:ring-teal/30'}`}
            />
            {error && (
              <p className={`text-xs font-black uppercase flex items-center gap-1 ${isKnownUser ? 'text-green-600' : 'text-red-500'}`}>
                <AlertCircle size={12} /> {error}
              </p>
            )}
            <p className="text-xs text-gray-500 font-medium italic">This ID connects your designs to your session.</p>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 font-bold uppercase text-sm tracking-widest text-gray-700">
              <User size={16} /> Display Name
            </label>
            <input
              type="text"
              placeholder="e.g. Adnan Ashraf"
              value={name}
              disabled={isKnownUser}
              onChange={(e) => setName(e.target.value)}
              className={`w-full bg-white border-4 border-black p-4 font-bold text-lg focus:outline-none focus:ring-4 focus:ring-mustard/30 transition-all placeholder:text-gray-300 ${isKnownUser ? 'opacity-50' : ''}`}
            />
            <p className="text-xs text-gray-500 font-medium italic">
              {isKnownUser ? "Your name is linked to this ID." : "Just a formality, it looks better with a name!"}
            </p>
          </div>

          <div className="pt-4">
            <Button 
              variant="editorial" 
              className="w-full py-5 text-xl flex items-center justify-center gap-3" 
              type="submit"
              icon={ArrowRight}
            >
              {isKnownUser ? 'Continue to Editor' : 'Start Fresh Editor'}
            </Button>
          </div>
        </form>

        {/* Decorative corner */}
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-teal border-4 border-black rotate-45" />
      </div>
    </div>
  );
};

export default IdentityModal;
