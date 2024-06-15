export default function nxApp() {
  return new Promise((resolve) => {
    window.addEventListener('message', (e) => {
      if (e.data) resolve(e.data);
    });
  });
}
