import { Edit, EditType, getEdits } from "./editDistance";

export interface TokenState {
  tokens: KeyedToken[];
  nextKey: number;
}

export interface KeyedToken {
  key: number;
  token: string;
}

export function makeTokenState(s: string): TokenState {
  const tokens = s.split("").map((c, i) => ({ key: i, token: c }));
  return { tokens, nextKey: s.length };
}

export function transformTo(state: TokenState, s: string): TokenState {
  const edits = getEdits(getText(state), s);
  return applyEdits(state, edits);
}

export function getText(state: TokenState): string {
  return state.tokens.map(t => t.token).join("");
}

function applyEdits(state: TokenState, edits: Edit[]): TokenState {
  // This runs in quadratic time, but since computing the edits takes
  // quadratic time anyways it's not important to optimize.
  if (edits.length === 0) {
    return state;
  }
  const tokens = state.tokens.slice();
  let { nextKey } = state;
  edits.forEach(edit => {
    switch (edit.type) {
      case EditType.INSERT: {
        const { position, token } = edit;
        tokens.splice(position, 0, { token, key: nextKey++ });
        break;
      }
      case EditType.REPLACE: {
        const { position, token } = edit;
        tokens.splice(position, 1, { token, key: nextKey++ });
        break;
      }
      case EditType.DELETE: {
        const { position } = edit;
        tokens.splice(position, 1);
        break;
      }
      default:
        ((_: never) => 0)(edit);
    }
  });
  return { tokens, nextKey };
}
