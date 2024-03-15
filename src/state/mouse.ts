import { atom, computed } from "signia";

// an example of an external source of change from outside the scope of the view tree

export const mouseX = atom("mouseX", 0);
export const mouseY = atom("mouseY", 0);
export const mousePosition = computed("mousePosition", () => {
  return { x: mouseX.value, y: mouseY.value };
});

function onMouseMove(e: MouseEvent) {
  mouseX.set(e.clientX / window.innerWidth);
  mouseY.set(e.clientY / window.innerHeight);
}

export function register() {
  window.addEventListener("mousemove", onMouseMove);

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
  };
}
