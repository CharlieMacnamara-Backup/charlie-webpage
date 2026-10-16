import { glossary } from '../data/glossary.js'
import { Definition } from './Definition'

function resolveKey(candidate) {
  if (!candidate) return undefined
  const needle = candidate.trim().toLowerCase()
  return Object.keys(glossary).find((key) => key.toLowerCase() === needle)
}

export function Term({ children, term, className }) {
  const candidate =
    term || (typeof children === 'string' ? children : undefined)
  const key = resolveKey(candidate)

  if (!key) return children

  return (
    <Definition term={key} as="dfn" className={className}>
      {children}
    </Definition>
  )
}
