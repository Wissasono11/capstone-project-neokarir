import { useState, useEffect } from 'react';

export const useCVDataCard = (cvData, updateCvData) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(cvData);
  const [newSkill, setNewSkill] = useState('');
  
  useEffect(() => {
    if (!isEditing) {
      setEditedData(cvData);
    }
  }, [cvData, isEditing]);

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
    updateCvData('techStack', editedData.techStack || editedData.skills);
    updateCvData('experience', editedData.experience);
    updateCvData('education', editedData.education);
    setIsEditing(false);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedData.skills.includes(newSkill.trim())) {
      const updatedSkills = [...editedData.skills, newSkill.trim()];
      setEditedData({
        ...editedData,
        skills: updatedSkills,
        techStack: updatedSkills
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = editedData.skills.filter(skill => skill !== skillToRemove);
    setEditedData({
      ...editedData,
      skills: updatedSkills,
      techStack: updatedSkills
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
