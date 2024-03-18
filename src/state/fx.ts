import { Store } from "./store";

export function* sleep(time: number) {
  yield new Promise((resolve) => setTimeout(resolve, time));
}

export function* send<TState, TAction, TContext extends Store<TState, TAction>>(
  action: TAction
) {
  yield (store: TContext) => store.send(action);
}

export function run<TContext>(
  generator: Generator<Promise<any> | ((ctx: TContext) => void), void, any>,
  context: TContext
) {
  requestAnimationFrame(async () => {
    let result = generator.next();

    while (!result.done) {
      const value = result.value;

      if (typeof value === "function") {
        // Assuming the function is an action that requires the context
        value(context);
        result = generator.next();
      } else if (value instanceof Promise) {
        // Await the promise and pass the resolved value back into the generator
        const resolvedValue = await value;
        result = generator.next(resolvedValue);
      } else {
        // Proceed to the next value if it's neither a function requiring context nor a promise
        result = generator.next();
      }
    }
  });
}
