import { format, parseISO } from 'date-fns'

export function formatDate(dateString) {
  const date = parseISO(dateString.replace(/–/g, '-'))

  if (isNaN(date.getTime())) {
    return dateString
  }

  return format(date, 'MMMM d, yyyy')
}
