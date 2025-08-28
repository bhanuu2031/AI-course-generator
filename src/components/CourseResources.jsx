import React from "react";

const ytSearch = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const courseraSearch = (q) => `https://www.coursera.org/search?query=${encodeURIComponent(q)}`;
const googleSearch = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;
const wikiSearch = (q) => `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(q)}`;

function normalizeResources(resources) {
  if (!Array.isArray(resources)) return [];

  return resources.map((item, idx) => {
    // allow both string and object shapes
    if (typeof item === "string") {
      const title = item;
      const fallbacks = [
        { title: `YouTube: ${title}`, type: "video", url: ytSearch(title) },
        { title: `Coursera: ${title}`, type: "course", url: courseraSearch(title) },
        { title: `Wikipedia: ${title}`, type: "article", url: wikiSearch(title) },
        { title: `Google: ${title}`, type: "article", url: googleSearch(title) },
      ];
      return fallbacks[idx % fallbacks.length];
    }

    const title = String(item?.title ?? "Untitled");
    const type = ["video", "article", "course", "docs"].includes(item?.type) ? item.type : "article";
    let url = item?.url || item?.link; // support both keys

    if (!url || !/^https?:\/\//i.test(url)) {
      // synthesize a helpful link
      const q = title !== "Untitled" ? title : "learn";
      const picks = [
        { title: `YouTube: ${q}`, type: "video", url: ytSearch(q) },
        { title: `Coursera: ${q}`, type: "course", url: courseraSearch(q) },
        { title: `Wikipedia: ${q}`, type: "article", url: wikiSearch(q) },
        { title: `Google: ${q}`, type: "article", url: googleSearch(q) },
      ];
      const pick = picks[idx % picks.length];
      return { title, type: type === "article" ? pick.type : type, url: pick.url };
    }

    return { title, type, url };
  });
}

const CourseResources = ({ resources }) => {
  const list = normalizeResources(resources);

  if (list.length === 0) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-sm">
        <p className="text-gray-500 dark:text-gray-300 italic">No resources available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Course Resources</h2>
      <ul className="space-y-3">
        {list.map((res, index) => (
          <li key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="text-sm text-gray-500 dark:text-gray-300 uppercase">{res.type}</div>
            <div className="font-medium text-gray-800 dark:text-gray-100">{res.title}</div>
            <a
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-300 hover:underline mt-1 break-all inline-block"
            >
              {res.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseResources;
