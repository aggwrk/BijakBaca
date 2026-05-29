import { Report } from "./types";

export interface PresetArticle {
  title: string;
  siteName: string;
  url: string;
  category: "Economy" | "Technology" | "Environment" | "Ekonomi" | "Teknologi" | "Lingkungan";
  reportId: string;
  id: string;
  reports: {
    id: Report;
    en: Report;
  };
}

export const PRESET_ARTICLES: PresetArticle[] = [
  {
    id: "preset-1",
    title: "Global Semiconductor Subsidies and the New Era of Economic Nationalism",
    siteName: "Financial Ledger",
    url: "https://financialledger.example.com/semiconductors-subsidies-nationalism",
    category: "Economy",
    reportId: "semiconductors",
    reports: {
      id: {
        headline: "Subsidi Semikonduktor Global dan Era Baru Nasionalisme Ekonomi",
        sourceName: "Financial Ledger",
        summary: "Artikel ini membahas gelombang subsidi bernilai miliaran dolar di seluruh wilayah ekonomi utama (terutama AS, Uni Eropa, dan Asia) untuk mengamankan rantai pasok mikrocip dalam negeri. Penulis berpendapat bahwa intervensi pemerintah yang agresif ini menandai berakhirnya era globalisasi laissez-faire dan dimulainya proteksionisme teknologi yang termediasi dengan ketat. Kompetisi ini diposisikan sebagai langkah pertahanan krusial untuk mencegah kelangkaan cip di masa depan.",
        framing: "Sumber mengadopsi cara pandang neoliberal yang berpusat pada pasar barat. Artikel memposisikan insentif publik AS dan Eropa secara positif sebagai 'tindakan ketahanan strategis', sementara melabeli tindakan serupa oleh negara lain sebagai 'distorsi pasar'. Pilihan bahasanya menekankan urgensi keamanan nasional untuk menjustifikasi suntikan modal korporasi besar tanpa mengkritisi penumpukan monopoli lokal.",
        claims: [
          "Subsidi rantai pasok dalam negeri adalah satu-satunya metode andal untuk menjamin kedaulatan teknologi.",
          "Mekanisme pasar bebas konvensional telah gagal mengantisipasi guncangan geopolitik dalam manufaktur cip.",
          "Pendanaan pemerintah akan langsung dialihkan ke inovasi ilmiah daripada sekadar kompensasi eksekutif korporat."
        ],
        blindSpots: "Artikel ini mengabaikan dampak hiper-inflasi biaya akibat fragmentasi manufaktur (membangun pabrik cip mahal di wilayah upah tinggi). Ada titik buta yang sangat besar terkait dampak lingkungan: pabrik semikonduktor mengonsumsi jutaan liter air murni setiap harinya dan menghasilkan jejak karbon kimiawi yang tinggi—hal yang sama sekali tidak disebutkan oleh jurnalis.",
        globalContext: "Sementara media Barat melihat subsidi ini sebagai penyelamat kedaulatan, pengamat di Asia Tenggara dan Amerika Latin menyoroti bahwa 'nasionalisme cip' ini menarik modal keluar dari negara berkembang, memperluas kesenjangan teknologi (digital divide), serta menciptakan gelembung pasokan berlebih di negara penimbun teknologi.",
        criticalQuestions: [
          "Apakah ada klausul transparansi yang mengikat bagi perusahaan penerima subsidi agar tidak menggunakan dana publik untuk buyback saham?",
          "Bagaimana ketersediaan air bersih lokal dilindungi di sekitar pabrik semikonduktor baru?",
          "Siapa pemenang nyata dari perang subsidi ini—konsumen global atau segelintir konglomerat teknologi?"
        ]
      },
      en: {
        headline: "Global Semiconductor Subsidies and the New Era of Economic Nationalism",
        sourceName: "Financial Ledger",
        summary: "This article examines the wave of multi-billion dollar state subsidies across major economic spheres (notably the US, EU, and Asia) designed to secure domestic semiconductor supply chains. The writer argues that aggressive state interventionism signals a departure from laissez-faire globalization toward high-stakes technological protectionism. The race is framed as a crucial defensive barrier to avoid future chip shortages.",
        framing: "The outlet adopts a Western-centric, market-liberal frame. It reviews US and EU public incentives positively as 'strategic resilience initiatives,' while characterizing similar state interventions elsewhere as 'market distortions.' The vocabulary invokes national security priorities to justify massive corporate handouts without scrutinizing local monopoly building.",
        claims: [
          "Onshore supply-chain subsidies are the only reliable buffer to safeguard technological sovereignty.",
          "Conventional free-market mechanisms have failed to withstand geopolitical disruptions in chip fabrication.",
          "State capital injections will translate directly into cutting-edge scientific innovation rather than executive corporate pay outs."
        ],
        blindSpots: "The article glides over the massive cost inefficiency of manufacturing fragmentation (building factories in high-wage territories). It has a major blind spot regarding ecological consequences: chip fabrication plants consumer millions of gallons of pure water daily and produce a severe chemical carbon footprint, which is entirely omitted.",
        globalContext: "While Western publications portray semiconductor chips as a national security lifesaver, global South analysts point out that 'chip nationalism' drains capital away from developing nations, perpetuates the digital divide, and risk creating a severe supply glut in hoarding countries.",
        criticalQuestions: [
          "Are there strict capital-control mechanisms to prevent corporate recipients from using public funds to bankroll stock buybacks?",
          "How will local water resources be protected from pollution and depletion around these chemical-heavy fabrication giants?",
          "Who is the ultimate beneficiary of this subsidy war: global consumers or select tech conglomerates?"
        ]
      }
    }
  },
  {
    id: "preset-2",
    title: "The Silent Cost of Cleantech: Deep Sea Mining in the Pacific Core",
    siteName: "Eco-Frontiers Journal",
    url: "https://ecofrontiers.example.net/silent-cost-deep-sea-mining-pacific",
    category: "Environment",
    reportId: "deepsea",
    reports: {
      id: {
        headline: "Biaya Tersembunyi Teknologi Bersih: Penambangan Laut Dalam di Jantung Pasifik",
        sourceName: "Eco-Frontiers Journal",
        summary: "Analisis ini membedah pertumbuhan industri penambangan nodul polimetalik di dasar laut Samudra Pasifik. Logam-logam ini seperti kobalt, nikel, dan mangan diklaim sangat esensial untuk memproduksi baterai kendaraan listrik (EV) guna transisi energi hijau global. Penulis menyoroti benturan antara urgensi mitigasi krisis iklim darat dan ancaman kehancuran ekosistem laut dalam yang belum banyak dieksplorasi.",
        framing: "Artikel ini dibingkai dengan nada skeptis lingkungan yang kuat. Alih-alih merayakan transisi energi bersih, ia menyajikan narasi pelestarian keanekaragaman hayati. Perusahaan penambang dicitrakan sebagai 'oportunis hijau' yang menggunakan narasi penyelamatan bumi untuk mengeksploitasi sumber daya laut lepas tanpa regulasi internasional yang matang.",
        claims: [
          "Ekosistem laut dalam yang hancur akibat pengerukan tidak akan pernah bisa pulih dalam skala waktu manusia.",
          "Transisi global ke kendaraan listrik tidak dapat terwujud tanpa ekstraksi intensif logam mineral dasar samudra.",
          "Regulator internasional (ISA) memiliki konflik kepentingan karena mendapatkan komisi langsung dari izin eksplorasi."
        ],
        blindSpots: "Artikel ini tidak menyentuh potensi solusi alternatif yang sedang dikembangkan, seperti teknologi baterai LFP (Lithium Iron Phosphate) atau baterai sodium-ion yang sama sekali bebas kobalt dan nikel. Ini adalah titik buta kritis karena mendistorsi kesan bahwa kita terpaksa menambang laut untuk bertahan hidup.",
        globalContext: "Sebagian besar negara pulau kecil di Pasifik terpecah: beberapa memandang lisensi eksplorasi laut dalam sebagai satu-satunya tumpuan pendapatan ekonomi mandiri mereka, sedangkan negara tetangga lainnya menuntut moratorium total untuk menyelamatkan perikanan tangkap lokal.",
        criticalQuestions: [
          "Jika baterai baterai alternatif tanpa mineral laut dalam mendominasi pasar komersial, bagaimana nasib ekosistem laut yang sudah telanjur dikeruk?",
          "Mengapa opsi pengurangan konsumsi energi total global jarang dibahas sebagai alternatif di samping sekadar pemindahan target eksploitasi alam?",
          "Bagaimana model kompensasi ganti rugi jika debu bawah laut merusak wilayah tangkapan nelayan tradisional lintas negara?"
        ]
      },
      en: {
        headline: "The Silent Cost of Cleantech: Deep Sea Mining in the Pacific Core",
        sourceName: "Eco-Frontiers Journal",
        summary: "This report examines the rapid expansion of polymetallic nodule extraction industries along the depths of the Pacific Ocean floor. These raw materials (cobalt, nickel, manganese) are highly sought after to construct electric vehicle (EV) batteries for the global green transition. The author outlines a critical dilemma between terrestrial climate mitigation goals and ocean ecosystem preservation.",
        framing: "The article is framed under an eco-conservationist lens, with a highly cautious narrative tone. Rather than praising EV initiatives, the outlet depicts mining corporations as 'green opportunists' capitalizing on climate anxiety to unlock unregulated deep-sea territories.",
        claims: [
          "Deep ocean biotopes destroyed by seafloor scraping will fail to recover on a human time-scale.",
          "The global electric vehicle transition is mathematically unachievable without mineral mining from seabed crusts.",
          "International regulators (like the ISA) suffer from systemic conflicts of interest due to commission-based licensing models."
        ],
        blindSpots: "This coverage completely ignores emerging commercial alternatives like Lithium Iron Phosphate (LFP) or sodium-ion battery designs that avoid cobalt and nickel altogether. Omitting this technology distorts the narrative to suggest undersea destruction is our single escape path.",
        globalContext: "Pacific Island nations are sharply divided: some fragile island economies view undersea leases as a crucial sovereign revenue stream, whereas their regional neighbors demand a total moratorium to shield regional artisanal fishing catches.",
        criticalQuestions: [
          "If battery chemistry shifts to avoid ocean metals, what legal and ecological remedies will remain for already extracted undersea beds?",
          "Why is a structural reduction in global energy expenditure omitted as an alternative option compared to simply redirecting resource pillage?",
          "What measures prevent toxic drift plumes from migrating into the transboundary fishing zones of ancestral indigenous mariners?"
        ]
      }
    }
  },
  {
    id: "preset-3",
    title: "Synthetic Intellect and the Erosion of the White-Collar Guilds",
    siteName: "Neo-Chronicle",
    url: "https://neochronicle.example.org/synthetic-intellect-white-collar-guilds",
    category: "Technology",
    reportId: "aiwork",
    reports: {
      id: {
        headline: "Intelek Sintetis dan Erosi Gilda Pekerja Kerah Putih",
        sourceName: "Neo-Chronicle",
        summary: "Artikel ini menganalisis adopsi kecerdasan buatan generatif dalam industri hukum, pemrograman, dan desain grafis. Penulis berpendapat bahwa AI tidak sekadar melengkapi (augmentasi), melainkan secara struktural menggantikan seluruh lapisan pekerja tingkat pemula, sehingga menghancurkan pipa karir tradisional dan menciptakan krisis eksistensial bagi lulusan perguruan tinggi baru.",
        framing: "Artikel ini dibingkai dengan nada teknoskeptis yang kental dan sedikit bernuansa melankolis industri. Ini adalah framing proteksionis tenaga kerja, memposisikan model AI besar sebagai perampas hak properti intelektual yang dimiliki oleh pekerja kreatif manual guna memperkaya pemegang saham korporasi kecerdasan buatan.",
        claims: [
          "Generasi AI saat ini dapat menggantikan hingga 70% tugas kognitif repetitif di lingkungan kerja kerah putih.",
          "Magang tradisional dan peran pekerja pembuat draf hukum tidak lagi layak secara ekonomi bagi perusahaan.",
          "Erosi karir tingkat pemula akan memutus proses melatih talenta ahli masa depan di berbagai gilda profesional."
        ],
        blindSpots: "Artikel ini mengabaikan data empiris tentang produktivitas yang meningkat dan lahirnya lini spesialisasi baru (misalnya pengarah sistem pakar, validator etika, dan perancang integrasi data). Analisisnya bias ke arah kepunahan kerja total tanpa mempertimbangkan skenario hibrurisasi industri.",
        globalContext: "Di belahan dunia barat, fokusnya adalah hak cipta dan penggusuran tenaga kerja gilda terlatih. Sebaliknya di negara-negara berkembang Asia-Pasifik, alat AI generatif diadopsi dengan sangat cepat sebagai pintu akselerasi bahasa dan keterampilan teknis, memotong birokrasi pelatihan bertahun-tahun di daerah minim universitas.",
        criticalQuestions: [
          "Bagaimana perguruan tinggi merestrukturisasi kurikulum mereka ketika tugas-tugas dasar yang dulu dikerjakan lulusan baru kini selesai dalam hitungan detik?",
          "Apakah monopoli kepemilikan AI terpusat ini memerlukan regulasi anti-trust tipe baru?",
          "Di mana letak batas moral kepemilikan intelektual saat mesin dilatih menggunakan karya kolektif peradaban manusia?"
        ]
      },
      en: {
        headline: "Synthetic Intellect and the Erosion of the White-Collar Guilds",
        sourceName: "Neo-Chronicle",
        summary: "This essay looks into the integration of generative artificial intelligence across legal, engineering, and creative industries. The author posits that rather than mere augmentation, AI is structurally replacing entry-level professional tiers, thereby permanently disrupting career pipelines and plunging university graduates into an structural career vacuum.",
        framing: "The text is framed from a labor-protection perspective, using technoskeptic and slightly elegiac vocabulary. It depicts major AI models as extractive machines that ingest human intellectual work to enrich a tiny group of tech equity holders at the expense of manual specialists.",
        claims: [
          "Current-generation generative AI systems can execute up to 70% of routine cognitive workflows in office spaces.",
          "Traditional junior apprenticeships and document drafting are no longer economically viable for firms.",
          "The evaporation of entry-level positions will halt the long-term cultivation of master-level professionals."
        ],
        blindSpots: "The narrative avoids discussing productivity data and the creation of entirely new specialist career tracks (e.g., automated system validators, system ethics auditors). It targets a narrative of industrial extinction rather than focusing on dynamic industry hybridity.",
        globalContext: "In Western spheres, the emphasis is heavily focused on licensing protection and labor disputes. Meanwhile, in several emerging economies in Asia-Pacific, AI tools are welcomed as high-speed equalizers to leapfrog linguistic and coding hurdles without conventional brick-and-mortar training.",
        criticalQuestions: [
          "How must educational academies adapt when the routine output of their top graduates can be synthesized in seconds?",
          "Does the highly consolidated ownership of foundation models mandate a new category of anti-trust oversight?",
          "Where does core authorship reside when automated systems are trained on the accumulated collective output of human history?"
        ]
      }
    }
  }
];
