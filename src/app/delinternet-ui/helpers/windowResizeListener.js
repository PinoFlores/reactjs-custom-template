export const windowResizeListener = () => {
  const a =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return a;
};
