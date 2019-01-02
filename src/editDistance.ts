export enum EditType {
  INSERT = "INSERT",
  REPLACE = "REPLACE",
  DELETE = "DELETE",
}

export type Edit = InsertEdit | ReplaceEdit | DeleteEdit;

export interface InsertEdit {
  type: EditType.INSERT;
  position: number;
  token: string;
}

export interface ReplaceEdit {
  type: EditType.REPLACE;
  position: number;
  token: string;
}

export interface DeleteEdit {
  type: EditType.DELETE;
  position: number;
}

export function getEdits(s1: string, s2: string): Edit[] {
  const distances = computeEditDistanceTable(s1, s2);
  return readEditsFromTable(s1, s2, distances);
}

function computeEditDistanceTable(s1: string, s2: string): number[][] {
  const l1 = s1.length;
  const l2 = s2.length;
  const distances = make2dArray(l1 + 1, l2 + 1, 0);
  for (let i = 1; i <= l1; i++) {
    distances[i][0] = i;
  }
  for (let j = 1; j <= l2; j++) {
    distances[0][j] = j;
  }
  for (let i = 1; i <= l1; i++) {
    for (let j = 1; j <= l2; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        distances[i][j] = distances[i - 1][j - 1];
      } else {
        distances[i][j] =
          1 +
          Math.min(
            distances[i - 1][j - 1],
            distances[i - 1][j],
            distances[i][j - 1],
          );
      }
    }
  }
  return distances;
}

function readEditsFromTable(
  s1: string,
  s2: string,
  distances: number[][],
): Edit[] {
  const edits: Edit[] = [];
  let i = s1.length;
  let j = s2.length;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && s1[i - 1] === s2[j - 1]) {
      i--;
      j--;
    } else if (
      i > 0 &&
      j > 0 &&
      distances[i][j] === distances[i - 1][j - 1] + 1
    ) {
      edits.push({ type: EditType.REPLACE, position: i - 1, token: s2[j - 1] });
      i--;
      j--;
    } else if (i > 0 && distances[i][j] === distances[i - 1][j] + 1) {
      edits.push({ type: EditType.DELETE, position: i - 1 });
      i--;
    } else if (j > 0 && distances[i][j] === distances[i][j - 1] + 1) {
      edits.push({ type: EditType.INSERT, position: i, token: s2[j - 1] });
      j--;
    } else {
      throw new Error("Invalid distances table");
    }
  }
  return edits;
}

function make2dArray<T>(width: number, height: number, value: T): T[][] {
  const result: T[][] = Array(width);
  for (let i = 0; i < width; i++) {
    result[i] = Array(height);
    for (let j = 0; j < height; j++) {
      result[i][j] = value;
    }
  }
  return result;
}
