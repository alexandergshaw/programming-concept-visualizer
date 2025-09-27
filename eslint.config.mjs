import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable unused imports/variables warnings
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      
      // Disable unescaped entities warnings
      "react/no-unescaped-entities": "off",
      
      // Disable other common issues that don't affect functionality
      "react-hooks/exhaustive-deps": "warn", // Change from error to warning
      "@next/next/no-img-element": "warn", // Change from error to warning
    }
  }
];

export default eslintConfig;
