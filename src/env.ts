import { AuthorizationStore } from "./state/authStore";
import { AuthorizedUserProfileAggregate } from "./state/authorizedUserProfileAggregate";
import { UserProfileStore } from "./state/userProfileStore";

const profile = new UserProfileStore();
const auth = new AuthorizationStore();
const authorizedUserProfile = new AuthorizedUserProfileAggregate(profile, auth);

// this needs another level of indirection in a "testable" app but for the sake of this example we'll just export the stores directly
export const env = {
  profile,
  auth,
  authorizedUserProfile,
};
