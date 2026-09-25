import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";

interface DocumentLink {
  title: string;
  href: string;
}

interface HafDocumentProps {
  content: string;
  previous?: DocumentLink;
  next?: DocumentLink;
}

interface TocItem {
  title: string;
  id: string;
}

function cleanHeading(title: string) {
  return title
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/`/g, "")
    .trim();
}

function slugifyHeading(title: string) {
  return cleanHeading(title)
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function getDocumentTitle(content: string) {
  const titleLine = content
    .split("\n")
    .find((line) => /^#\s+/.test(line));

  return titleLine
    ? cleanHeading(titleLine.replace(/^#\s+/, ""))
    : undefined;
}

function removeDocumentTitle(content: string) {
  const lines = content.split("\n");

  const titleIndex = lines.findIndex((line) => /^#\s+/.test(line));

  if (titleIndex !== -1) {
    lines.splice(titleIndex, 1);
  }

  return lines.join("\n");
}

function getTableOfContents(content: string): TocItem[] {
  return content
    .split("\n")
    .filter((line) => /^##\s+/.test(line))
    .map((line) => {
      const title = cleanHeading(line.replace(/^##\s+/, ""));

      return {
        title,
        id: slugifyHeading(title),
      };
    });
}

export default function HafDocument({
  content,
  previous,
  next,
}: HafDocumentProps) {
  const documentTitle = getDocumentTitle(content);
  const tableOfContents = getTableOfContents(content);
  const contentWithoutTitle = removeDocumentTitle(content);

  return (
    <main className="document-page">
      <nav className="document-nav">
        <a href="/haf">← Human Advocacy Framework</a>
      </nav>

      {documentTitle && (
        <header className="document-header">
          <h1>{documentTitle}</h1>
        </header>
      )}

      {tableOfContents.length > 0 && (
        <nav className="table-of-contents" aria-label="Table of contents">
          <p className="eyebrow">Contents</p>

          <ol>
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <article className="markdown-document">
        <ReactMarkdown rehypePlugins={[rehypeSlug]}>
          {contentWithoutTitle}
        </ReactMarkdown>
      </article>

      <nav className="document-pagination" aria-label="Project documents">
        <div>
          {previous && (
            <a href={previous.href}>
              <span>Previous</span>
              <strong>← {previous.title}</strong>
            </a>
          )}
        </div>

        <div className="document-pagination-next">
          {next && (
            <a href={next.href}>
              <span>Next</span>
              <strong>{next.title} →</strong>
            </a>
          )}
        </div>
      </nav>
    </main>
  );
}

