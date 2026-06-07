import { User, Target, BriefcaseBusiness, Code, Edit2, Save, X, Plus, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCVDataCard } from '../hooks/useCVDataCard';
import { EXPERIENCE_LEVELS, EDUCATION_LEVELS } from '../data/onboardingData';

const CVDataCard = ({ cvData, updateCvData }) => {
  const {
    isEditing,
    editedData,
    newSkill,
    setNewSkill,
    setEditedData,
    handleToggleEdit,
    handleSave,
    handleAddSkill,
    handleRemoveSkill
  } = useCVDataCard(cvData, updateCvData);

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm overflow-hidden relative">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h3 className="text-lg font-bold text-primary-text">Hasil Ekstrasi CV</h3>
        <button
          onClick={handleToggleEdit}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isEditing 
              ? 'bg-bg-secondary text-secondary-text hover:bg-border' 
              : 'text-primary hover:bg-primary/5'
          }`}
        >
          {isEditing ? (
            <><X size={16} />Batal</>
          ) : (
            <><Edit2 size={16} />Edit Info</>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-secondary-text">
            <User size={16} />
            <span className="text-xs font-semibold tracking-wider">Nama Lengkap</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedData.fullName}
              onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium"
            />
          ) : (
            <p className="text-primary-text font-semibold pl-6">{cvData.fullName}</p>
          )}
        </div>

        {/* Domain & Role Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-secondary-text">
              <Target size={16} />
              <span className="text-xs font-semibold tracking-wider">Target Domain</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedData.targetDomain}
                onChange={(e) => setEditedData({ ...editedData, targetDomain: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium"
              />
            ) : (
              <p className={`font-semibold pl-6 ${cvData.targetDomain ? 'text-primary-text' : 'text-secondary-text italic'}`}>
                {cvData.targetDomain || 'Belum terdeteksi — silakan edit manual'}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-secondary-text">
              <BriefcaseBusiness size={16} />
              <span className="text-xs font-semibold tracking-wider">Target Role</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedData.targetRole}
                onChange={(e) => setEditedData({ ...editedData, targetRole: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium"
              />
            ) : (
              <p className={`font-semibold pl-6 ${cvData.targetRole ? 'text-primary-text' : 'text-secondary-text italic'}`}>
                {cvData.targetRole || 'Belum terdeteksi — silakan edit manual'}
              </p>
            )}
          </div>
        </div>

        {/* Experience & Education Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-secondary-text">
              <BriefcaseBusiness size={16} />
              <span className="text-xs font-semibold tracking-wider">Pengalaman Kerja</span>
            </div>
            {isEditing ? (
              <select
                value={editedData.experience || ''}
                onChange={(e) => setEditedData({ ...editedData, experience: e.target.value })}
                className="w-full px-3 pr-10 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium bg-white truncate"
              >
                {!editedData.experience && <option value="">-- Pilih Pengalaman --</option>}
                {EXPERIENCE_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            ) : (
              <p className={`font-semibold pl-6 ${cvData.experience ? 'text-primary-text' : 'text-secondary-text italic'}`}>
                {cvData.experience || 'Belum terdeteksi — silakan edit manual'}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-secondary-text">
              <GraduationCap size={16} />
              <span className="text-xs font-semibold tracking-wider">Pendidikan Terakhir</span>
            </div>
            {isEditing ? (
              <select
                value={editedData.education || ''}
                onChange={(e) => setEditedData({ ...editedData, education: e.target.value })}
                className="w-full px-3 pr-10 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium bg-white truncate"
              >
                {!editedData.education && <option value="">-- Pilih Pendidikan --</option>}
                {EDUCATION_LEVELS.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            ) : (
              <p className={`font-semibold pl-6 ${cvData.education ? 'text-primary-text' : 'text-secondary-text italic'}`}>
                {cvData.education || 'Belum terdeteksi — silakan edit manual'}
              </p>
            )}
          </div>
        </div>

        {/* Skills Field */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-secondary-text">
            <Code size={16} />
            <span className="text-xs font-semibold tracking-wider">Tech Stacks Terdeteksi</span>
          </div>
          
          <div className="flex flex-wrap gap-2 pl-6">
            <AnimatePresence>
              {(isEditing ? editedData.skills : cvData.skills).map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium border transition-all ${
                    isEditing 
                      ? 'bg-white border-border text-primary-text' 
                      : 'bg-primary/5 border-primary/10 text-primary'
                  }`}
                >
                  {skill}
                  {isEditing && (
                    <button 
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-secondary-text hover:text-error focus:outline-none transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </motion.span>
              ))}
            </AnimatePresence>
            
            {isEditing && (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  placeholder="Add skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  className="w-32 px-2 py-1 text-xs rounded-lg border border-border focus:border-primary outline-none"
                />
                <button
                  onClick={handleAddSkill}
                  className="p-1 rounded-lg bg-primary text-white hover:bg-primary-hover transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-4 flex justify-end"
          >
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <Save size={18} />
              Simpan Perubahan
            </button>
          </motion.div>
        )}
      </div>
      
      {/* Decorative gradient element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />
    </div>
  );
};

export default CVDataCard;
