import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import FormattedNote from "@/components/questions/FormattedNote";

describe("FormattedNote", () => {
  describe("Inline formatting", () => {
    it("renders plain text as-is", () => {
      render(<FormattedNote text="hello world" />);
      expect(screen.getByText("hello world")).toBeInTheDocument();
    });

    it("renders **bold** as <strong>", () => {
      const { container } = render(<FormattedNote text="**bold**" />);
      const strong = container.querySelector("strong");
      expect(strong).toBeInTheDocument();
      expect(strong!.textContent).toBe("bold");
    });

    it("renders *italic* as <em>", () => {
      const { container } = render(<FormattedNote text="*italic*" />);
      const em = container.querySelector("em");
      expect(em).toBeInTheDocument();
      expect(em!.textContent).toBe("italic");
    });

    it("renders ***bold+italic*** as <strong><em>", () => {
      const { container } = render(<FormattedNote text="***bold+italic***" />);
      const strong = container.querySelector("strong");
      const em = container.querySelector("em");
      expect(strong).toBeInTheDocument();
      expect(em).toBeInTheDocument();
      expect(strong!.contains(em!)).toBe(true);
      expect(em!.textContent).toBe("bold+italic");
    });

    it("renders `code` as <code>", () => {
      const { container } = render(<FormattedNote text="`code`" />);
      const code = container.querySelector("code");
      expect(code).toBeInTheDocument();
      expect(code!.textContent).toBe("code");
    });

    it("renders ~~strikethrough~~ as <s>", () => {
      const { container } = render(<FormattedNote text="~~strikethrough~~" />);
      const s = container.querySelector("s");
      expect(s).toBeInTheDocument();
      expect(s!.textContent).toBe("strikethrough");
    });

    it("renders nested formatting: **some *italic* inside**", () => {
      const { container } = render(
        <FormattedNote text="**some *italic* inside**" />
      );
      const strong = container.querySelector("strong");
      expect(strong).toBeInTheDocument();
      expect(strong!.textContent).toBe("some italic inside");
      const em = strong!.querySelector("em");
      expect(em).toBeInTheDocument();
      expect(em!.textContent).toBe("italic");
    });

    it("renders mixed inline formatting in one line", () => {
      const { container } = render(
        <FormattedNote text="hello **bold** and *italic* and `code`" />
      );
      expect(container.querySelector("strong")!.textContent).toBe("bold");
      expect(container.querySelector("em")!.textContent).toBe("italic");
      expect(container.querySelector("code")!.textContent).toBe("code");
    });

    it("leaves unmatched markers as plain text", () => {
      const { container } = render(
        <FormattedNote text="hello **unmatched" />
      );
      expect(container.textContent).toBe("hello **unmatched");
      expect(container.querySelector("strong")).toBeNull();
    });
  });

  describe("Lists", () => {
    it("renders - item as <ul> with <li>", () => {
      const { container } = render(<FormattedNote text="- first item" />);
      const ul = container.querySelector("ul");
      expect(ul).toBeInTheDocument();
      const li = ul!.querySelector("li");
      expect(li).toBeInTheDocument();
      expect(li!.textContent).toBe("first item");
    });

    it("renders * item as bullet list", () => {
      const { container } = render(<FormattedNote text="* star item" />);
      const ul = container.querySelector("ul");
      expect(ul).toBeInTheDocument();
      expect(ul!.querySelector("li")!.textContent).toBe("star item");
    });

    it("renders 1. item as <ol> with <li>", () => {
      const { container } = render(<FormattedNote text="1. first" />);
      const ol = container.querySelector("ol");
      expect(ol).toBeInTheDocument();
      const li = ol!.querySelector("li");
      expect(li).toBeInTheDocument();
      expect(li!.textContent).toBe("first");
    });

    it("groups consecutive bullet lines into one <ul>", () => {
      const { container } = render(
        <FormattedNote text={"- one\n- two\n- three"} />
      );
      const uls = container.querySelectorAll("ul");
      expect(uls).toHaveLength(1);
      const lis = uls[0].querySelectorAll("li");
      expect(lis).toHaveLength(3);
      expect(lis[0].textContent).toBe("one");
      expect(lis[1].textContent).toBe("two");
      expect(lis[2].textContent).toBe("three");
    });

    it("groups consecutive numbered lines into one <ol>", () => {
      const { container } = render(
        <FormattedNote text={"1. first\n2. second\n3. third"} />
      );
      const ols = container.querySelectorAll("ol");
      expect(ols).toHaveLength(1);
      const lis = ols[0].querySelectorAll("li");
      expect(lis).toHaveLength(3);
      expect(lis[0].textContent).toBe("first");
      expect(lis[1].textContent).toBe("second");
      expect(lis[2].textContent).toBe("third");
    });

    it("renders inline formatting inside list items", () => {
      const { container } = render(
        <FormattedNote text="- **bold item**" />
      );
      const li = container.querySelector("li");
      expect(li).toBeInTheDocument();
      const strong = li!.querySelector("strong");
      expect(strong).toBeInTheDocument();
      expect(strong!.textContent).toBe("bold item");
    });

    it("renders list followed by plain text correctly", () => {
      const { container } = render(
        <FormattedNote text={"- item\nplain text"} />
      );
      const ul = container.querySelector("ul");
      expect(ul).toBeInTheDocument();
      expect(container.textContent).toContain("plain text");
    });
  });

  describe("Line breaks", () => {
    it("renders newlines in plain text as <br>", () => {
      const { container } = render(
        <FormattedNote text={"line one\nline two"} />
      );
      const brs = container.querySelectorAll("br");
      expect(brs.length).toBeGreaterThanOrEqual(1);
      expect(container.textContent).toContain("line one");
      expect(container.textContent).toContain("line two");
    });

    it("renders multiple lines correctly", () => {
      const { container } = render(
        <FormattedNote text={"first\nsecond\nthird"} />
      );
      const brs = container.querySelectorAll("br");
      expect(brs).toHaveLength(2);
      expect(container.textContent).toBe("firstsecondthird");
    });
  });

  describe("className prop", () => {
    it("passes className to the outer <span>", () => {
      const { container } = render(
        <FormattedNote text="test" className="custom-class" />
      );
      const span = container.querySelector("span");
      expect(span).toBeInTheDocument();
      expect(span!.className).toBe("custom-class");
    });
  });
});
