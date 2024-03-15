import { useValue } from "signia-react";
import { env } from "./env";

// Our consuming component is oblivious to how this data is sourced/derived
// It consumes a projected domain suited to thinking from the perspective of this component
export default function AuthStatus() {
  const status = useValue(env.authorizedUserProfile.status);
  const profile = useValue(env.authorizedUserProfile.profile);

  if (status === "unauthorized") {
    return <p>Not authorized</p>;
  }

  if (status === "pending_auth") {
    return <p>Authenticating...</p>;
  }

  if (status === "pending_profile") {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <p>
        <strong>Name:</strong> {profile.name}
      </p>
      <p>
        <strong>Email:</strong> {profile.email}
      </p>
    </div>
  );
}
