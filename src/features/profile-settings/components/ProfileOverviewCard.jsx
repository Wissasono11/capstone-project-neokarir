import React, { useRef } from 'react';
import { Camera, MapPin, Mail, Briefcase } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import avatar from '../../../assets/images/avatar.png';

const ProfileOverviewCard = ({ user, onEditProfile }) => {
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: Integrate with backend upload API
      console.log('File selected:', file.name);
    }
  };

  return (
    <Card className="!p-6 md:!p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Avatar dengan camera overlay */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-bg-secondary border-4 border-white shadow-md">
            <img
              src={avatar}
              alt={user?.name || 'User Avatar'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {/* Camera overlay untuk upload foto */}
          <button
            onClick={handleAvatarClick}
            className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Upload foto profil"
          >
            <Camera
              size={20}
              className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
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
                  <Briefcase size={14} className="shrink-0" />
                  {user?.role || 'Full Stack Developer'}
                </span>
                <span className="flex items-center gap-1.5 text-body-sm text-secondary-text">
                  <Mail size={14} className="shrink-0" />
                  {user?.email || 'hello@example.com'}
                </span>
                <span className="flex items-center gap-1.5 text-body-sm text-secondary-text">
                  <MapPin size={14} className="shrink-0" />
                  {user?.location || 'Yogyakarta, Indonesia'}
                </span>
              </div>

              {/* Status Badge */}
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-caption font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {user?.status || 'Open to Work'}
                </span>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Button
              variant="outline"
              className="shrink-0 self-start"
              onClick={onEditProfile}
            >
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileOverviewCard;
