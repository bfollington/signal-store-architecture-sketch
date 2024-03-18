import { atom } from "signia";
import * as Fx from "./fx";
import { Store } from "./store";

export type UserId = string;

type UserProfileStoreState = {
  users: Record<string, Loadable<User>>;
};

type Loadable<T> = {
  status: "loading" | "succeed" | "failed";
  value?: T;
  error?: Error;
};

type User = {
  id: UserId;
  name: string;
  email: string;
};

const initialState: UserProfileStoreState = {
  users: {},
};

export function requestLoadUserProfile(userId: UserId) {
  return { type: "requestLoadUserProfile" as const, payload: { userId } };
}

export function succeedLoadUserProfile(user: User) {
  return { type: "succeedLoadUserProfile" as const, payload: { user } };
}

export function failLoadUserProfile(userId: UserId, error: Error) {
  return { type: "failLoadUserProfile" as const, payload: { userId, error } };
}

type UserProfileStoreAction =
  | ReturnType<typeof requestLoadUserProfile>
  | ReturnType<typeof succeedLoadUserProfile>
  | ReturnType<typeof failLoadUserProfile>;

export class UserProfileStore
  implements Store<UserProfileStoreState, UserProfileStoreAction>
{
  state = atom("userStore", initialState);

  loadProfileFx = function* (userId: UserId) {
    yield* Fx.sleep(1000);
    yield* Fx.send(
      succeedLoadUserProfile({
        id: userId,
        name: "John Doe",
        email: "john@doe.com",
      })
    );
  };

  send(action: UserProfileStoreAction) {
    switch (action.type) {
      case "requestLoadUserProfile":
        this.state.update((state) => ({
          ...state,
          users: {
            ...state.users,
            [action.payload.userId]: {
              status: "loading",
            },
          },
        }));

        Fx.run(this.loadProfileFx(action.payload.userId), this);
        break;

      case "succeedLoadUserProfile":
        this.state.update((state) => ({
          ...state,
          users: {
            ...state.users,
            [action.payload.user.id]: {
              status: "succeed",
              value: action.payload.user,
            },
          },
        }));
        break;
      case "failLoadUserProfile":
        this.state.update((state) => ({
          ...state,
          users: {
            ...state.users,
            [action.payload.userId]: {
              status: "failed",
              error: action.payload.error,
            },
          },
        }));
        break;
    }
  }
}
