export const LANGUAGES = [
  { label: "Python", value: "python3" },
  { label: "Node.js", value: "nodejs" },
  { label: "TypeScript", value: "typescript" },
  { label: "HTML", value: "html" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
  { label: "Java", value: "java10" },
  { label: "Ruby", value: "ruby" },
  { label: "Rust", value: "rust" },
  { label: "Go", value: "go" },
];

const MAIN_FILES = {
  python3: "main.py",
  nodejs: "index.js",
  c: "main.c",
  cpp: "main.cpp",
  java10: "main.java",
  html: "index.html",
  typescript: "index.ts",
  ruby: "main.rb",
  rust: "main.rs",
  go: "main.go",
};

export function getMainFileForLanguage(language: SupportedLanguage): string {
  return MAIN_FILES[language];
}

export type SupportedLanguage = keyof typeof MAIN_FILES;
