import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"
import eslintPluginPrettier from "eslint-plugin-prettier"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next", "prettier"),
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      "max-len": ["error", { code: 100 }],
      "prettier/prettier": ["error", { semi: false, endOfLine: "auto" }],
      "no-console": "warn",
      semi: ["error", "never"],
      quotes: ["error", "double"],
      "react/react-in-jsx-scope": "off",
      indent: ["error", 2],
    },
  },
]

export default eslintConfig
