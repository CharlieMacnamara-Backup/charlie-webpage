import { getRequestConfig } from 'next-intl/server'
import { messages } from '../src/data/locales'

export default getRequestConfig(async () => ({
  locale: 'en',
  messages,
}))
