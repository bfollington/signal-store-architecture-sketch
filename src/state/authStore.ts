import { Atom, atom } from "signia";
import { UserId } from "./userProfileStore";
import { runFx } from "./fx";

type AuthenticationStoreState = {
  status: "unauthorized" | "pending" | "authorized";
  session?: Session;
};

const initialState: AuthenticationStoreState = {
  status: "unauthorized",
};

type Session = {
  userId: UserId;
  expiresAt: number;
};

export function requestAuthorization(credential: string) {
  return { type: "requestAuthorization" as const, payload: { credential } };
}

export function succeedAuthorization(session: Session) {
  return { type: "succeedAuthorization" as const, payload: { session } };
}

export function failAuthorization(error: Error) {
  return { type: "failAuthorization" as const, payload: { error } };
}

export function expireAuthorization() {
  return { type: "expireAuthorization" as const };
}

type AuthenticationStoreAction =
  | ReturnType<typeof requestAuthorization>
  | ReturnType<typeof succeedAuthorization>
  | ReturnType<typeof failAuthorization>
  | ReturnType<typeof expireAuthorization>;

interface Store<State, Action> {
  state: Atom<State, unknown>;
  send: (action: Action) => void;
}

export class AuthorizationStore
  implements Store<AuthenticationStoreState, AuthenticationStoreAction>
{
  state = atom("authorizationStore", initialState);

  attemptAuthFx(credential: string) {
    return async () => {
      // imagine it was HTTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.send(
        succeedAuthorization({
          userId: "123",
          expiresAt: Date.now() + 1000 * 60 * 60,
        })
      );
    };
  }

  send(action: AuthenticationStoreAction) {
    switch (action.type) {
      case "requestAuthorization":
        this.state.update((state) => ({
          ...state,
          status: "pending",
        }));

        runFx(this.attemptAuthFx(action.payload.credential));
        break;

      case "succeedAuthorization":
        this.state.update((state) => ({
          ...state,
          status: "authorized",
          session: action.payload.session,
        }));
        break;

      case "failAuthorization":
        this.state.update((state) => ({
          ...state,
          status: "unauthorized",
        }));
        break;

      case "expireAuthorization":
        this.state.update((state) => ({
          ...state,
          session: undefined,
          status: "unauthorized",
        }));
        break;
    }
  }
}
