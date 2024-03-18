import { computed, react } from "signia";
import { AuthorizationStore } from "./authStore";
import * as Fx from "./fx";
import {
  UserId,
  UserProfileStore,
  requestLoadUserProfile,
} from "./userProfileStore";

// This is designed to demonstrate how to compose multiple stores together for higher order behaviour
// We listen for auth, request the authed users profile and then expose the profile as a computed value
// All without the underlying stores knowing about this behaviour
export class AuthorizedUserProfileAggregate {
  constructor(
    private profileStore: UserProfileStore,
    private authorizationStore: AuthorizationStore
  ) {}

  loadAuthenticatedUserProfileFx = function* (userId: UserId) {
    yield* Fx.send(requestLoadUserProfile(userId));
  };

  // on auth, fetch our profile
  loadProfileOnAuth = react("loadProfileOnAuth", async () => {
    const userId = this.authorizationStore.state.value.session?.userId;
    if (!userId) {
      return;
    }

    Fx.run(this.loadAuthenticatedUserProfileFx(userId), this.profileStore);
  });

  profile = computed("authorizedUserProfile", () => {
    const userId = this.authorizationStore.state.value.session?.userId;
    if (!userId) {
      return null;
    }

    const user = this.profileStore.state.value.users[userId];
    if (!user || user.value === undefined) {
      return null;
    }

    return user.value;
  });

  status = computed("authorizedUserProfileStatus", () => {
    if (this.authorizationStore.state.value.status === "pending") {
      return "pending_auth";
    }
    const userId = this.authorizationStore.state.value.session?.userId;
    if (!userId) {
      return "unauthorized";
    }

    if (this.profileStore.state.value.users[userId]?.status === "loading") {
      return "pending_profile";
    }

    return "authorized";
  });
}
