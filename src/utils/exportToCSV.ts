import { Roadmap } from "./types";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

const difficultyMap: Record<number, string> = {
  1: "Super Easy",
  2: "Easy",
  3: "Normal",
  4: "Hard",
  5: "Super Hard",
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

export const exportToCSV = (roadmap: Roadmap, title: string) => {
  const rows: string[] = [
    "Subject,Topic,Difficulty,Completed,Note,Completed At",
  ];

  for (const [subject, topics] of Object.entries(roadmap)) {
    for (const t of topics) {
      const difficulty = difficultyMap[t.difficulty ?? 3]; // default to "Normal" if missing

      // Format timestamp nicely or leave empty string
      const formattedDate = t.timeStamp
        ? new Date(t.timeStamp).toLocaleString()
        : "";

      // Escape any double quotes in notes by doubling them to keep CSV valid
      const safeNote = (t.note || "").replace(/"/g, '""');

      rows.push(
        `${subject},"${t.title}","${difficulty}",${
          t.marked ? "Yes" : "No"
        },"${safeNote}","${formattedDate}"`
      );
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title}_roadmap.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
