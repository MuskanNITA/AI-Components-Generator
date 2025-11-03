import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { HiOutlineCode } from "react-icons/hi";
import Editor from "@monaco-editor/react";
import { IoCloseSharp, IoCopy } from "react-icons/io5";
import { PiExportBold } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  // page states
  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [frameWork, setFrameWork] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setIsNewTabOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // local theme-aware flag so react-select styling can follow theme
  const [isDarkLocal, setIsDarkLocal] = useState(() => {
    try {
      return localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark");
    } catch {
      return false;
    }
  });

 useEffect(() => {
  // Function to update theme state from the document class
  const updateTheme = () => {
    setIsDarkLocal(document.documentElement.classList.contains("dark"));
  };

  // Watch for manual toggles or class changes
  const observer = new MutationObserver(updateTheme);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

  // Run once immediately
  updateTheme();

  return () => observer.disconnect();
}, []);



  // Extract fenced code block (```html ... ```) or return raw
  function extractCode(response) {
    if (!response) return "";
    const match = response.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // NOTE: client-side API key is not secure for production — prefer server-side
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  // select styles that adapt to theme
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDarkLocal ? "#111" : "#fff",
      borderColor: state.isFocused ? (isDarkLocal ? "#6d28d9" : "#8b5cf6") : (isDarkLocal ? "#333" : "#e5e7eb"),
      color: isDarkLocal ? "#fff" : "#111",
      boxShadow: "none",
      minHeight: "44px",
      borderRadius: 8,
      "&:hover": { borderColor: state.isFocused ? (isDarkLocal ? "#7c3aed" : "#7c3aed") : (isDarkLocal ? "#555" : "#d1d5db") },
    }),
    singleValue: (base) => ({ ...base, color: isDarkLocal ? "#fff" : "#111" }),
    placeholder: (base) => ({ ...base, color: isDarkLocal ? "#9ca3af" : "#6b7280" }),
    input: (base) => ({ ...base, color: isDarkLocal ? "#fff" : "#111" }),
    menu: (base) => ({ ...base, backgroundColor: isDarkLocal ? "#111" : "#fff", color: isDarkLocal ? "#fff" : "#111", zIndex: 50 }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? (isDarkLocal ? "#2a2a2a" : "#f3f4f6") : state.isFocused ? (isDarkLocal ? "#161616" : "#f8fafc") : (isDarkLocal ? "#111" : "#fff"),
      color: isDarkLocal ? "#fff" : "#111",
      cursor: "pointer",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    indicatorsContainer: (base) => ({ ...base, color: isDarkLocal ? "#fff" : "#111" }),
  };

  // Main generate function
  async function getResponse() {
    if (!prompt.trim()) {
      toast.error("Please describe your component first");
      return;
    }

    try {
      setLoading(true);
      setOutputScreen(false);
      setCode("");

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `
You are an experienced programmer with expertise in web development and UI/UX design.
Now, generate a UI component for: ${prompt}
Framework to use: ${frameWork.value}

Requirements:
- Return ONLY the code, formatted in Markdown fenced code blocks.
- Provide the whole code as a single HTML file.
        `,
      });

      // Pull text from common response properties
      let rawText = "";
      if (response?.text) rawText = response.text;
      else if (response?.candidates?.[0]?.content) rawText = response.candidates[0].content;
      else rawText = JSON.stringify(response);

      const extracted = extractCode(rawText);
      setCode(extracted);
      setOutputScreen(true);
    } catch (error) {
      console.error("generate error:", error);
      toast.error("Something went wrong while generating code");
    } finally {
      setLoading(false);
    }
  }

  // copy to clipboard
  const copyCode = async () => {
    if (!code.trim()) return toast.error("No code to copy");
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy");
    }
  };

  // download as HTML file
  const downloadFile = () => {
    if (!code.trim()) return toast.error("No code to download");
    try {
      const fileName = "GenUI-Code.html";
      const blob = new Blob([code], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("File downloaded");
    } catch (err) {
      console.error("download error:", err);
      toast.error("Failed to download");
    }
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-[#09090B] dark:text-white transition-colors duration-200">
      <Navbar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 lg:px-16">
        {/* Left Section */}
        <div className="relative mt-2 w-full h-[80vh] bg-gray-150 border border-gray-200 dark:bg-[#141319] dark:border-transparent rounded-xl overflow-hidden transition-colors duration-200 shadow-sm">

          <h3 className="text-[25px] font-semibold sp-text">AI Component Generator</h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 text-[16px]">Describe your component and let AI code it for you.</p>

          <p className="text-[15px] font-[700] mt-4">Framework</p>
          <Select
            className="mt-2"
            options={options}
            value={frameWork}
            styles={selectStyles}
            menuPortalTarget={typeof document !== "undefined" ? document.body : null}
            onChange={(selected) => setFrameWork(selected)}
          />

          <p className="text-[15px] font-[700] mt-5">Describe your component</p>
          <textarea
            onChange={(e) => setPrompt(e.target.value)}
            value={prompt}
            className="w-full min-h-[200px] rounded-xl bg-white dark:bg-[#09090B] mt-3 p-3 text-black dark:text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-colors duration-200 border border-gray-200 dark:border-zinc-800"
            placeholder="Describe your component in detail and AI will generate it..."
          ></textarea>

          <div className="flex items-center justify-between mt-3">
            <p className="text-gray-600 dark:text-gray-300 text-sm">Click on generate button to get your code</p>
            <button
              onClick={getResponse}
              disabled={loading}
              className="flex items-center p-3 rounded-lg border-0 bg-gradient-to-r from-purple-400 to-purple-600 px-5 gap-2 transition-all hover:opacity-80 disabled:opacity-60"
            >
              {loading ? <ClipLoader color="white" size={18} /> : <BsStars />}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative mt-2 w-full h-[80vh] bg-gray-100 border border-gray-150 dark:bg-[#141319] dark:border-transparent rounded-xl overflow-hidden transition-colors duration-200 shadow-sm">
      {!outputScreen ? (
            <div className="w-full h-full flex items-center flex-col justify-center">
              <div className="p-5 w-[70px] flex items-center justify-center text-[30px] h-[70px] rounded-full bg-gradient-to-r from-purple-400 to-purple-600">
                <HiOutlineCode />
              </div>
              <p className="text-[16px] text-gray-600 dark:text-gray-300 mt-3">Your component & code will appear here.</p>
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="w-full h-[50px] flex items-center gap-3 px-3 bg-white dark:bg-[#17171C] transition-colors duration-200">
                <button
                  onClick={() => setTab(1)}
                  className={`w-1/2 py-2 rounded-lg transition-all ${tab === 1 ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-300"}`}
                >
                  Code
                </button>
                <button
                  onClick={() => setTab(2)}
                  className={`w-1/2 py-2 rounded-lg transition-all ${tab === 2 ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-300"}`}
                >
                  Preview
                </button>
              </div>

              {/* Toolbar */}
              <div className="w-full h-[50px] flex items-center justify-between px-4 bg-white dark:bg-[#17171C] transition-colors duration-200">
                <p className="font-bold text-gray-800 dark:text-gray-200">Code Editor</p>
                <div className="flex items-center gap-2">
                  {tab === 1 ? (
                    <>
                      <button onClick={copyCode} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">
                        <IoCopy />
                      </button>
                      <button onClick={downloadFile} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">
                        <PiExportBold />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setIsNewTabOpen(true)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">
                        <ImNewTab />
                      </button>
                      <button onClick={() => setRefreshKey((prev) => prev + 1)} className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#333] transition-colors">
                        <FiRefreshCcw />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Editor / Preview */}
              <div className="h-full">
                {tab === 1 ? (
                  <Editor value={code} height="100%" theme="vs-dark" language="html" />
                ) : (
                  <iframe
                    key={refreshKey}
                    srcDoc={code}
                    className="w-full h-full bg-white dark:bg-[#0b0b0d] text-black dark:text-white transition-colors duration-200"
                  ></iframe>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Fullscreen Preview Overlay */}
      {isNewTabOpen && (
        <div className="absolute inset-0 bg-white dark:bg-[#09090B] w-screen h-screen overflow-auto transition-colors">
          <div className="text-black dark:text-white w-full h-[60px] flex items-center justify-between px-5 bg-gray-100 dark:bg-[#111827]">
            <p className="font-bold">Preview</p>
            <button onClick={() => setIsNewTabOpen(false)} className="w-10 h-10 rounded-xl border border-zinc-300 dark:border-zinc-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <IoCloseSharp />
            </button>
          </div>
          <iframe srcDoc={code} className="w-full h-[calc(100vh-60px)] bg-white dark:bg-[#0b0b0d]"></iframe>
        </div>
      )}

      <footer className="text-center text-gray-600 dark:text-gray-300 py-4 text-sm">
        Built with ❤️ by Muskan Gupta • GenUI Code Studio • 2025
      </footer>
    </div>
  );
};

export default Home;
