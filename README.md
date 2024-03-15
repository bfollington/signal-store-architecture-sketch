# React + TypeScript + Vite

`pnpm install` + `pnpm dev` to get started.

This is a sketch of a modular store architecture using signals (provided by `signia` and `signia-react`). It's written in React (for familiarity reasons) but it's more like solidjs in terms of how it actually renders.

This example gives a mock implementation of:
1. Login form
2. Authorization store
3. User profile store
4. Simulated HTTP requests in both
5. Derived state composing two stores
6. Changing text color in response to mouse movement (high churn update)
7. Local component state
8. A primitive effects system unrelated to `useEffect`

This video demonstrates the fine-grained reactivity showing all repaints (via React's dev tools):

https://github.com/bfollington/signal-store-architecture-sketch/assets/5009316/c8f358d1-2dbe-43e6-9548-5fb286c7bae6

