import React, { useState, useEffect } from "react";
import {
  Feather,
  Newspaper,
  Search,
  FileText,
  AlertTriangle,
  Globe,
  HelpCircle,
  Trash2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Languages,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Info,
  Layers,
  Archive,
  BookOpenCheck
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NewspaperLoading from "./components/NewspaperLoading";
import { PRESET_ARTICLES, PresetArticle } from "./presets";
import { Report, HistoryItem } from "./types";

const TRANSLATIONS = {
  id: {
    title: "BIJAKBACA",
    tagline: "— SATU BERITA, BERAGAM SUDUT PANDANG — BACA LEBIH LUAS, PAHAMI LEBIH DALAM —",
    volumeMark: "VOL. 01 / NO. 12",
    editorialNotice: "DISUNTING UNTUK NEGARA HUKUM & WARGA CERDAS",
    priceTag: "HARGA: MEMBACA AKTIF",
    placeholder: "Tempel URL artikel berita di sini (https://...)...",
    buttonAnalyze: "Analisa Berita",
    buttonAnalyzing: "Mencetak...",
    quickLabels: [
      { text: "Jangkauan Global", label: "Global Coverage" },
      { text: "Perspektif Multidimensi", label: "Multiple Angles" },
      { text: "Analisis AI Instan", label: "Fast AI Scan" },
      { text: "Privasi Terjaga", label: "Privacy First" }
    ],
    presetHeader: "Atau pilih studi kasus siap baca langsung:",
    historyHeader: "Arsip Buku Kas Bijakbaca (Histori Lokal)",
    noHistory: "Belum ada riwayat analisa. Silakan masukkan URL berita di atas.",
    clearHistoryBtn: "Kosongkan Arsip",
    backToHome: "Analisa Berita Baru",
    bannerNarrative: "NARASI YANG DISUAPKAN",
    bannerOmission: "YANG MUNGKIN TERLEWAT",
    labelSummary: "1. Ringkasan Objektif",
    labelFraming: "2. Pembingkaian (Source Framing)",
    labelClaims: "3. Klaim-Klaim Utama",
    labelBlindSpots: "4. Titik Buta (Blind Spots)",
    labelGlobalContext: "5. Konteks Global",
    labelQuestions: "6. Pertanyaan Kritis",
    publisherLabel: "Sumber Penerbit:",
    copySuccess: "Laporan berhasil disalin ke papan klip!",
    copyBtn: "Salin Laporan",
    presetBadge: "STUDI KASUS PRESET",
    errorHeader: "Gangguan Telegraf (Gagal Membaca)",
    retryBtn: "Coba Lagi",
    orTryPreset: "Atau gunakan studi kasus siap baca kami yang dijamin lancar:",
    explainPrompt: "Sistem akan mengunjungi halaman web tersebut, memisahkan teks utama dari iklan, dan melakukan dekonstruksi media menggunakan model AI Gemini 3.5 secara objektif.",
    howItWorksTitle: "Pedoman Literasi Media Bijakbaca",
    stepsGuide: [
      {
        t: "1. Bebas Echo Chamber",
        d: "Kami tidak sekadar merangkum teks, melainkan membedah bias bahasa dan mengidentifikasi kepentingan di balik berita."
      },
      {
        t: "2. Menggali Yang Terlewat",
        d: "Setiap jurnalis memilih apa yang mau ditulis. Kami melengkapi narasi dengan membongkar titik buta (blind spots) sistemik."
      },
      {
        t: "3. Menantang Berita",
        d: "Disertai pertanyaan kritis untuk membantu Anda melakukan investigasi mandiri daripada menelan bulat-bulat."
      }
    ]
  },
  en: {
    title: "BIJAKBACA",
    tagline: "— ONE STORY, MULTIPLE PERSPECTIVES — READ WIDER, UNDERSTAND DEEPER —",
    volumeMark: "VOL. 01 / NO. 12",
    editorialNotice: "DEVOTED TO MEDIA LITERACY & COGNITIVE FREEDOM",
    priceTag: "PRICE: CRITICAL INQUIRY",
    placeholder: "Paste news article URL here (https://...)...",
    buttonAnalyze: "Examine Article",
    buttonAnalyzing: "Printing...",
    quickLabels: [
      { text: "Global Coverage", label: "Global Coverage" },
      { text: "Multiple Perspectives", label: "Multiple Angles" },
      { text: "Fast AI Analysis", label: "Fast AI Scan" },
      { text: "Privacy First", label: "Privacy First" }
    ],
    presetHeader: "Or check out a pre-loaded curated case study:",
    historyHeader: "Citizen Ledger (Your Local History Archive)",
    noHistory: "No articles archived. Paste an URL above to begin.",
    clearHistoryBtn: "Wipe Archive",
    backToHome: "Examine New Article",
    bannerNarrative: "CONVENTIONAL NARRATION",
    bannerOmission: "WHAT IS OMITTED / BEYOND",
    labelSummary: "1. Balanced Summary",
    labelFraming: "2. Editorial Source Framing",
    labelClaims: "3. Verified Main Claims",
    labelBlindSpots: "4. Overlooked Blind Spots",
    labelGlobalContext: "5. Regional & Global Context",
    labelQuestions: "6. Critical Investigative Questions",
    publisherLabel: "Publisher Source:",
    copySuccess: "Report copied to clipboard successfully!",
    copyBtn: "Copy Report",
    presetBadge: "PRE-LOADED CASE STUDY",
    errorHeader: "Telegraph Failure (Access Disrupted)",
    retryBtn: "Retry Engine",
    orTryPreset: "Or explore one of our curated case studies without waiting:",
    explainPrompt: "Our server will scrape the article text, strip ads and trackers, and perform a structural media analysis with Gemini 3.5 AI.",
    howItWorksTitle: "Bijakbaca Media Inquiry Guideline",
    stepsGuide: [
      {
        t: "1. Breach the Bias",
        d: "Instead of summarizing public relations, we identify selective labeling and narrative goals."
      },
      {
        t: "2. Recover Missing Voices",
        d: "Journalism is curated attention. We bring focus back to key perspectives that weren't invited to the page."
      },
      {
        t: "3. Power Citizen Inquiry",
        d: "Generate sharp, deep-seated questions that help you challenge statements rather than accepting authority."
      }
    ]
  }
};

export default function App() {
  const [lang, setLang] = useState<"id" | "en">("id");
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Current active report
  const [activeReport, setActiveReport] = useState<Report | null>(null);
  const [activeSourceUrl, setActiveSourceUrl] = useState<string | null>(null);
  const [isPreset, setIsPreset] = useState(false);

  // History states
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const t = TRANSLATIONS[lang];

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bijakbaca_history_v1");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Local storage history fetch failed", e);
    }
  }, []);

  // Save history on change
  const saveHistory = (newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("bijakbaca_history_v1", JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to commit history changes", e);
    }
  };

  const addToHistory = (url: string, report: Report) => {
    // Remove if duplicate URL exists already
    const cleaned = history.filter(item => item.url !== url && item.report.headline !== report.headline);
    const newItem: HistoryItem = {
      id: "hist-" + Date.now(),
      url,
      timestamp: new Date().toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }),
      report
    };
    const updated = [newItem, ...cleaned].slice(0, 15); // limit to 15
    saveHistory(updated);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = history.filter(item => item.id !== id);
    saveHistory(filtered);
  };

  const clearAllHistory = () => {
    if (window.confirm(lang === "id" ? "Apakah Anda yakin ingin menghapus seluruh log bacaan Anda?" : "Are you sure you want to completely wipe your archived reading ledger?")) {
      saveHistory([]);
    }
  };

  // Simulate progressive step timer to make skeuomorphic loading feel tactile and educational
  let stepIntervalId: any = null;
  const startProgressSimulation = (callback: () => void) => {
    setProgressStep(0);
    let step = 0;
    stepIntervalId = setInterval(() => {
      step += 1;
      if (step < 8) {
        setProgressStep(step);
      } else {
        clearInterval(stepIntervalId);
        callback();
      }
    }, 700);
  };

  const handlePresetSelect = (preset: PresetArticle) => {
    setErrorMsg(null);
    setLoading(true);
    setIsPreset(true);
    setActiveSourceUrl(preset.url);

    startProgressSimulation(() => {
      // Pick corresponding language report
      const report = preset.reports[lang] || preset.reports.id;
      setActiveReport(report);
      setLoading(false);
      addToHistory(preset.url, report);

      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById("newspaper-broadsheet")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  };

  const handleLiveAnalysis = async (urlToAnalyze?: string) => {
    const targetUrl = urlToAnalyze || inputUrl.trim();
    if (!targetUrl) return;

    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      setErrorMsg(lang === "id" ? "Silakan masukkan alamat URL web yang sah dengan protokol https:// atau http://" : "Please input a valid web URL starting with https:// or http://");
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    setIsPreset(false);
    setActiveSourceUrl(targetUrl);

    // Start loading stepper
    let fetchDone = false;
    let reportData: Report | null = null;
    let serverError: string | null = null;

    startProgressSimulation(() => {
      setLoading(false);
      if (serverError) {
        setErrorMsg(serverError);
      } else if (reportData) {
        setActiveReport(reportData);
        addToHistory(targetUrl, reportData);
        setTimeout(() => {
          document.getElementById("newspaper-broadsheet")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        setInputUrl("");
      } else {
        setErrorMsg(lang === "id" ? "Mengalami kendala koneksi dengan pemroses telegraf. Silakan coba sebentar lagi." : "Connection failed while writing content. Please verify host and try again.");
      }
    });

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: targetUrl })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson?.error || `API returned status ${response.status}`);
      }

      reportData = await response.json();
    } catch (err: any) {
      console.error("API Fetch Error:", err);
      serverError = err?.message || "Internal server connection fault.";
    }
  };

  const handleCopyReport = () => {
    if (!activeReport) return;
    const bulletClaims = activeReport.claims.map((c, i) => `${i + 1}. ${c}`).join("\n");
    const bulletQueries = activeReport.criticalQuestions.map((q, i) => `[?] ${q}`).join("\n");

    const fullText = `== BIJAKBACA ANALYSIS: ${activeReport.headline.toUpperCase()} ==
Source: ${activeReport.sourceName} (${activeSourceUrl || "Curated Case"})

[SUMMARY]
${activeReport.summary}

[SOURCE FRAMING]
${activeReport.framing}

[KEY CLAIMS]
${bulletClaims}

[BLIND SPOTS]
${activeReport.blindSpots}

[GLOBAL REGIONAL CONTEXT]
${activeReport.globalContext}

[CRITICAL INQUIRY INITIATIVE]
${bulletQueries}

Report compiled by Bijakbaca — Proportional Media Inquiry. Offline & Independent.`;

    navigator.clipboard.writeText(fullText).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-paper-50 selection:bg-bronze-200 selection:text-bronze-800 transition-colors duration-200">
      
      {/* Newspaper Top Header / Marquee */}
      <header className="border-b-4 border-double border-charcoal-900 pt-6 pb-2 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between text-xs font-mono text-charcoal-700 select-none pb-2 border-b border-paper-200">
          <div className="flex items-center gap-3">
            <span>{t.volumeMark}</span>
            <span className="hidden md:inline">|</span>
            <span className="text-bronze-800 font-bold uppercase tracking-widest">{t.editorialNotice}</span>
          </div>

          {/* Quick Language Switcher - Styled like miniature vintage stamp tabs */}
          <div className="flex items-center gap-2 mt-2 md:mt-0 bg-paper-200 p-0.5 rounded border border-paper-300">
            <button
              id="lang-toggle-id"
              onClick={() => setLang("id")}
              className={`px-3 py-1 text-[10px] font-mono rounded tracking-wider uppercase font-bold transition-all ${
                lang === "id"
                  ? "bg-bronze-800 text-paper-50 shadow-sm"
                  : "text-charcoal-700 hover:text-charcoal-900 hover:bg-paper-100"
              }`}
            >
              🇮🇩 B. Indonesia
            </button>
            <button
              id="lang-toggle-en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-[10px] font-mono rounded tracking-wider uppercase font-bold transition-all ${
                lang === "en"
                  ? "bg-bronze-800 text-paper-50 shadow-sm"
                  : "text-charcoal-700 hover:text-charcoal-900 hover:bg-paper-100"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        {/* Dynamic Grand Newspaper Masthead Logo */}
        <div className="text-center py-6 select-none relative overflow-visible">
          <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal-900 drop-shadow-sm filter contrast-175 relative inline-block">
            {t.title}
            {/* Ink bleed accent */}
            <span className="absolute -bottom-1 -right-2 text-xs font-serif font-normal italic text-bronze-500 transform rotate-12 select-none">
              v1.2
            </span>
          </h1>
          <p className="font-serif text-xs md:text-sm tracking-widest text-bronze-800 mt-2 font-bold uppercase">
            {t.tagline}
          </p>
        </div>

        {/* Sub-masthead Info Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-[10px] font-mono tracking-wider text-charcoal-700 select-none pt-2.5 pb-2 border-t border-b-2 border-charcoal-900 text-xs mt-2">
          <div className="border-r border-paper-300">
            {lang === "id" ? "JUMAT, 29 MEI 2026" : "FRIDAY, MAY 29, 2026"}
          </div>
          <div className="border-r border-paper-300 hidden md:block">
            {lang === "id" ? "WAKTU BACA AKTIF" : "CRITICAL INQUIRY ENGAGED"}
          </div>
          <div className="border-r border-paper-300">
            {t.priceTag}
          </div>
          <div>
            GMT/UTC +00:00
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* Initial Search Tray / Action Row */}
        <div className="max-w-3xl mx-auto bg-paper-100 p-6 rounded-xl border border-paper-300 shadow-md relative overflow-hidden mb-12">
          {/* Subtle vintage watermark backgrounds */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-bronze-200 rounded-full opacity-10 filter blur-xl pointer-events-none"></div>
          
          <div className="flex items-center gap-2 text-xs text-bronze-800 font-bold uppercase tracking-widest mb-3">
            <Feather className="w-4 h-4 text-bronze-500" />
            <span>{lang === "id" ? "Telegraf Masukan URL" : "News URL Input Terminal"}</span>
          </div>

          <p className="text-sm font-sans text-charcoal-900 mb-5 leading-relaxed">
            {t.explainPrompt}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLiveAnalysis();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-700" />
              <input
                id="news-url-input"
                type="text"
                placeholder={t.placeholder}
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                disabled={loading}
                className="w-full bg-paper-50 text-charcoal-900 pl-11 pr-4 py-3.5 rounded-lg border border-paper-300 focus:outline-none focus:ring-2 focus:ring-bronze-500 text-sm font-sans placeholder:italic placeholder:text-gray-400 shadow-inner transition-shadow"
              />
            </div>
            
            <button
              id="analyze-submit-btn"
              type="submit"
              disabled={loading || !inputUrl.trim()}
              className="px-6 py-3.5 bg-bronze-800 hover:bg-bronze-500 disabled:bg-paper-300 text-paper-50 rounded-lg text-sm font-mono tracking-wider font-bold shadow-md transition-all uppercase flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-paper-50 border-t-transparent rounded-full"></span>
                  <span>{t.buttonAnalyzing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.buttonAnalyze}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Core Values */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-paper-200 text-[11px] font-mono text-charcoal-700">
            {t.quickLabels.map((ql, i) => (
              <div key={i} className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="text-bronze-500">●</span>
                <span className="font-bold">{ql.text}</span>
                <span className="text-gray-400 select-none hidden lg:inline">({ql.label})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curated Preloaded Cases Box */}
        <div id="presets-panel" className="mb-12">
          <div className="flex items-center justify-between border-b-2 border-charcoal-900 pb-2 mb-4">
            <h3 className="font-serif italic text-lg text-charcoal-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-bronze-500" />
              <span>{t.presetHeader}</span>
            </h3>
            <span className="font-mono text-xs text-charcoal-700 bg-paper-200 px-2 py-0.5 rounded border border-paper-300 select-none uppercase">
              {lang === "id" ? "Bebas Kuota AI" : "No AI consumption required"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRESET_ARTICLES.map((article) => {
              const r = article.reports[lang];
              const isSelected = activeSourceUrl === article.url;

              return (
                <button
                  key={article.id}
                  onClick={() => handlePresetSelect(article)}
                  className={`text-left self-stretch p-5 bg-paper-100 rounded-lg border transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md cursor-pointer relative overflow-hidden ${
                    isSelected 
                      ? "border-bronze-800 bg-bronze-50 ring-2 ring-bronze-500/30" 
                      : "border-paper-300 hover:border-bronze-800"
                  }`}
                >
                  {/* Category Stamp */}
                  <div className="flex items-center justify-between text-[10px] font-mono tracking-widest uppercase mb-3">
                    <span className="text-bronze-500 font-bold block">
                      ◆ {article.category}
                    </span>
                    <span className="text-charcoal-700 group-hover:text-bronze-800">
                      {article.siteName}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-sm text-charcoal-900 mb-3 group-hover:text-bronze-800 leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-charcoal-700 line-clamp-3 mb-4 leading-relaxed italic">
                    "{r.summary}"
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-bronze-800 mt-auto pt-2 border-t border-paper-100 uppercase tracking-wider">
                    <span>{lang === "id" ? "Muat Analisa" : "Load Report"}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Stamp mark indicating instantaneous reading */}
                  {isSelected && (
                    <div className="absolute -top-3 -right-3 w-12 h-12 bg-bronze-500 text-paper-50 rounded-full flex items-center justify-center transform rotate-12 select-none shadow border border-paper-900">
                      <span className="text-[8px] font-mono font-bold tracking-tighter uppercase">ACTIVE</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Transition Loading Box */}
        {loading && (
          <div className="my-12 bg-paper-100 border border-paper-300 rounded-xl py-6 shadow-inner">
            <NewspaperLoading lang={lang} progressStep={progressStep} />
          </div>
        )}

        {/* Error telegraph box */}
        {errorMsg && (
          <div className="max-w-xl mx-auto my-12 bg-red-50 border-4 border-dashed border-red-700 rounded-xl p-6 text-center shadow-lg relative" id="error-bulletin">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-700 text-paper-50 px-4 py-1.5 rounded-full font-mono text-xs font-bold tracking-widest uppercase flex items-center gap-1">
              <AlertTriangle className="w-4 h-4" />
              <span>{t.errorHeader}</span>
            </div>

            <div className="pt-2">
              <p className="text-sm font-sans text-red-900 mb-6 font-bold leading-relaxed">
                {errorMsg}
              </p>

              <div className="border-t border-red-200 pt-5 mt-3 text-xs text-charcoal-700">
                <p className="mb-4 italic">{t.orTryPreset}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {PRESET_ARTICLES.map((art) => (
                    <button
                      key={art.id}
                      onClick={() => handlePresetSelect(art)}
                      className="bg-white border border-paper-300 hover:border-bronze-500 text-charcoal-900 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all"
                    >
                      {art.siteName}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setErrorMsg(null);
                  if (activeSourceUrl) {
                    handleLiveAnalysis(activeSourceUrl);
                  }
                }}
                className="mt-6 px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 mx-auto"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.retryBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* Results Page Wrapper: Dual Tab or Side-by-Side Newspaper Broad Sheet */}
        <AnimatePresence>
          {activeReport && !loading && !errorMsg && (
            <motion.article 
              id="newspaper-broadsheet"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="bg-white border-8 border-charcoal-900 p-4 md:p-8 rounded-lg shadow-2xl relative max-w-5xl mx-auto my-12 overflow-hidden"
            >
              {/* Retro broadsheet print header markings */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-charcoal-700 pb-3 mb-6 select-none font-mono text-xs text-charcoal-700">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-bronze-800">◆ {lang === "id" ? "BIPARTISAN ANALYSIS" : "BIPARTISAN ANALYSIS"}</span>
                  <span className="hidden sm:inline">|</span>
                  <span className="hidden sm:inline">{lang === "id" ? "BIJAKBACA PERSPEKTIF MULTI-PIHAK" : "BIJAKBACA MULTIPERSPECTIVE INTELLIGENCE"}</span>
                </div>
                <div>
                  ID: <span className="font-bold">#BB-{Math.abs(activeReport.headline.length * 17) % 1000}</span>
                </div>
              </div>

              {/* Source/Publisher Stamp Block */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-paper-100 p-4 rounded-md border border-paper-200">
                <div>
                  <span className="text-[10px] font-mono text-gray-400 block uppercase tracking-wider">{t.publisherLabel}</span>
                  <div className="text-sm font-mono text-charcoal-900 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-bronze-500 inline-block"></span>
                    <span>{activeReport.sourceName}</span>
                    {activeSourceUrl && (
                      <a 
                        href={activeSourceUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[10px] text-bronze-800 hover:text-bronze-500 font-mono underline inline-flex items-center gap-0.5"
                      >
                        (Link <ExternalLink className="w-2.5 h-2.5" />)
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleCopyReport}
                    className="px-4 py-2 bg-paper-200 hover:bg-paper-300 border border-paper-300 rounded text-xs font-mono font-bold tracking-wider text-charcoal-700 uppercase flex items-center gap-1.5 transition-all select-none cursor-pointer"
                  >
                    {copyFeedback ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600 animate-bounce" />
                        <span className="text-emerald-700">{lang === "id" ? "Tersalin!" : "Copied!"}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.copyBtn}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setActiveReport(null);
                      setActiveSourceUrl(null);
                      setIsPreset(false);
                      setInputUrl("");
                      setTimeout(() => {
                        window.scrollTo({ top: 150, behavior: "smooth" });
                      }, 100);
                    }}
                    className="px-4 py-2 bg-charcoal-900 hover:bg-charcoal-700 text-paper-50 rounded text-xs font-mono font-bold tracking-wider uppercase transition-all select-none flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{t.backToHome}</span>
                  </button>
                </div>
              </div>

              {/* Centered Original Headline Title */}
              <div className="text-center max-w-3xl mx-auto py-4 mb-8 border-b border-paper-200">
                <span className="text-[10px] font-mono tracking-widest text-bronze-800 font-bold block uppercase mb-1">
                  {lang === "id" ? "JUDUL ARTIKEL YANG DIANALISA" : "ARTICLE HEADLINE UNDER REVIEW"}
                </span>
                <h2 className="font-serif font-black text-2xl md:text-3xl lg:text-4xl text-charcoal-900 leading-tight italic">
                  "{activeReport.headline}"
                </h2>
              </div>

              {/* Broadsheet Columns Spread */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative">
                
                {/* Thick centered column delimiter vertical band (on large desktop displays) */}
                <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-[2px] bg-paper-200 -translate-x-1/2"></div>

                {/* Left Side: Editorial Claims & Summary (BACA NARASI) */}
                <div className="space-y-8" id="editorial-narrative-column">
                  <div className="border-b-2 border-charcoal-900 pb-2 mb-4">
                    <span className="font-mono text-[11px] text-bronze-800 font-semibold block uppercase tracking-widest">
                      ◆ PANEL REKAM SISI A ◆
                    </span>
                    <h3 className="font-serif font-bold text-lg text-charcoal-900 mt-1 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-bronze-800" />
                      <span>{t.bannerNarrative}</span>
                    </h3>
                  </div>

                  {/* Summary Block */}
                  <div className="bg-paper-50 p-6 rounded-lg border border-paper-200 relative">
                    <h4 className="font-serif font-black text-base text-charcoal-900 border-b border-paper-200 pb-1.5 mb-3 flex items-center justify-between select-none">
                      <span>{t.labelSummary}</span>
                      <span className="font-mono text-[10px] text-gray-400">SUMMATION</span>
                    </h4>
                    <p className="text-sm font-sans text-charcoal-900 leading-relaxed text-justify whitespace-pre-line">
                      {activeReport.summary}
                    </p>
                  </div>

                  {/* Framing Analysis */}
                  <div className="bg-paper-50 p-6 rounded-lg border border-paper-200 relative">
                    <h4 className="font-serif font-black text-base text-charcoal-900 border-b border-paper-200 pb-1.5 mb-3 flex items-center justify-between select-none">
                      <span>{t.labelFraming}</span>
                      <span className="font-mono text-[10px] text-gray-400">WORD SELECTION</span>
                    </h4>
                    <p className="text-sm font-sans text-charcoal-900 leading-relaxed">
                      {activeReport.framing}
                    </p>
                  </div>

                  {/* Major Claims Block */}
                  <div className="bg-paper-50 p-6 rounded-lg border border-paper-200">
                    <h4 className="font-serif font-black text-base text-charcoal-900 border-b border-paper-200 pb-1.5 mb-3 flex items-center justify-between select-none">
                      <span>{t.labelClaims}</span>
                      <span className="font-mono text-[10px] text-gray-400">EXTRACTED VERITIES</span>
                    </h4>

                    <ul className="space-y-3 pt-1">
                      {activeReport.claims.map((claim, idx) => (
                        <li key={idx} className="flex gap-3 text-sm font-sans text-charcoal-900 leading-relaxed align-top">
                          <span className="font-mono text-xs text-bronze-800 font-bold pt-0.5">[{idx + 1}]</span>
                          <span className="block">{claim}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side: What was omitted, skipped or framed away (YANG TERLEWAT) */}
                <div className="space-y-8" id="critical-unveiling-column">
                  <div className="border-b-2 border-charcoal-900 pb-2 mb-4">
                    <span className="font-mono text-[11px] text-bronze-800 font-semibold block uppercase tracking-widest">
                      ◆ PANEL REKAM SISI B ◆
                    </span>
                    <h3 className="font-serif font-bold text-lg text-charcoal-900 mt-1 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-bronze-800" />
                      <span>{t.bannerOmission}</span>
                    </h3>
                  </div>

                  {/* Blindspots (What was left unsaid) with unique stamp coloring */}
                  <div className="bg-bronze-50/70 p-6 rounded-lg border border-bronze-200 relative shadow-sm">
                    {/* Retro Stamp overlay effect */}
                    <div className="absolute top-2 right-2 font-mono text-[9px] text-bronze-500 border border-bronze-200/50 rounded px-1 uppercase tracking-tight opacity-40 select-none">
                      Omitted
                    </div>

                    <h4 className="font-serif font-black text-base text-charcoal-900 border-b border-bronze-200 pb-1.5 mb-3 flex items-center justify-between select-none">
                      <span>{t.labelBlindSpots}</span>
                      <span className="font-mono text-[10px] text-bronze-500">EXCLUSIONS</span>
                    </h4>
                    <p className="text-sm font-sans text-charcoal-900 leading-relaxed whitespace-pre-line">
                      {activeReport.blindSpots}
                    </p>
                  </div>

                  {/* Global Context (Contrasts the story) */}
                  <div className="bg-paper-50 p-6 rounded-lg border border-paper-200">
                    <h4 className="font-serif font-black text-base text-charcoal-900 border-b border-paper-200 pb-1.5 mb-3 flex items-center justify-between select-none">
                      <span>{t.labelGlobalContext}</span>
                      <span className="font-mono text-[10px] text-gray-400">REGIONAL VECTORS</span>
                    </h4>
                    <p className="text-sm font-sans text-charcoal-900 leading-relaxed">
                      {activeReport.globalContext}
                    </p>
                  </div>

                  {/* Critical Questions (The Inquiry Engine) */}
                  <div className="bg-paper-50 p-6 rounded-lg border border-paper-300">
                    <h4 className="font-serif font-black text-base text-charcoal-900 border-b border-paper-300 pb-1.5 mb-3 flex items-center justify-between select-none">
                      <span>{t.labelQuestions}</span>
                      <span className="font-mono text-[10px] text-bronze-800">CITIZEN QUESTIONNAIRE</span>
                    </h4>

                    <div className="space-y-3.5 pt-1">
                      {activeReport.criticalQuestions.map((query, idx) => (
                        <div key={idx} className="flex gap-3 text-sm font-sans text-charcoal-900 align-top leading-relaxed p-2.5 rounded hover:bg-paper-100 transition-colors">
                          <HelpCircle className="w-5 h-5 text-bronze-500 flex-shrink-0 pt-0.5" />
                          <div>
                            <span className="block font-medium">{query}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Broad sheet Footer seal */}
              <div className="mt-12 pt-6 border-t border-double border-charcoal-700 text-center font-serif text-[11px] text-gray-400 italic flex items-center justify-center gap-1.5 select-none">
                <span>Bijakbaca Broadside Sheet No. 12 — Empowering Independent Inquiring Minds</span>
              </div>
            </motion.article>
          )}
        </AnimatePresence>

        {/* Tactical Local Ledger History Box */}
        <div id="history-section" className="border-t border-paper-300 pt-8 mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="font-serif font-bold text-lg text-charcoal-900 flex items-center gap-2.5">
              <Archive className="w-5 h-5 text-bronze-500" />
              <span>{t.historyHeader}</span>
            </h3>

            {history.length > 0 && (
              <button
                id="clear-archive-btn"
                onClick={clearAllHistory}
                className="text-xs font-mono text-red-700 hover:text-red-900 hover:underline flex items-center gap-1 cursor-pointer align-middle select-none bg-paper-100 px-3 py-1.5 rounded border border-paper-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.clearHistoryBtn}</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="text-center py-10 px-4 border border-dashed border-paper-300 rounded-lg text-charcoal-700 font-mono text-xs select-none">
              <BookOpenCheck className="w-8 h-8 mx-auto text-paper-300 mb-2" />
              <p>{t.noHistory}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="ledger-grid">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setErrorMsg(null);
                    setActiveSourceUrl(item.url);
                    setActiveReport(item.report);
                    // scroll
                    setTimeout(() => {
                      document.getElementById("newspaper-broadsheet")?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className={`p-4 bg-white rounded-lg border cursor-pointer select-none transition-all group flex flex-col justify-between hover:border-bronze-800 hover:shadow-sm ${
                    activeSourceUrl === item.url 
                      ? "border-bronze-800 bg-bronze-50/30" 
                      : "border-paper-200"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono text-charcoal-700 mb-2.5">
                      <span>{item.timestamp}</span>
                      <span className="text-bronze-500 font-bold uppercase">{item.report.sourceName}</span>
                    </div>

                    <h4 className="font-serif font-bold text-xs text-charcoal-900 line-clamp-2 leading-relaxed mb-4 group-hover:text-bronze-800">
                      "{item.report.headline}"
                    </h4>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-paper-100 mt-2">
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-bronze-800 uppercase tracking-widest flex items-center gap-1">
                      <span>{lang === "id" ? "Buka" : "Load"}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>

                    <button
                      onClick={(e) => deleteHistoryItem(item.id, e)}
                      title={lang === "id" ? "Hapus riwayat" : "Remove entry"}
                      className="text-gray-400 hover:text-red-700 hover:bg-neutral-100 p-1 rounded transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Media Literacy Informative Section */}
        <section className="bg-paper-100 border border-paper-300 rounded-xl p-6 my-12" id="about-methodology">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-bronze-500" />
            <h3 className="font-serif font-bold text-base text-charcoal-900 select-none">
              {t.howItWorksTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.stepsGuide.map((step, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-serif font-bold text-sm text-bronze-800">
                  {step.t}
                </h4>
                <p className="text-xs text-charcoal-700 leading-relaxed text-justify">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Elegant Footer of Newspaper */}
      <footer className="border-t border-paper-300 py-12 px-4 text-center text-xs font-mono text-charcoal-700 select-none bg-paper-100">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex justify-center gap-4 text-[10px] text-bronze-800 uppercase tracking-widest font-bold">
            <span>{lang === "id" ? "● TANPA PELACAK" : "● ZERO CORPORATE COOKIES"}</span>
            <span>● 100% PRIVATE</span>
            <span>{lang === "id" ? "● ENKRIPSI LOKAL" : "● LOCAL STORAGE LEDGER"}</span>
          </div>
          
          <p className="text-gray-400 italic">
            {lang === "id" 
              ? "Bijakbaca dibuat untuk kemerdekaan kognitif. Kami tidak menyimpan URL Anda di server kami." 
              : "Bijakbaca is dedicated to media freedom. We never record your scanned URLs onto persistent database logs."}
          </p>

          <p className="text-[10px] tracking-tight">
            © 2026 Bijakbaca — Multilateral News Framing Analysis Engine.
          </p>
        </div>
      </footer>

    </div>
  );
}
