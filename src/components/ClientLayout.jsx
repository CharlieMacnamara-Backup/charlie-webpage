'use client'

import { Fragment } from 'react'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Layout } from '@/components/Layout'
import { HydrationWrapper } from '@/components/HydrationWrapper'

export function ClientLayout({ children }) {
  return (
    <HydrationWrapper>
      <ErrorBoundary>
        <Layout>
          <Fragment key="content">
            {children}
          </Fragment>
        </Layout>
      </ErrorBoundary>
    </HydrationWrapper>
  )
} 