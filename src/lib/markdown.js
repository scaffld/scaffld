/**
 * Minimal, safe markdown parser for the Terms documents: headings, paragraphs,
 * nested lists, hr, **bold**, _italic_. Output is data rendered by React — text
 * is never injected as HTML.
 */
export function parseMarkdown(src) {
  const blocks = [];
  let list = null;
  const flush = () => {
    if (list) blocks.push(list);
    list = null;
  };
  for (const raw of src.replace(/\r/g, "").split("\n")) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flush();
      continue;
    }
    const li = line.match(/^(\s*)- (.*)$/);
    if (li) {
      const nested = li[1].length >= 2;
      if (!list) list = { type: "ul", items: [] };
      if (nested && list.items.length) {
        const parent = list.items[list.items.length - 1];
        (parent.children ||= []).push(li[2]);
      } else list.items.push({ text: li[2] });
      continue;
    }
    flush();
    if (/^---+$/.test(line)) blocks.push({ type: "hr" });
    else if (line.startsWith("## ")) blocks.push({ type: "h2", text: line.slice(3) });
    else if (line.startsWith("# ")) blocks.push({ type: "h1", text: line.slice(2) });
    else blocks.push({ type: "p", text: line });
  }
  flush();
  return blocks;
}

/** Split inline **bold** and _italic_ into tokens. */
export function inline(text) {
  return text
    .split(/(\*\*[^*]+\*\*|_[^_]+_)/g)
    .filter(Boolean)
    .map((t) => {
      if (t.startsWith("**")) return { b: t.slice(2, -2) };
      if (t.length > 2 && t.startsWith("_") && t.endsWith("_")) return { i: t.slice(1, -1) };
      return { t };
    });
}
