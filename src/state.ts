import { Edit, EditType, getEdits } from "./editDistance";

export interface State {
  tokens: KeyedToken[];
  nextKey: number;
}

export interface KeyedToken {
  key: number;
  token: string;
}

export function makeState(s: string): State {
  const tokens = s.split("").map((c, i) => ({ key: i, token: c }));
  return { tokens, nextKey: s.length };
}

export function transformTo(state: State, s: string): State {
  const edits = getEdits(getText(state), s);
  return applyEdits(state, edits);
}

function getText(state: State): string {
  return state.tokens.map(t => t.token).join("");
}

function applyEdits(state: State, edits: Edit[]): State {
  // This runs in quadratic time, but since computing the edits takes
  // quadratic time anyways it's not important to optimize.
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
        const oldKeyedToken = tokens[position];
        tokens.splice(position, 1, { ...oldKeyedToken, token });
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
