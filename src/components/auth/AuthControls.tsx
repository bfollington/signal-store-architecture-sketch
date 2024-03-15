import { useValue } from "signia-react";
import { env } from "../../env";
import {
  requestAuthorization,
  expireAuthorization,
} from "../../state/authStore";

export default function AuthControls() {
  const status = useValue(env.auth.state).status;

  return (
    <div>
      <button
        onClick={() => {
          env.auth.send(requestAuthorization("some-credential"));
        }}
        disabled={status === "pending"}
      >
        Auth
      </button>

      <button
        onClick={() => {
          env.auth.send(expireAuthorization());
        }}
        disabled={status === "pending"}
      >
        Expire
      </button>
    </div>
  );
}
