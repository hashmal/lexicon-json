import { ensureDirSync } from "https://deno.land/std@0.144.0/fs/ensure_dir.ts";

type Lexion = {
    root: string,
    refers: string
}[]

let target: Lexion = []

for (const { name } of Deno.readDirSync("./lexicon")) {
    const text = Deno.readTextFileSync(`lexicon/${name}`);
    const json: Lexion = JSON.parse(text);
    target = target.concat(json)
}

ensureDirSync('output');
Deno.writeTextFileSync('output/minified.json', JSON.stringify(target))