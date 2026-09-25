import fs from "fs";
import path from "path";
import HafDocument from "@/components/HafDocument";

export default function ScenariosPage() {
  const filePath = path.join(
    process.cwd(),
    "src/content/haf/scenarios.md"
  );

  const content = fs.readFileSync(filePath, "utf8");

  return <HafDocument content={content} next={{
      title: "Engineering Review",
      href: "/haf/engineering",
  }} />;
}
