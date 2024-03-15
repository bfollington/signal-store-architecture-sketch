import { useValue } from "signia-react";
import { env } from "../env";
import ToggleSection from "./ToggleSection";

export default function DashboardHeader() {
  const profile = useValue(env.authorizedUserProfile.profile);

  return (
    <div>
      {profile && <p>Welcome, {profile.name}</p>}
      <ToggleSection>Collapsible detail with local state.</ToggleSection>
    </div>
  );
}
