import { StaticPlayer } from '@/components/StaticPlayer'
import { Definition } from '@/components/Definition'

export function useMDXComponents(components) {
  return {
    ...components,
    StaticPlayer,
    Definition,
  }
}
