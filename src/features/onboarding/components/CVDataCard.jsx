import React, { useState } from 'react';
import { User, Target, Briefcase, Code, Edit2, Check, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CVDataCard = ({ cvData, updateCvData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(cvData);
  const [newSkill, setNewSkill] = useState('');

  const handleToggleEdit = () => {
    if (isEditing) {
      setEditedData(cvData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    updateCvData('fullName', editedData.fullName);
    updateCvData('targetDomain', editedData.targetDomain);
    updateCvData('targetRole', editedData.targetRole);
    updateCvData('skills', editedData.skills);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedData.skills.includes(newSkill.trim())) {
      setEditedData({
        ...editedData,
        skills: [...editedData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedData({
      ...editedData,
      skills: editedData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm overflow-hidden relative">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <h3 className="text-lg font-bold text-primary-text">CV Result</h3>
        <button
          onClick={handleToggleEdit}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            isEditing 
              ? 'bg-bg-secondary text-secondary-text hover:bg-border' 
              : 'text-primary hover:bg-primary/5'
          }`}
        >
          {isEditing ? (
            <><X size={16} /> Cancel</>
          ) : (
            <><Edit2 size={16} /> Edit Info</>
          )}
        </button>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-secondary-text">
            <User size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Full Name</span>
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
              <span className="text-xs font-semibold uppercase tracking-wider">Target Domain</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedData.targetDomain}
                onChange={(e) => setEditedData({ ...editedData, targetDomain: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium"
              />
            ) : (
              <p className="text-primary-text font-semibold pl-6">{cvData.targetDomain}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-secondary-text">
              <Briefcase size={16} />
              <span className="text-xs font-semibold uppercase tracking-wider">Target Role</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedData.targetRole}
                onChange={(e) => setEditedData({ ...editedData, targetRole: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all text-primary-text font-medium"
              />
            ) : (
              <p className="text-primary-text font-semibold pl-6">{cvData.targetRole}</p>
            )}
          </div>
        </div>

        {/* Skills Field */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-secondary-text">
            <Code size={16} />
            <span className="text-xs font-semibold uppercase tracking-wider">Detected Skills</span>
          </div>
          
          <div className="flex flex-wrap gap-2 pl-6">
            <AnimatePresence>
              {(isEditing ? editedData.skills : cvData.skills).map((skill, index) => (
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
              <Check size={18} />
              Save Changes
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
