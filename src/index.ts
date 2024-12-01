import {
  CaseAccessorAffix,
  CaseStackingAffix,
  Lexicon,
  StandardAffix,
} from "./types.ts";
import { readJsonFiles, readJsonRootFiles } from "./utils.ts";

export async function bundle(langDir: string): Promise<Lexicon> {
  return {
    roots: (await readJsonRootFiles(`./lexicon/${langDir}/roots`)).flat(),
    affixes: {
      standard:
        (await readJsonFiles<StandardAffix[]>(`./lexicon/${langDir}/affixes/standard`))
          .flat(),
      accessor: await readJsonFiles<CaseAccessorAffix>(
        `./lexicon/${langDir}/affixes/case_accessor`,
      ),
      stacking: await readJsonFiles<CaseStackingAffix>(
        `./lexicon/${langDir}/affixes/case_stacking`,
      ),
    },
    ...JSON.parse(Deno.readTextFileSync(`./lexicon/${langDir}/sections.json`)),
  };
}
