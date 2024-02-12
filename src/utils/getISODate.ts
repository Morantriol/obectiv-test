export const getISODate = (ISODate: string) => {
  const date = new Date(ISODate);
  return date.toLocaleDateString("ru-RU");
};
