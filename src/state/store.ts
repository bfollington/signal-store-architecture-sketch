import { Atom } from "signia";

// naive but demonstrative
export interface Store<State, Action> {
  state: Atom<State, unknown>;
  send: (action: Action) => void;
}
