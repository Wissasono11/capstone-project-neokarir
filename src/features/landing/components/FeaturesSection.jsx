import React from 'react';
import { motion } from 'framer-motion';
import Card from '../../../components/ui/Card';
import { staggerContainerVariants as containerVariants, fadeInUpItemVariants as itemVariants } from '../../../utils/animations';

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background border-t border-border">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-4">What service NeoKarir offer?</h2>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto leading-relaxed">
            We use advanced AI to map your potential and provide actionable guidance, not just generic advice.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="flex">
            <Card className="flex flex-col group hover:shadow-md transition-shadow duration-300 cursor-default w-full">
              <div className="w-12 h-12 bg-[#F0FDFA] rounded-2xl flex items-center justify-center mb-6 text-primary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#14B8A6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">AI Profiling</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-8 grow">
                Deep analysis of your experience and skills to discover the ideal career match you might not realize.
              </p>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="flex">
            <Card className="flex flex-col group hover:shadow-md transition-shadow duration-300 cursor-default w-full">
              <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 30C24.6274 30 30 24.6274 30 18C30 11.3726 24.6274 6 18 6C11.3726 6 6 11.3726 6 18C6 24.6274 11.3726 30 18 30Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18 25.2C21.9765 25.2 25.2 21.9765 25.2 18C25.2 14.0236 21.9765 10.8 18 10.8C14.0236 10.8 10.8 14.0236 10.8 18C10.8 21.9765 14.0236 25.2 18 25.2Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M18 20.4C19.3255 20.4 20.4 19.3255 20.4 18C20.4 16.6745 19.3255 15.6 18 15.6C16.6745 15.6 15.6 16.6745 15.6 18C15.6 19.3255 16.6745 20.4 18 20.4Z" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Skill Gap Analysis</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-8 grow">
                Identify the exact skills the market needs today and see what you need to learn to reach your dream role.
              </p>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants} className="flex">
            <Card className="flex flex-col group hover:shadow-md transition-shadow duration-300 cursor-default w-full">
              <div className="w-12 h-12 bg-[#FFF7ED] rounded-2xl flex items-center justify-center mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10 9H8" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 13H8" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M16 17H8" stroke="#F54900" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Smart CV Analyzer</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-8 grow">
                Get instant AI-powered feedback to optimize your CV to pass ATS systems and attract recruiters' attention.
              </p>
            </Card>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={itemVariants} className="flex">
            <Card className="flex flex-col group hover:shadow-md transition-shadow duration-300 cursor-default w-full">
              <div className="w-12 h-12 bg-[#EEF2FF] rounded-2xl flex items-center justify-center mb-6 text-primary">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" fill="none">
                  <path d="M11.5833 9.08333V14.0833M9.08333 11.5833H14.0833M2.41667 5.75H4.08333C5.00381 5.75 5.75 5.00381 5.75 4.08333V2.41667C5.75 1.49619 5.00381 0.75 4.08333 0.75H2.41667C1.49619 0.75 0.75 1.49619 0.75 2.41667V4.08333C0.75 5.00381 1.49619 5.75 2.41667 5.75ZM10.75 5.75H12.4167C13.3371 5.75 14.0833 5.00381 14.0833 4.08333V2.41667C14.0833 1.49619 13.3371 0.75 12.4167 0.75H10.75C9.82953 0.75 9.08333 1.49619 9.08333 2.41667V4.08333C9.08333 5.00381 9.82953 5.75 10.75 5.75ZM2.41667 14.0833H4.08333C5.00381 14.0833 5.75 13.3371 5.75 12.4167V10.75C5.75 9.82953 5.00381 9.08333 4.08333 9.08333H2.41667C1.49619 9.08333 0.75 9.82953 0.75 10.75V12.4167C0.75 13.3371 1.49619 14.0833 2.41667 14.0833Z" stroke="#155DFC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Interactive Dashboard</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-8 grow">
                Experience a centralized hub where you can track your skill progression, monitor applications, and visualize career growth.
              </p>
            </Card>
          </motion.div>

          {/* Card 5 */}
          <motion.div variants={itemVariants} className="flex">
            <Card className="flex flex-col group hover:shadow-md transition-shadow duration-300 cursor-default w-full">
              <div className="w-12 h-12 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M8 13V12M12 13V10M16 13V8M8 21L12 17L16 21M3 4H21M4 4H20V16C20 16.5523 19.5523 17 19 17H5C4.44772 17 4 16.5523 4 16V4Z" stroke="#00A63E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">Jobs Market</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-8 grow">
                Browse highly curated job opportunities that perfectly align with your verified skills and Job Match Score.
              </p>
            </Card>
          </motion.div>

          {/* Card 6 */}
          <motion.div variants={itemVariants} className="flex">
            <Card className="flex flex-col group hover:shadow-md transition-shadow duration-300 cursor-default w-full">
              <div className="w-12 h-12 bg-[#FDF2F8] rounded-2xl flex items-center justify-center mb-6 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M9.99996 9.16667H10.0083M13.3333 9.16667H13.3416M6.66663 9.16667H6.67496M18.3333 14.1667C18.3333 14.6087 18.1577 15.0326 17.8451 15.3452C17.5326 15.6577 17.1087 15.8333 16.6666 15.8333H5.68996C5.24797 15.8334 4.82411 16.0091 4.51163 16.3217L2.67663 18.1567C2.59388 18.2394 2.48846 18.2957 2.3737 18.3186C2.25894 18.3414 2.13999 18.3297 2.03188 18.2849C1.92378 18.2401 1.83138 18.1643 1.76636 18.067C1.70135 17.9697 1.66664 17.8553 1.66663 17.7383V4.16667C1.66663 3.72464 1.84222 3.30072 2.15478 2.98816C2.46734 2.67559 2.89127 2.5 3.33329 2.5H16.6666C17.1087 2.5 17.5326 2.67559 17.8451 2.98816C18.1577 3.30072 18.3333 3.72464 18.3333 4.16667V14.1667Z" stroke="#E60076" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-primary-text mb-3">24/7 AI Career Assistant</h3>
              <p className="text-sm text-secondary-text leading-relaxed mb-8 grow">
                Interact with our intelligent assistant anytime to get interview prep advice, resume feedback, and personalized strategies.
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
