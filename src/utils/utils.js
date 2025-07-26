export const pages = [
  { key: 10, label: 10 },
  { key: 25, label: 25 },
  { key: 50, label: 50 },
  { key: 100, label: 100 },
];

export const isMobile = () => {
  const screenWidth = window.screen.width;
  if (screenWidth < 600) {
    return true;
  } else {
    return false;
  }
};
