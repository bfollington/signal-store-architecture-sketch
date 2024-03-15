import { useAtom, useValue } from "signia-react";

export default function ToggleSection({
  children,
}: {
  children: React.ReactNode;
}) {
  // trivial example of local state, could easily put an object + reducer here for more complex state
  const open = useAtom("isOpen", false);
  const isOpen = useValue(open);

  return (
    <div
      onClick={() => {
        open.update((prev) => !prev);
      }}
    >
      {isOpen ? (
        <div>
          <p>▼ Content</p>
          {children}
        </div>
      ) : (
        <p>▶ ...</p>
      )}
    </div>
  );
}
