import { useValue } from "signia-react";
import { env } from "../env";

export default function DashboardHeader() {
  const profile = useValue(env.authorizedUserProfile.profile);
  return profile ? <p>Welcome, {profile.name}</p> : null;
}
