import React from "react";
import { atom, useAtom } from "jotai";

const pathAtom = atom("/");

export function usePath() {
  return useAtom(pathAtom);
}

export const Route: React.FC<{ path: string }> = ({ path, children }) => {
  const [curr] = useAtom(pathAtom);

  if (curr === path) return children;
  return null;
};

export const Link: React.FC<{ to: string }> = ({ to, children }) => {
  const [, set] = useAtom(pathAtom);

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        set(to);
      }}
    >
      {children}
    </a>
  );
};
