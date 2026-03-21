import { Fragment } from "react";

let keyCounter = 0;

function parseInlineMarkdown(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  // Order matters: bold+italic before bold before italic
  const regex = /(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(.+?)\*)|(`(.+?)`)|(~~(.+?)~~)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      tokens.push(<strong key={keyCounter++}><em>{parseInlineMarkdown(match[2])}</em></strong>);
    } else if (match[3]) {
      tokens.push(<strong key={keyCounter++}>{parseInlineMarkdown(match[4])}</strong>);
    } else if (match[5]) {
      tokens.push(<em key={keyCounter++}>{parseInlineMarkdown(match[6])}</em>);
    } else if (match[7]) {
      tokens.push(
        <code key={keyCounter++} className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
          {match[8]}
        </code>
      );
    } else if (match[9]) {
      tokens.push(<s key={keyCounter++}>{parseInlineMarkdown(match[10])}</s>);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    tokens.push(text.slice(lastIndex));
  }

  return tokens;
}

const bulletRegex = /^[-*] (.*)$/;
const numberedRegex = /^\d+\. (.*)$/;

export default function FormattedNote({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  keyCounter = 0;
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    // Collect consecutive bullet lines
    if (bulletRegex.test(lines[i])) {
      const items: string[] = [];
      while (i < lines.length && bulletRegex.test(lines[i])) {
        items.push(lines[i].match(bulletRegex)![1]);
        i++;
      }
      elements.push(
        <ul key={keyCounter++} className="my-1 list-disc pl-5">
          {items.map((item, j) => (
            <li key={j}>{parseInlineMarkdown(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Collect consecutive numbered lines
    if (numberedRegex.test(lines[i])) {
      const items: string[] = [];
      while (i < lines.length && numberedRegex.test(lines[i])) {
        items.push(lines[i].match(numberedRegex)![1]);
        i++;
      }
      elements.push(
        <ol key={keyCounter++} className="my-1 list-decimal pl-5">
          {items.map((item, j) => (
            <li key={j}>{parseInlineMarkdown(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Regular line
    elements.push(
      <Fragment key={keyCounter++}>
        {i > 0 && <br />}
        {parseInlineMarkdown(lines[i])}
      </Fragment>
    );
    i++;
  }

  return <span className={className}>{elements}</span>;
}
