import { useCallback, useEffect, useRef } from "react";
import { Bold, Italic, Strikethrough, Code, List, ListOrdered } from "lucide-react";
import { MAX_NOTE_LENGTH } from "@/lib/storage";

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
  const mouseDownOnBackdrop = useRef(false);
  const resizing = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onTextareaMouseDown = useCallback(() => {
    resizing.current = true;
  }, []);

  useEffect(() => {
    const onMouseUp = () => {
      if (resizing.current) {
        requestAnimationFrame(() => {
          resizing.current = false;
        });
      }
    };
    window.addEventListener("mouseup", onMouseUp);
    return () => window.removeEventListener("mouseup", onMouseUp);
  }, []);

  const guardedClick = (fn: () => void) => () => {
    if (!resizing.current) fn();
  };

  const wrapSelection = useCallback(
    (prefix: string, suffix: string) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const text = editingNote.draft;
      const selected = text.slice(start, end);
      const wrapped = prefix + selected + suffix;
      const updated = text.slice(0, start) + wrapped + text.slice(end);
      setEditingNote({ ...editingNote, draft: updated });
      requestAnimationFrame(() => {
        ta.focus();
        if (selected.length > 0) {
          ta.setSelectionRange(start, start + wrapped.length);
        } else {
          const cursor = start + prefix.length;
          ta.setSelectionRange(cursor, cursor);
        }
      });
    },
    [editingNote, setEditingNote],
  );

  const prefixLines = useCallback(
    (mode: "bullet" | "numbered") => {
      const ta = textareaRef.current;
      if (!ta) return;
      const text = editingNote.draft;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const lineStart = text.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = text.indexOf("\n", end);
      const block = text.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
      const lines = block.split("\n");
      const prefixed = lines
        .map((l, i) => (mode === "bullet" ? `- ${l}` : `${i + 1}. ${l}`))
        .join("\n");
      const updated = text.slice(0, lineStart) + prefixed + (lineEnd === -1 ? "" : text.slice(lineEnd));
      setEditingNote({ ...editingNote, draft: updated });
      requestAnimationFrame(() => {
        ta.focus();
        ta.setSelectionRange(lineStart, lineStart + prefixed.length);
      });
    },
    [editingNote, setEditingNote],
  );

  const formatActions = [
    { icon: Bold, prefix: "**", suffix: "**", title: "Bold", key: "b" },
    { icon: Italic, prefix: "*", suffix: "*", title: "Italic", key: "i" },
    { icon: Strikethrough, prefix: "~~", suffix: "~~", title: "Strikethrough", key: "s" },
    { icon: Code, prefix: "`", suffix: "`", title: "Code", key: "e" },
  ];

  const listActions = [
    { icon: List, mode: "bullet" as const, title: "Bullet list" },
    { icon: ListOrdered, mode: "numbered" as const, title: "Numbered list" },
  ];

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
      onMouseDown={(e) => {
        mouseDownOnBackdrop.current = e.target === e.currentTarget;
      }}
      onMouseUp={(e) => {
        if (mouseDownOnBackdrop.current && e.target === e.currentTarget && !resizing.current) {
          tryDismiss();
        }
        mouseDownOnBackdrop.current = false;
      }}
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
            <div className="mb-2 flex items-center gap-1">
              {formatActions.map(({ icon: Icon, prefix, suffix, title, key }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => wrapSelection(prefix, suffix)}
                  title={`${title} (${navigator.platform?.includes("Mac") ? "⌘" : "Ctrl"}+${key.toUpperCase()})`}
                  className="rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
              <div className="mx-1 h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
              {listActions.map(({ icon: Icon, mode, title }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => prefixLines(mode)}
                  title={title}
                  className="rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              autoFocus
              rows={14}
              value={editingNote.draft}
              onChange={(e) =>
                setEditingNote({ ...editingNote, draft: e.target.value })
              }
              onMouseDown={onTextareaMouseDown}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault();
                  updateNote(editingNote.id, editingNote.draft);
                  setEditingNote(null);
                  return;
                }
                if (e.metaKey || e.ctrlKey) {
                  const action = formatActions.find((a) => a.key === e.key);
                  if (action) {
                    e.preventDefault();
                    wrapSelection(action.prefix, action.suffix);
                  }
                }
              }}
              maxLength={MAX_NOTE_LENGTH}
              placeholder="Write your notes here..."
              className="w-full resize-y rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm break-words focus:border-blue-500 focus:outline-none dark:border-zinc-700"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className={`text-xs ${editingNote.draft.length >= MAX_NOTE_LENGTH ? "text-red-500" : "text-zinc-400"}`}>
                {editingNote.draft.length.toLocaleString()} / {MAX_NOTE_LENGTH.toLocaleString()} characters
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
                onClick={guardedClick(tryDismiss)}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={guardedClick(() => {
                  updateNote(editingNote.id, editingNote.draft);
                  setEditingNote(null);
                })}
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
