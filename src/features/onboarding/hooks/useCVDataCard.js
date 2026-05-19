import { useState } from 'react';

export const useCVDataCard = (cvData, updateCvData) => {
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

  return {
    isEditing,
    editedData,
    newSkill,
    setNewSkill,
    setEditedData,
    handleToggleEdit,
    handleSave,
    handleAddSkill,
    handleRemoveSkill
  };
};
