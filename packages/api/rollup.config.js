import { defineConfig } from "rollup";
import { builtinModules } from "module";
import { dependencies } from "./package.json";

import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
// import commonjs from "@rollup/plugin-commonjs"; todo: fix this and find whats wrong
import run from "@rollup/plugin-run";

const PROD = process.env.NODE_ENV === "production";
const DEV = Boolean(process.env.ROLLUP_WATCH);

export default defineConfig({
    input: "src/index.ts",
    external: [...builtinModules, ...Object.keys(dependencies)],
    output: {
        format: "cjs",
        dir: "./out"
    },
    plugins: [
        resolve(),
        json(),
        typescript(),
        DEV && run()
    ]
})