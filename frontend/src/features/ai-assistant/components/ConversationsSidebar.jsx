import React, { useState } from 'react';
import { 
   Sparkles, 
   PanelLeftClose, 
   SquarePen, 
   Search, 
   X, 
   Trash2,
   MoreVertical,
   Pencil
} from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

const ConversationsSidebar = ({
  isHistoryOpen,
  setIsHistoryOpen,
  createNewSession,
  searchSessionQuery,
  setSearchSessionQuery,
  filteredSessions,
  activeSessionId,
  selectSession,
  deleteSession,
  renameSession
}) => {
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const { t } = useLanguage();

  const handleSaveRename = (id) => {
    if (editTitle.trim()) {
      renameSession(id, editTitle.trim());
    }
    setEditingSessionId(null);
  };

  const handleKeyDownRename = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveRename(id);
    } else if (e.key === 'Escape') {
      setEditingSessionId(null);
    }
  };

  return (
    <div 
      className={`absolute md:static inset-y-0 left-0 z-30 bg-white flex flex-col transition-all duration-300 ${
        isHistoryOpen 
          ? 'w-72 md:w-64 border-r border-slate-200/80 translate-x-0 opacity-100' 
          : 'w-0 border-none -translate-x-full overflow-hidden opacity-0 pointer-events-none'
      }`}
    >
      {/* Sidebar Header */}
      <div className="p-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5 text-slate-800">
          <Sparkles className="w-5.5 h-5.5 text-primary shrink-0 animate-pulse" />
          <span className="font-bold text-body-sm tracking-tight text-slate-800">Neobots</span>
        </div>
        <button 
          type="button"
          onClick={() => setIsHistoryOpen(false)}
          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          title={t.aiAssistant.hideHistory}
        >
          <PanelLeftClose className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* New Chat Button (Pill Shape) */}
      <div className="px-3.5 pb-2">
        <button
          onClick={createNewSession}
          className="w-full flex items-center justify-start gap-3 py-3 px-5 rounded-full bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 font-bold text-body-sm transition-all duration-200 cursor-pointer active:scale-[0.97]"
        >
          <SquarePen className="w-4.5 h-4.5 text-slate-500" />
          <span>{t.aiAssistant.newChat}</span>
        </button>
      </div>

      {/* Search Session Bar (Borderless) */}
      <div className="px-3.5 mb-2.5">
        <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-100/60 rounded-full transition-all duration-200">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input 
            type="text" 
            placeholder={t.aiAssistant.searchSessions} 
            value={searchSessionQuery}
            onChange={(e) => setSearchSessionQuery(e.target.value)}
            className="w-full bg-transparent border-none text-body-sm font-semibold text-slate-700 placeholder-slate-400 outline-none"
          />
          {searchSessionQuery && (
            <button onClick={() => setSearchSessionQuery('')} className="text-slate-400 hover:text-slate-600 shrink-0">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Section Header: Riwayat */}
      <div className="px-5 py-1 mb-1 text-caption font-semibold text-slate-400 tracking-wider select-none">
        {t.aiAssistant.history}
      </div>

      {/* Sessions List */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1 scrollbar-hide">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-6 text-body-sm font-medium text-slate-400">
            {t.aiAssistant.noChats}
          </div>
        ) : (
          filteredSessions.map((session) => {
            const isActive = session.id === activeSessionId;
            const isEditing = session.id === editingSessionId;
            return (
              <div
                key={session.id}
                onClick={() => !isEditing && selectSession(session.id)}
                className={`group relative flex items-center justify-between px-3 py-3 rounded-xl cursor-pointer transition-all duration-150 ${
                  isActive 
                    ? 'bg-primary-light/45 text-primary font-bold' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-6 flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      onBlur={() => handleSaveRename(session.id)}
                      onKeyDown={(e) => handleKeyDownRename(e, session.id)}
                      className="w-full bg-transparent border-none text-body-sm font-bold text-primary outline-none focus:ring-0 p-0"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <span className="text-body-sm font-semibold truncate leading-tight">
                      {session.title}
                    </span>
                  )}
                </div>

                {/* Dropdown Menu Trigger */}
                {!isEditing && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      setActiveDropdownId(activeDropdownId === session.id ? null : session.id);
                    }}
                    className={`p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 opacity-0 group-hover:opacity-100 ${
                      activeDropdownId === session.id ? 'opacity-100 bg-slate-100 text-slate-600' : ''
                    } transition-all duration-200 shrink-0 cursor-pointer`}
                    title={t.aiAssistant.options}
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Dropdown Menu Card */}
                {activeDropdownId === session.id && (
                  <>
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(null);
                      }}
                    />
                    <div className="absolute right-2 top-10 w-36 bg-white border border-slate-200/85 rounded-xl shadow-lg py-1 z-40 text-left">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSessionId(session.id);
                          setEditTitle(session.title);
                          setActiveDropdownId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-body-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t.aiAssistant.rename}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteSession(session.id, e);
                          setActiveDropdownId(null);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-body-sm font-bold text-rose-600 hover:bg-rose-50/50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                        <span>{t.aiAssistant.delete}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationsSidebar;
