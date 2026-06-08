import React, { useRef, useState } from 'react';
import { Camera, Mail, BriefcaseBusiness } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import avatar from '../../../assets/images/avatar.png';
import AvatarCropperModal from './AvatarCropperModal';
import { useLanguage } from '../../../contexts/LanguageContext';

const ProfileOverviewCard = ({ user, onEditProfile, onAvatarUpload, isUploadingAvatar }) => {
  const fileInputRef = useRef(null);
  const { t } = useLanguage();
  const [isCropperOpen, setIsCropperOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleAvatarClick = () => {
    if (isUploadingAvatar) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setIsCropperOpen(true);
    }
    // Reset file input
    if (e.target) {
      e.target.value = '';
    }
  };

  const handleCropComplete = (croppedFile) => {
    if (onAvatarUpload) {
      onAvatarUpload(croppedFile);
    }
    handleCloseCropper();
  };

  const handleCloseCropper = () => {
    setIsCropperOpen(false);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
  };

  const avatarSrc = user?.avatar_url || avatar;

  return (
    <Card className="!p-6 md:!p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar dengan camera overlay */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-bg-secondary border-4 border-white shadow-md relative">
            {isUploadingAvatar && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                <span className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
              </div>
            )}
            <img
              src={avatarSrc}
              alt={user?.name || 'User Avatar'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Camera overlay untuk upload foto */}
          <button
            onClick={handleAvatarClick}
            disabled={isUploadingAvatar}
            className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center cursor-pointer disabled:cursor-not-allowed"
            aria-label={t.profile.uploadAvatarLabel}
          >
            {!isUploadingAvatar && (
              <Camera
                size={20}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            aria-hidden="true"
          />
          {/* Online indicator dot */}
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-success rounded-full border-2 border-white" />
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-title font-bold text-primary-text truncate">
                {user?.name || 'Franz Hermann'}
              </h2>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                <span className="flex items-center gap-1.5 text-body-sm text-secondary-text">
                  <BriefcaseBusiness size={14} className="shrink-0" />
                  {user?.role || 'Full Stack Developer'}
                </span>
                <span className="flex items-center gap-1.5 text-body-sm text-secondary-text">
                  <Mail size={14} className="shrink-0" />
                  {user?.email || 'hello@example.com'}
                </span>

              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {user?.status || t.profile.openToWork}
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button
              variant="outline"
              className="shrink-0 self-start"
              onClick={onEditProfile}
            >
              {t.profile.editProfile}
            </Button>
          </div>
        </div>
      </div>

      <AvatarCropperModal
        isOpen={isCropperOpen}
        onClose={handleCloseCropper}
        imageSrc={selectedImage}
        onCropComplete={handleCropComplete}
      />
    </Card>
  );
};

export default ProfileOverviewCard;
