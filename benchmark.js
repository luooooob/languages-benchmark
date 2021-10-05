#!/usr/bin/env node

const child_process = require("child_process")
const path = require("path")

const spawn_sync = child_process.spawnSync
const path_resolve = path.resolve

const WORKSPACE_C = path_resolve(__dirname, "c")
const WORKSPACE_JAVA = path_resolve(__dirname, "java")
const WORKSPACE_GO = path_resolve(__dirname, "go")
const WORKSPACE_PYTHON3 = path_resolve(__dirname, "python3",)
const WORKSPACE_NODEJS = path_resolve(__dirname, "nodejs")


const color_cyan = msg => `\x1b[36m${msg}\x1b[0m`
const color_magenta = msg => `\x1b[35m${msg}\x1b[0m`
const color_blue = msg => `\x1b[34m${msg}\x1b[0m`
const color_yellow = msg => `\x1b[33m${msg}\x1b[0m`
const color_green = msg => `\x1b[32m${msg}\x1b[0m`
const color_red = msg => `\x1b[31m${msg}\x1b[0m`

const print = console.log
const info = (msg) => console.info(`${color_green("[info]")} - ${msg}`)
const warn = (msg) => console.warn(`${color_yellow(`[warn] - ${msg}`)}`)


const parse_run_output = str => {
  return str
    .split(",")
    .map(str => Number.parseInt(str))
}

const spawn_check_command = (command, args) => {
  info(`check command "${command}"`)
  const { error } = spawn_sync(command, args)
  if (error) {
    warn(`command "${command}" not found`)
  }
  return error
}

const spawn_compile = (command, args, cwd) => {
  info(`compile`)
  const { stderr } = spawn_sync(command, args, { cwd })
  const has_err = stderr && stderr.length > 0
  if (has_err) {
    throw (stderr.toString())
  }
  return has_err
}

const spawn_run = (command, args, cwd) => {
  info(`run`)
  const { stdout, stderr } = spawn_sync(command, args, { cwd })
  const has_err = stderr && stderr.length > 0
  if (has_err) {
    throw (stderr.toString())
  }
  return parse_run_output(stdout.toString())
}

const push_data_table = (table, language, data = [0, 0, 0, 0]) => {
  table.push({
    language,
    countPrimes: data[1]
  })
}

const run_C = () => {
  info(`start ${color_magenta("C")}`)
  if (spawn_check_command("gcc", ["--version"])) {
    return null
  }
  if (spawn_compile("gcc", ["main.c", "-o", "main.exe"], WORKSPACE_C)) {
    return null
  }

  return spawn_run(path_resolve(WORKSPACE_C, "main.exe"), [], WORKSPACE_C)
}

const run_C_O3 = () => {
  info(`start ${color_magenta("C(O3)")}`)
  if (spawn_check_command("gcc", ["--version"])) {
    return null
  }
  if (spawn_compile("gcc", ["-O3", "main.c", "-o", "main.exe"], WORKSPACE_C)) {
    return null
  }

  return spawn_run(path_resolve(WORKSPACE_C, "main.exe"), [], WORKSPACE_C)
}

const run_Java = () => {
  info(`start ${color_magenta("Java")}`)
  if (spawn_check_command("javac", ["--version"])) {
    return null
  }
  if (spawn_check_command("java", ["--version"])) {
    return null
  }
  if (spawn_compile("javac", ["Main.java"], WORKSPACE_JAVA)) {
    return null
  }

  return spawn_run("java", ["Main"], WORKSPACE_JAVA)
}

const run_Go = () => {
  info(`start ${color_magenta("Go")}`)
  if (spawn_check_command("go", ["version"])) {
    return null
  }
  if (spawn_compile("go", ["build", "-o", "main.exe", "main.go"], WORKSPACE_GO)) {
    return null
  }

  return spawn_run(path_resolve(WORKSPACE_GO, "main.exe"), [], WORKSPACE_GO)
}

const run_Python3 = () => {
  info(`start ${color_magenta("Python3")}`)
  if (spawn_check_command("python3", ["--version"])) {
    return null
  }
  return spawn_run("python3", ["main.py"], WORKSPACE_PYTHON3)
}

const run_nodejs = () => {
  info(`start ${color_magenta("nodejs")}`)
  if (spawn_check_command("node", ["--version"])) {
    return null
  }
  return spawn_run("node", ["main.js"], WORKSPACE_NODEJS)
}



print(color_cyan(`
                        .    .
                          )  (
    _ _ _ _ _ _ _ _ _ _ _(.--.)
  {{ { { { { { { { { { { ( '_')
  >>>>>>>>>>>>>>>>>>>>>>>\`--'>

        :: 编程语言斗虫 ::

`))

let data_Go = run_Go()
let data_Java = run_Java()
let data_Python3 = run_Python3()
let data_nodejs = run_nodejs()
let data_C = run_C()
let data_C_O3 = run_C_O3()

print(color_cyan(`
<><><><><><><><><><><><><><><><><><>
`))

const os = require("os")

const hardware = `${os.cpus()[0].model} ${os.totalmem() / 1024 / 1024}`
const system = os.version()
print(color_magenta(hardware))
print(color_magenta(system))
print(`\n`)

let data_table = []

push_data_table(data_table, "Go", data_Go)
push_data_table(data_table, "Java", data_Java)
push_data_table(data_table, "Python3", data_Python3)
push_data_table(data_table, "nodejs", data_nodejs)
push_data_table(data_table, "C", data_C)
push_data_table(data_table, "C(O3)", data_C_O3)

console.table(data_table.sort((a, b) => a.countPrimes - b.countPrimes))
