import { motion, AnimatePresence } from "motion/react";

interface NewspaperLoadingProps {
  lang: "en" | "id";
  progressStep: number;
}

const stepsID = [
  "Menghubungi portal berita...",
  "Mengunduh muatan HTML artikel...",
  "Mengekstrak paragraf teks utama...",
  "Memproses narasi klaim di mesin AI...",
  "Mengurai pembingkaian (editorial framing)...",
  "Mengidentifikasi pembicara yang diabaikan...",
  "Memetakan konteks ke panggung global...",
  "Menyusun daftar pertanyaan kritis..."
];

const stepsEN = [
  "Contacting source server...",
  "Downloading article HTML payload...",
  "Extracting primary body paragraphs...",
  "Feeding claims into the AI engine...",
  "Deconstructing editorial framing bias...",
  "Identifying omitted perspectives...",
  "Mapping context onto global coverage...",
  "Drafting critical investigative questions..."
];

export default function NewspaperLoading({ lang, progressStep }: NewspaperLoadingProps) {
  const steps = lang === "id" ? stepsID : stepsEN;
  const currentMessage = steps[Math.min(progressStep, steps.length - 1)];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 max-w-xl mx-auto text-center" id="printing-press-loader">
      {/* Skeuomorphic Printing Press Roller Animation */}
      <div className="relative w-48 h-28 bg-paper-200 border-4 border-bronze-500 rounded-lg shadow-lg flex items-center justify-center overflow-hidden mb-8">
        
        {/* Rolling gears background */}
        <div className="absolute top-2 left-2 w-10 h-10 border-4 border-dashed border-bronze-200 rounded-full animate-spin duration-3000"></div>
        <div className="absolute bottom-2 right-2 w-14 h-14 border-4 border-dashed border-bronze-200 rounded-full animate-spin duration-1000"></div>

        {/* Paper feeder sheet escaping */}
        <motion.div
          animate={{ y: [-40, 40], opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="absolute bg-white px-2 py-1 shadow-md w-24 h-12 text-center text-[5px] font-mono leading-none border border-gray-300 transform -rotate-12"
        >
          <div className="h-1 bg-gray-400 w-full mb-1"></div>
          <div className="h-[2px] bg-charcoal-700 w-full mb-1"></div>
          <div className="h-[2px] bg-charcoal-700 w-4/5 mb-1"></div>
          <div className="h-[2px] bg-bronze-500 w-3/4"></div>
        </motion.div>

        {/* Press Rollers */}
        <div className="absolute top-1/2 left-0 right-0 h-4 bg-bronze-800 shadow-inner z-10"></div>
        <div className="absolute top-[45%] left-4 right-4 h-2 bg-bronze-200 opacity-60 rounded-full blur-[1px]"></div>
      </div>

      <h3 className="font-serif text-xl italic text-bronze-800 animate-pulse mb-3 select-none">
        {lang === "id" ? "Mesin Cetak Sedang Berjalan..." : "The Press is Rolling..."}
      </h3>
      
      {/* Current phase indicator */}
      <div className="font-mono text-xs text-charcoal-700 uppercase tracking-widest bg-paper-100 px-4 py-1.5 rounded-full border border-paper-300 shadow-inner mb-6 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-bronze-500 animate-ping"></span>
        <span className="select-none">
          {lang === "id" ? `FASE ${progressStep + 1} HINGGA 8` : `PHASE ${progressStep + 1} OF 8`}
        </span>
      </div>

      {/* Detail explanation text */}
      <div className="h-12 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={progressStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-sans text-charcoal-900 leading-relaxed max-w-sm italic"
          >
            {currentMessage}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress timeline bars */}
      <div className="flex gap-1.5 mt-8 w-full max-w-xs">
        {steps.map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 flex-1 rounded transition-all duration-300 ${
              idx <= progressStep ? "bg-bronze-500 scale-y-110 shadow-sm" : "bg-paper-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
