# Lexicon Json

This repository offers the lexicon of New Ithkuil in json format based on the
http://ithkuil.net/newithkuil_lexicon.pdf &
https://ithkuil.net/newithkuil_affix.pdf.

## Format

```ts
type Lexicon = {
  roots: Array<Root>;
  affixes: {
    standard: Array<StandardAffix>;
    accessor: Array<CaseAccessorAffix>;
    stacking: Array<CaseStackingAffix>;
  };
};
```

### Root

```ts
type Root = {
  root: string;
  refers?: string;
  stems?: [
    Specs | string,
    Specs | string,
    Specs | string,
  ];
  /** Notes in markdown format */
  notes?: string;
  /** See the root below if the stems are empty as they may have similar pattern */
  see?: string;
};

type Specs = {
  /** basic */
  "BSC": string;
  /** contential */
  "CTE": string;
  /** constitutive */
  "CSV": string;
  /** objective */
  "OBJ": string;
};
```

### Affix

#### Standard

```ts
type StandardAffix = {
  name: string;
  description: string;
  gradient_type: "0" | "A1" | "A2" | "B" | "C" | "D1" | "D2";
  cs: string;
  associated_root: boolean;
  degrees: [
    // Degree 0
    Degree | null,
    // Below are Degree 1~9
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
    Degree,
  ];
  notes?: string;
};

type Degree =
  // Suitable for most situations
  | string
  // Suitable for the situation where the Type-2 of current affix has another meaning
  | [string, string];
```

#### Non-Standard

```ts
type Case = {
  cs: string;
  /* All possible vowel forms */
  vx: Array<string>;
  description: string;
};

type CaseAccessorAffix = {
  name: string;
  description: string;
  gradient_type: string;
  types: [
    // Type-1
    Array<Case>,
    // Type-2
    Array<Case>,
    // Type-3
    Array<Case>,
  ];
};

type CaseStackingAffix = {
  name: string;
  description: string;
  gradient_type: string;
  cases: Array<Case>;
};
```

## Scripts

### `json`

```console
$ deno task json
```

Generate minified json files to `output/lexicon_{LANG}.json`, which includes all
the roots and affixes.

### `yaml`

```console
$ deno task yaml
```

Generate yaml filea to `output/lexicon_{LANG}.yaml`, which includes all the
roots and affixes.
