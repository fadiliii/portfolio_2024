export default function InitSize() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const aspectRatio = sizes.width / sizes.height;
  return { sizes, aspectRatio };
}
