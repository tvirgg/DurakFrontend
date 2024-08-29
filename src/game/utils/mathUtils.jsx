const G = {
  // Получить данные из localStorage
  getWidth: (el) => {
    return el.getBoundingClientRect().width;
  },
  getHeight: (el) => {
    return el.getBoundingClientRect().height;
  },
};
export default G;
