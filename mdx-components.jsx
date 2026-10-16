import { StaticPlayer } from '@/components/StaticPlayer'
import { Definition } from '@/components/Definition'
import { Term } from '@/components/Term'

export function useMDXComponents(components) {
  return {
    ...components,
    StaticPlayer,
    Definition,
    Term,
  }
}
