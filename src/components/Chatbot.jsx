import React, { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/**
 * Props:
 * - collapsible?: boolean         // header with minimize button
 * - title?: string                // header title
 * - defaultOpen?: boolean         // start opened or minimized
 * - meta?: { level?: string, duration?: string|number, style?: string }
 */
export default function Chatbot({
  collapsible = false,
  title = "AI Tutor",
  defaultOpen = true,
  meta = {},
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! Ask me anything about your course." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // --- Helpers ---
  const extractAnswer = (data) =>
    data?.answer ??
    data?.reply ??
    data?.response ??
    data?.message ??
    data?.content ??
    null;

  const ytSearch = (q) =>
    `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
  const courseraSearch = (q) =>
    `https://www.coursera.org/search?query=${encodeURIComponent(q)}`;
  const googleSearch = (q) =>
    `https://www.google.com/search?q=${encodeURIComponent(q)}`;
  const wikiSearch = (q) =>
    `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`;

  // ensure every resource has a link; if not, synthesize reputable search links
  const normalizeResources = (resources, userQuery) => {
    if (!Array.isArray(resources)) return [];
    return resources.map((r, idx) => {
      const title = String(r?.title ?? "Untitled");
      const type = ["video", "article", "course", "docs"].includes(r?.type)
        ? r.type
        : "article";
      let url = r?.url;

      if (!url || !/^https?:\/\//i.test(url)) {
        // synthesize useful fallbacks
        const q = title && title !== "Untitled" ? title : userQuery || "learn";
        const picks = [
          { title: `YouTube: ${q}`, type: "video", url: ytSearch(q) },
          { title: `Coursera: ${q}`, type: "course", url: courseraSearch(q) },
          { title: `Wikipedia: ${q}`, type: "article", url: wikiSearch(q) },
          { title: `Google: ${q}`, type: "article", url: googleSearch(q) },
        ];
        // pick one deterministically for variety
        const pick = picks[idx % picks.length];
        return {
          title: title === "Untitled" ? pick.title : title,
          type: type === "article" ? pick.type : type,
          url: pick.url,
        };
      }

      return { title, type, url };
    });
  };

  const sendMessage = async (presetText) => {
    const textToSend = typeof presetText === "string" ? presetText : input;
    if (!textToSend.trim()) return;

    // push user message
    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        console.error("Chat API error:", res.status, errText);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `⚠️ Server error: ${res.status}` },
        ]);
        setLoading(false);
        return;
      }

      const data = await res.json().catch((e) => {
        console.error("JSON parse error:", e);
        return null;
      });

      console.log("🔎 Chatbot raw response:", data);
      if (!data) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "⚠️ No reply from server (parse failed)." },
        ]);
        setLoading(false);
        return;
      }

      const answer = extractAnswer(data);

      // append bot answer
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: answer || "⚠️ No reply from server." },
      ]);

      // suggested topics
      const topics = Array.isArray(data?.suggestedTopics)
        ? data.suggestedTopics
        : [];
      if (topics.length > 0) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "💡 Suggested topics:", topics },
        ]);
      }

      // resources (normalized to ensure links)
      const normalized = normalizeResources(data?.resources || [], textToSend);
      if (normalized.length > 0) {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "📚 Recommended resources:", resources: normalized },
        ]);
      }
    } catch (err) {
      console.error("Network error:", err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Could not reach server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Header (collapsible/minimize)
  const HeaderBar = () =>
    collapsible ? (
      <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="font-semibold text-gray-800 dark:text-gray-100">{title}</div>

          {/* meta badges */}
          {(meta?.level || meta?.duration || meta?.style) && (
            <div className="flex items-center gap-1 text-xs">
              {meta?.level && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-200">
                  {String(meta.level).toUpperCase()}
                </span>
              )}
              {meta?.duration && (
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-200">
                  {String(meta.duration)} wk
                </span>
              )}
              {meta?.style && (
                <span className="px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-200">
                  {String(meta.style)}
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="text-sm px-2 py-1 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
          aria-label={open ? "Minimize" : "Expand"}
          title={open ? "Minimize" : "Expand"}
        >
          {open ? "–" : "+"}
        </button>
      </div>
    ) : null;

  return (
    <div
      className={`flex flex-col w-full ${
        collapsible
          ? "rounded-lg shadow-lg border dark:border-gray-700 bg-white dark:bg-gray-800"
          : ""
      }`}
    >
      <HeaderBar />

      {/* Collapsed? only show header */}
      {collapsible && !open ? null : (
        <div
          className={`flex flex-col ${
            collapsible ? "p-3" : ""
          } max-w-lg ${collapsible ? "" : "mx-auto"} h-[600px]`}
        >
          <div className="flex-1 overflow-y-auto space-y-3 mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col">
                <div
                  className={`p-3 rounded-xl max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-200 text-black dark:bg-gray-600 dark:text-gray-100 self-start"
                  }`}
                >
                  <pre className="whitespace-pre-wrap">{msg.text}</pre>
                </div>

                {/* Suggested topics chips */}
                {msg.sender === "bot" && Array.isArray(msg.topics) && msg.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {msg.topics.map((topic, j) => (
                      <button
                        key={j}
                        onClick={() => sendMessage(topic)}
                        className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}

                {/* Resource cards (always with links thanks to normalization) */}
                {msg.sender === "bot" && Array.isArray(msg.resources) && msg.resources.length > 0 && (
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {msg.resources.map((r, k) => (
                      <a
                        key={k}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 rounded-lg border hover:bg-white dark:hover:bg-gray-600 bg-white dark:bg-gray-800 dark:border-gray-600 transition"
                      >
                        <div className="text-xs uppercase text-gray-500 dark:text-gray-300">
                          {r.type || "resource"}
                        </div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {r.title || "Untitled"}
                        </div>
                        <div className="text-xs text-blue-600 dark:text-blue-300 mt-1 break-all">
                          {r.url}
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-l px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Type your message…"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading}
              className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "…" : "Send"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
