import { useValue } from "signia-react";
import { env } from "../../env";
import {
  requestAuthorization,
  expireAuthorization,
} from "../../state/authStore";
import { mouseX } from "../../state/mouse";

export default function AuthControls() {
  const status = useValue(env.auth.state).status;
  const hue = useValue(mouseX);

  return (
    <div>
      <button
        style={{ color: `hsl(${hue * 360}, 100%, 50%)` }}
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
