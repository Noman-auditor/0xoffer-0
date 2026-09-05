import { useEffect, useMemo, useState } from "react";
import { LangContext, type Lang } from "./context/LangContext";
import { useProgress } from "./hooks/useProgress";
import { allTopicIds } from "./data/roadmap";
import { allSetupIds } from "./data/setup";
import { bugs } from "./data/bugs";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Roadmap } from "./components/Roadmap";
import { Routine } from "./components/Routine";
import { Setup } from "./components/Setup";
import { BugLab } from "./components/BugLab";
import { TopFive } from "./components/TopFive";

const LANG_KEY = "w3sec-lang";

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      return (localStorage.getItem(LANG_KEY) as Lang) || "en";
    } catch {
      return "en";
    }
  });
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  };
  const progress = useProgress();

  const allIds = useMemo(() => [...allTopicIds, ...allSetupIds, ...bugs.map((b) => `bug-${b.id}`)], []);
  const overall = Math.round((progress.countDone(allIds) / allIds.length) * 100);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const handleReset = () => {
    if (confirm(lang === "bn" ? "সব অগ্রগতি মুছে ফেলবেন?" : "Reset all progress?")) progress.reset();
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500/30">
        <Navbar overall={overall} onReset={handleReset} />
        <main>
          <Hero overall={overall} onStart={() => document.getElementById("roadmap")?.scrollIntoView({ behavior: "smooth" })} />
          <Roadmap progress={progress} />
          <Routine />
          <Setup progress={progress} />
          <BugLab progress={progress} />
          <TopFive />
        </main>
        <footer className="border-t border-slate-800 py-10 text-center text-sm text-slate-500">
          <p className="font-mono">
            {lang === "bn" ? "প্রতিদিন ১টা PoC। প্রতিদিন ১০টা finding। ২৪ মাসে টপ ৫%।" : "1 PoC a day. 10 findings a day. Top 5% in 24 months."}
          </p>
          <p className="mt-2 text-xs text-slate-600">Web3 Security Researcher Roadmap · Progress saved locally in your browser</p>
        </footer>
      </div>
    </LangContext.Provider>
  );
}
