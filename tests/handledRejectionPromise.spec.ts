import { HandledRejectionPromise } from "../src/handledRejectionPromise";

describe(HandledRejectionPromise.name, () => {
  it("handles resolved Promises", async () => {
    const handled = new HandledRejectionPromise(Promise.resolve(3), 0);

    await expect(handled.promise).resolves.toEqual({ value: 3, index: 0 });
  });

  it("handles rejected Promises", async () => {
    const handled = new HandledRejectionPromise(
      Promise.reject(new Error("oopsie")),
      0
    );

    await expect(handled.promise).rejects.toThrowErrorMatchingInlineSnapshot(
      `"oopsie"`
    );
  });

  it("handles Promises that resolve (later)", async () => {
    const handled = new HandledRejectionPromise(
      new Promise((resolve) => setTimeout(() => resolve(4), 1)),
      0
    );

    await expect(handled.promise).resolves.toEqual({ value: 4, index: 0 });
  });

  it("handles Promises that reject (later)", async () => {
    const handled = new HandledRejectionPromise(
      new Promise((_resolve, reject) =>
        setTimeout(() => reject(new Error("ok")), 1)
      ),
      0
    );

    await expect(handled.promise).rejects.toThrowErrorMatchingInlineSnapshot(
      `"ok"`
    );
  });
});
