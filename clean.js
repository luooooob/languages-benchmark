#!/usr/bin/env node

const fs = require("fs/promises")
const path = require("path")

const files = [
  path.resolve(__dirname, "c", "main.exe"),
  path.resolve(__dirname, "go", "main.exe"),
  path.resolve(__dirname, "java", "Main.class"),
  path.resolve(__dirname, "java", "Solution.class"),
]

Promise.all(files.map(async (file) => {
  await fs.rm(file)
}))
