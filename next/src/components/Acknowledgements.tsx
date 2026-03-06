"use client";

import { trackEvent } from "@/lib/analytics";

const sources = [
  {
    title: "Blind Curated 75 Question List",
    image: "/static/images/Blind.png",
    url: "https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU",
    label: "Blind 75 url",
  },
  {
    title: "Grokking the Coding Interview: Patterns for Coding Questions",
    image: "/static/images/DesignGurus.png",
    url: "https://www.designgurus.io/course/grokking-the-coding-interview",
    label: "DesignGurus.io url",
  },
  {
    title: "14 Patterns to Ace Any Coding Interview Question",
    image: "/static/images/Hackernoon.png",
    url: "https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed",
    label: "Hackernoon url",
  },
];

export default function Acknowledgements() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-bold">
        The following sources were used in aggregating this question list:
      </h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {sources.map((source) => (
          <div
            key={source.label}
            className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <img src={source.image} alt={source.title} className="w-full" />
            <div className="p-4">
              <h2 className="mb-2 text-sm font-semibold">{source.title}</h2>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs break-all"
                onClick={() =>
                  trackEvent("Acknowledgements", "Clicked URL", source.label)
                }
              >
                {source.url}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
