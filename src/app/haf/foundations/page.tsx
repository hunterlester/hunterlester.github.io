import fs from "fs";
import path from "path";
import HafDocument from "@/components/HafDocument";

export default function FoundationsPage() {
  const filePath = path.join(
    process.cwd(),
    "src/content/haf/foundations.md"
  );

  const content = fs.readFileSync(filePath, "utf8");

  return <HafDocument content={content} next={{
      title: "Advocacy Scenarios",
      href: "/haf/scenarios", 
  }} />;
}
