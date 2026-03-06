"use client";

import { useState } from "react";

interface ResetModalProps {
  onReset: () => void;
}

export default function ResetModal({ onReset }: ResetModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded border border-red-500 px-2 py-0.5 text-xs text-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
      >
        Reset
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <h3 className="mb-4 text-lg font-semibold">
              Are you sure you want to reset your progress?
            </h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  onReset();
                  setIsOpen(false);
                }}
                className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
