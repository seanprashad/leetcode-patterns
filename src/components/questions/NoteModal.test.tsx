import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NoteModal, { type EditingNote } from "@/components/questions/NoteModal";

function renderModal(overrides: Partial<EditingNote> = {}, notesSaved: Record<number, string> = {}) {
  const editingNote: EditingNote = { id: 1, title: "Test Problem", draft: "", confirmDiscard: false, ...overrides };
  const setEditingNote = vi.fn();
  const updateNote = vi.fn();
  render(<NoteModal editingNote={editingNote} setEditingNote={setEditingNote} updateNote={updateNote} notes={notesSaved} />);
  return { setEditingNote, updateNote, editingNote };
}

describe("NoteModal", () => {
  describe("Basic rendering", () => {
    it("renders the dialog with the problem title", () => {
      renderModal();
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-label", "Edit note for Test Problem");
      expect(screen.getByText("Test Problem")).toBeInTheDocument();
    });

    it("shows textarea with draft content", () => {
      renderModal({ draft: "my draft" });
      const textarea = screen.getByPlaceholderText("Write your notes here...");
      expect(textarea).toHaveValue("my draft");
    });

    it("shows character count", () => {
      renderModal({ draft: "hello" });
      expect(screen.getByText(/5 \/ 10,000 characters/)).toBeInTheDocument();
    });
  });

  describe("Formatting toolbar", () => {
    it("shows Bold, Italic, Strikethrough, Code buttons", () => {
      renderModal();
      expect(screen.getByTitle(/bold/i)).toBeInTheDocument();
      expect(screen.getByTitle(/italic/i)).toBeInTheDocument();
      expect(screen.getByTitle(/strikethrough/i)).toBeInTheDocument();
      expect(screen.getByTitle(/code/i)).toBeInTheDocument();
    });

    it("shows Bullet list and Numbered list buttons", () => {
      renderModal();
      expect(screen.getByTitle("Bullet list")).toBeInTheDocument();
      expect(screen.getByTitle("Numbered list")).toBeInTheDocument();
    });

    it("clicking Bold button inserts ** markers", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal();
      await user.click(screen.getByTitle(/bold/i));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("**") }));
    });

    it("clicking Italic button inserts * markers", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal();
      await user.click(screen.getByTitle(/italic/i));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("*") }));
    });

    it("clicking Strikethrough button inserts ~~ markers", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal();
      await user.click(screen.getByTitle(/strikethrough/i));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("~~") }));
    });

    it("clicking Code button inserts backtick markers", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal();
      await user.click(screen.getByTitle(/code/i));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("`") }));
    });

    it("clicking Bullet list button inserts - prefix", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal();
      await user.click(screen.getByTitle("Bullet list"));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("- ") }));
    });

    it("clicking Numbered list button inserts 1. prefix", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal();
      await user.click(screen.getByTitle("Numbered list"));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("1. ") }));
    });
  });

  describe("Keyboard shortcuts", () => {
    it("Cmd+B triggers bold formatting", () => {
      const { setEditingNote } = renderModal();
      const textarea = screen.getByPlaceholderText("Write your notes here...");
      fireEvent.keyDown(textarea, { key: "b", metaKey: true });
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("**") }));
    });

    it("Cmd+I triggers italic formatting", () => {
      const { setEditingNote } = renderModal();
      const textarea = screen.getByPlaceholderText("Write your notes here...");
      fireEvent.keyDown(textarea, { key: "i", metaKey: true });
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ draft: expect.stringContaining("*") }));
    });

    it("Cmd+Enter saves and closes", () => {
      const { setEditingNote, updateNote } = renderModal({ draft: "saved text" });
      const textarea = screen.getByPlaceholderText("Write your notes here...");
      fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });
      expect(updateNote).toHaveBeenCalledWith(1, "saved text");
      expect(setEditingNote).toHaveBeenCalledWith(null);
    });
  });

  describe("Dismiss behavior", () => {
    it("clicking Cancel when no changes calls setEditingNote(null)", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal({ draft: "" }, {});
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(setEditingNote).toHaveBeenCalledWith(null);
    });

    it("clicking Cancel with unsaved changes shows confirm discard dialog", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal({ draft: "modified" }, { 1: "original" });
      await user.click(screen.getByRole("button", { name: "Cancel" }));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ confirmDiscard: true }));
    });

    it("clicking Done saves and closes", async () => {
      const user = userEvent.setup();
      const { setEditingNote, updateNote } = renderModal({ draft: "my note" });
      await user.click(screen.getByRole("button", { name: "Done" }));
      expect(updateNote).toHaveBeenCalledWith(1, "my note");
      expect(setEditingNote).toHaveBeenCalledWith(null);
    });
  });

  describe("Confirm discard dialog", () => {
    it("shows Unsaved changes heading when confirmDiscard is true", () => {
      renderModal({ confirmDiscard: true, draft: "changed" }, { 1: "original" });
      expect(screen.getByText("Unsaved changes")).toBeInTheDocument();
    });

    it("Keep editing button goes back to editing", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal({ confirmDiscard: true, draft: "changed" }, { 1: "original" });
      await user.click(screen.getByRole("button", { name: "Keep editing" }));
      expect(setEditingNote).toHaveBeenCalledWith(expect.objectContaining({ confirmDiscard: false }));
    });

    it("Discard button dismisses the modal", async () => {
      const user = userEvent.setup();
      const { setEditingNote } = renderModal({ confirmDiscard: true, draft: "changed" }, { 1: "original" });
      await user.click(screen.getByRole("button", { name: "Discard" }));
      expect(setEditingNote).toHaveBeenCalledWith(null);
    });
  });
});
