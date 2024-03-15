import { useValue } from "signia-react";
import { env } from "../../env";

export default function AuthenticatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const status = useValue(env.auth.state).status;
  return status === "authorized" ? <>{children}</> : null;
}
