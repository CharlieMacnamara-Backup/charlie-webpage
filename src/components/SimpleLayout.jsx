import { memo } from 'react'
import { Container } from '@/components/Container'

const Header = memo(function Header({ title, intro }) {
  return (
    <header className="max-w-2xl">
      <h1 
        className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
        id="page-title"
      >
        {title}
      </h1>
      {intro && (
        <p 
          className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
          id="page-intro"
        >
          {intro}
        </p>
      )}
    </header>
  )
})

export const SimpleLayout = memo(function SimpleLayout({ 
  title, 
  intro, 
  children,
  className = ''
}) {
  return (
    <Container 
      className={`mt-16 sm:mt-32 ${className}`}
      role="main"
      aria-labelledby="page-title"
      {...(intro && { 'aria-describedby': 'page-intro' })}
    >
      <Header title={title} intro={intro} />
      <div className="mt-16 sm:mt-20">
        {children}
      </div>
    </Container>
  )
})
