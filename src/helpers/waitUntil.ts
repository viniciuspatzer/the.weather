const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export const waitUntil = async function waitUntil(f: () => boolean) {

  let counter = 0;

  while (!f() || counter < 2) {
    if (!f()) {
      await sleep(100);
      counter = 0;
    } else {
      await sleep(100);
      counter++;
    }
  }

  return f();
};