import { forwardRef, memo } from 'react'
import clsx from 'clsx'

const OuterContainer = memo(forwardRef(function OuterContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div 
      ref={ref} 
      className={clsx('sm:px-8', className)} 
      {...props}
    >
      <div 
        className="mx-auto w-full max-w-7xl lg:px-8"
        role="presentation"
      >
        {children}
      </div>
    </div>
  )
}))

const InnerContainer = memo(forwardRef(function InnerContainer(
  { className, children, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
      {...props}
    >
      <div 
        className="mx-auto max-w-2xl lg:max-w-5xl"
        role="presentation"
      >
        {children}
      </div>
    </div>
  )
}))

export const Container = memo(forwardRef(function Container(
  { children, as: Component = 'div', ...props },
  ref
) {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  )
}))

Container.Outer = OuterContainer
Container.Inner = InnerContainer
