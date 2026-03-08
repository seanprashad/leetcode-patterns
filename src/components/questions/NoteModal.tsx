export interface EditingNote {
  id: number;
  title: string;
  draft: string;
  confirmDiscard: boolean;
}

export default function NoteModal({
  editingNote,
  setEditingNote,
  updateNote,
  notes,
}: {
  editingNote: EditingNote;
  setEditingNote: (note: EditingNote | null) => void;
  updateNote: (id: number, value: string) => void;
  notes: Record<number, string>;
}) {
  const saved = notes[editingNote.id] ?? "";
  const hasChanges = editingNote.draft !== saved;
  const tryDismiss = () => {
    if (hasChanges) {
      setEditingNote({ ...editingNote, confirmDiscard: true });
    } else {
      setEditingNote(null);
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={tryDismiss}
      role="dialog"
      aria-modal="true"
      aria-label={`Edit note for ${editingNote.title}`}
    >
      <div
        className="mx-4 w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        {editingNote.confirmDiscard ? (
          <>
            <h2 className="mb-2 text-lg font-semibold">Unsaved changes</h2>
            <p className="mb-3 text-sm text-zinc-500">
              Your note for <span className="font-medium text-foreground">{editingNote.title}</span> has
              been modified but not saved. Would you like to go back and save
              your changes, or discard them?
            </p>
            <div className="mb-4 rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-700 dark:bg-zinc-800">
              <p className="mb-1 text-xs font-medium text-zinc-400">Your unsaved note:</p>
              <p className="whitespace-pre-wrap break-words text-zinc-600 dark:text-zinc-300">
                {editingNote.draft || <span className="italic text-zinc-400">(empty)</span>}
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditingNote({ ...editingNote, confirmDiscard: false })
                }
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Keep editing
              </button>
              <button
                onClick={() => setEditingNote(null)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Discard
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="mb-1 text-lg font-semibold">{editingNote.title}</h2>
            <p className="mb-4 text-sm text-zinc-500">Add your notes below</p>
            <textarea
              autoFocus
              rows={4}
              value={editingNote.draft}
              onChange={(e) =>
                setEditingNote({ ...editingNote, draft: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  updateNote(editingNote.id, editingNote.draft);
                  setEditingNote(null);
                }
              }}
              placeholder="Write your notes here..."
              className="w-full resize-y rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm break-words focus:border-blue-500 focus:outline-none dark:border-zinc-700"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                {editingNote.draft.length} character{editingNote.draft.length !== 1 ? "s" : ""}
              </span>
              {hasChanges ? (
                <span className="text-xs text-amber-600 dark:text-amber-400">
                  ⚠ Unsaved changes · {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Enter to save
                </span>
              ) : (
                <span className="text-xs text-zinc-400">
                  {navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+Enter to save
                </span>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={tryDismiss}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateNote(editingNote.id, editingNote.draft);
                  setEditingNote(null);
                }}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
