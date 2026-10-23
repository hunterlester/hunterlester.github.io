import fs from "fs";
import path from "path";
import HafDocument from "@/components/HafDocument";

export default function FindingsPage() {
  const filePath = path.join(
    process.cwd(),
    "src/content/haf/experimental-findings.md"
  );

  const content = fs.readFileSync(filePath, "utf8");

  return (
    <HafDocument
      content={content}
      next={{
        title: "Design Foundations",
        href: "/haf/foundations",
      }}
    />
  );
}
