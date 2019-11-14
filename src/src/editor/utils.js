export default function isModKey(event) {
  const inIOS =
    typeof window !== "undefined" &&
    /Mac|iPad|iPod|iPhone/.test(window.navigator.platform);
  return inIOS ? event.metaKey : event.ctrlKey;
}
