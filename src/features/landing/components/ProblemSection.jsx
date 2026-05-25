import React from 'react';
import { motion } from 'framer-motion';
import { staggerContainerVariants as containerVariants, fadeInUpItemVariants as itemVariants } from '../../../utils/animations';
import card1Img from '../../../assets/images/card-1-ps.webp';
import card3Img from '../../../assets/images/card-3-ps.webp';
import card5Img from '../../../assets/images/card-5-ps.webp';

const ProblemSection = () => {
  return (
    <section id="solutions" className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-primary-text mb-4 tracking-tight">Mengapa Anda Membutuhkan NeoKarir?</h2>
          <p className="text-lg text-secondary-text max-w-3xl mx-auto leading-relaxed">
            Gap antara ketersediaan talenta dan kebutuhan industri semakin besar. Kami hadir untuk menghilangkan ketidakpastian dan kebingungan dalam merencanakan karier Anda.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 min-h-[600px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 relative rounded-[24px] overflow-hidden group">
            <img
              src={card1Img}
              alt="Information overload and confusing charts"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width="600"
              height="280"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 bg-[#1F2937] rounded-[24px] p-8 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-700/30 rounded-bl-full -mr-10 -mt-10 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">
                Sistem Rekrutmen yang Kaku <span className="block text-gray-400 text-lg mt-1 font-medium">(Tembok ATS)</span>
              </h3>
              <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                Banyak talenta hebat ditolak oleh sistem otomatis (ATS) sebelum CV mereka dibaca oleh manusia. AI Cerdas kami menganalisis dan mengungkap kriteria tersembunyi sehingga profil Anda selalu relevan.
              </p>
            </div>
          </motion.div>

          {/* Card 3 (Right Tall - Image) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2 relative rounded-[24px] overflow-hidden group">
            <img
              src={card3Img}
              alt="Looking up at corporate buildings"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width="300"
              height="580"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60"></div>
          </motion.div>

          {/* Card 4 (Bottom Left - Primary Color Text Card) */}
          <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1 bg-primary rounded-[24px] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-center gap-4 max-w-lg">
              <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                Terjebak Banjir Informasi
              </h3>
              <p className="text-base lg:text-lg text-indigo-100 leading-relaxed">
                Terlalu banyak bootcamp, kursus, dan tutorial yang seringkali hanya membuang waktu dan uang tanpa arah yang jelas. Kami memotong kebisingan dengan roadmap visual 100% yang dipersonalisasi dengan fokus hanya pada keterampilan yang benar-benar Anda butuhkan.
              </p>
            </div>
          </motion.div>

          {/* Card 5 (Bottom Middle - Small Image) */}
          <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1 relative rounded-[24px] overflow-hidden group">
            <img
              src={card5Img}
              alt="Messy desk with papers and coffee"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              width="300"
              height="280"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
