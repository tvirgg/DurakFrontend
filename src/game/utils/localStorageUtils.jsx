// Объект для работы с localStorage
const localStorageUtils = {
  // Получить данные из localStorage
  get: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  // Добавить данные в localStorage
  add: (key, value) => {
    const existingData = localStorageUtils.get(key);

    if (existingData) {
      const updatedData = [...existingData, value];
      localStorage.setItem(key, JSON.stringify(updatedData));
    } else {
      localStorage.setItem(key, JSON.stringify([value]));
    }
  },

  // Удалить данные из localStorage по ключу
  remove: (key, id) => {
    const data = localStorageUtils.get(key);

    if (data) {
      const updatedData = data.filter((item) => item.id !== id);
      localStorage.setItem(key, JSON.stringify(updatedData));
    }
  },

  // Изменить данные в localStorage
  update: (key, id, newValue) => {
    const data = localStorageUtils.get(key);

    if (data) {
      const updatedData = data.map((item) =>
        item.id === id ? { ...item, ...newValue } : item
      );
      localStorage.setItem(key, JSON.stringify(updatedData));
    }
  },
};
export default localStorageUtils;
