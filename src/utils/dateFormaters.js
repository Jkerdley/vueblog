export const formatDate = (string, options) => {
  const date = new Date(string)
  return date.toLocaleString(
    'ru-RU',
    options || {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    },
  )
}
