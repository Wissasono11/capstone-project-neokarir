import React from 'react';
import { X, Plus, BrainCog, Loader2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import FormInput from '../../../components/ui/FormInput';
import Button from '../../../components/ui/Button';
import { BriefcaseBusiness, Target } from 'lucide-react';

const CareerSkillsTab = ({
  careerInfo,
  updateCareerInfo,
  addSkill,
  removeSkill,
  newSkill,
  setNewSkill,
  isReprocessing,
  handleReprocess
}) => {
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div
      role="tabpanel"
      id="tabpanel-career"
      aria-labelledby="tab-career"
      className="space-y-6 animate-fade-in"
    >
      {/* Career Information */}
      <Card className="!p-6 md:!p-8">
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          Informasi Karier
        </h3>
        <p className="text-body-sm text-secondary-text mb-6">
          Data ini digunakan AI untuk memberikan rekomendasi karier yang paling relevan.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormInput
            label="Posisi Saat Ini"
            id="career-current-role"
            placeholder="e.g. Full Stack Developer"
            icon={BriefcaseBusiness}
            value={careerInfo.currentRole}
            onChange={(e) => updateCareerInfo('currentRole', e.target.value)}
          />

          <FormInput
            label="Target Posisi"
            id="career-target-role"
            placeholder="e.g. Senior Full Stack Developer"
            icon={Target}
            value={careerInfo.targetRole}
            onChange={(e) => updateCareerInfo('targetRole', e.target.value)}
          />

          {/* Experience Level select */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label
              htmlFor="career-experience"
              className="text-sm font-semibold text-primary-text"
            >
              Level Pengalaman
            </label>
            <select
              id="career-experience"
              value={careerInfo.experienceLevel}
              onChange={(e) => updateCareerInfo('experienceLevel', e.target.value)}
              className="
                w-full rounded-xl border bg-white px-4 py-3 text-sm text-primary-text
                transition-all duration-200 outline-none appearance-none cursor-pointer
                border-border hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/10
              "
            >
              <option value="Fresh Graduate">Fresh Graduate</option>
              <option value="Junior (1-2 tahun)">Junior (1-2 tahun)</option>
              <option value="Mid-Level (3-5 tahun)">Mid-Level (3-5 tahun)</option>
              <option value="Senior (5+ tahun)">Senior (5+ tahun)</option>
              <option value="Lead / Manager">Lead / Manager</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Skills Section */}
      <Card className="!p-6 md:!p-8">
        <h3 className="text-body-lg font-bold text-primary-text mb-1">
          Keahlian (Skills)
        </h3>
        <p className="text-body-sm text-secondary-text mb-4">
          Tambah atau hapus skill untuk meningkatkan akurasi analisis gap.
        </p>

        {/* Skill chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {careerInfo.skills.map((skill) => (
            <span
              key={skill}
              className="
                inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                text-body-sm font-medium bg-primary-light text-primary
                transition-all duration-200 group
              "
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                className="p-0.5 rounded-full hover:bg-primary/10 transition-colors"
                aria-label={`Hapus skill ${skill}`}
              >
                <X size={12} className="text-primary/60 group-hover:text-primary" />
              </button>
            </span>
          ))}
        </div>

        {/* Add new skill */}
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              id="career-new-skill"
              placeholder="Tambah skill baru..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyPress}
              className="
                w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-primary-text
                placeholder:text-secondary-text/60
                transition-all duration-200 outline-none
                border-border hover:border-primary/30 focus:border-primary focus:ring-2 focus:ring-primary/10
              "
            />
          </div>
          <Button
            variant="secondary"
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
            className="shrink-0"
          >
            <Plus size={16} className="mr-1" />
            Tambah
          </Button>
        </div>
      </Card>

      {/* Reprocess with AI button */}
      <Card className="!p-6 md:!p-8 border-primary/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-body-lg font-bold text-primary-text flex items-center gap-2">
              Proses Ulang Data dengan AI
            </h3>
            <p className="text-body-sm text-secondary-text mt-1">
              Update profil karier kamu berdasarkan data terbaru menggunakan AI Career Profiling.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={handleReprocess}
            disabled={isReprocessing}
            className="shrink-0"
          >
            {isReprocessing ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Memproses...
              </>
            ) : (
              <>
                <BrainCog size={16} className="mr-2" />
                Reprocess with AI
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CareerSkillsTab;
