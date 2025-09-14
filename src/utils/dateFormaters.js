export const formatDate = (string) => {
  const date = new Date(string)
  return date.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
