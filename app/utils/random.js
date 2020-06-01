export function randomString(n, r = '') {
  while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  return r;
};

export function randomVerifyCode() {
  return Math.round(Math.random() * 9000 + 1000)
}