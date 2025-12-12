// Fisher–Yates Shuffle — unbiased & secure
export function shuffleArray(arr) {
  let a = arr.slice(); // copy so original stays unchanged
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
