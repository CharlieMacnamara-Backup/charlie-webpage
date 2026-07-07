import { memo } from 'react'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'

const Background = memo(function Background() {
  return (
    <div className="fixed inset-0 flex justify-center sm:px-8">
      <div className="flex w-full max-w-7xl lg:px-8">
        <div className="w-full bg-zinc-50/90 ring-1 ring-zinc-100/50 dark:bg-zinc-900 dark:ring-zinc-300/20" />
      </div>
    </div>
  )
})

const Content = memo(function Content({ children }) {
  const childrenArray = Array.isArray(children) ? children : [children]
  
  return (
    <div className="relative flex flex-col w-full min-h-screen">
      <Header />
      <main id="main-content" className="flex-1 w-full pb-16">
        {childrenArray.map((child, index) => (
          <div key={`content-${index}`}>
            {child}
          </div>
        ))}
      </main>
      <Footer />
    </div>
  )
})

export const Layout = memo(function Layout({ children }) {
  return (
    <>
      <Background />
      <Content>{children}</Content>
    </>
  )
})
