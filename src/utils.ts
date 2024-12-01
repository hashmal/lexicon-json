import { Root } from "./types.ts";

export async function readJsonFiles<T>(path: string): Promise<T[]> {
  const target: T[] = [];

  // Get filenames and sort
  const filenames: string[] = [];
  for await (const file of Deno.readDir(path)) {
    if (file.isFile) {
      filenames.push(file.name);
    }
  }
  filenames.sort();

  for (let i = 0; i < filenames.length; i++) {
    const json = Deno.readTextFileSync(`${path}/${filenames[i]}`);
    const data: T = JSON.parse(json);
    target.push(data);
  }

  return target;
}

export async function readJsonRootFiles(path: string): Promise<Root[][]> {
  const target: Root[][] = [];

  // Get filenames and sort
  const filenames: string[] = [];
  for await (const file of Deno.readDir(path)) {
    if (file.isFile) {
      filenames.push(file.name);
    }
  }
  filenames.sort();

  for (let i = 0; i < filenames.length; i++) {
    const section = filenames[i].replace(/\.json$/, '')
    const json = Deno.readTextFileSync(`${path}/${filenames[i]}`);
    const data: Root[] = JSON.parse(json);

    target.push(data.map(d => ({ ...d, section })));
  }

  return target;
}
