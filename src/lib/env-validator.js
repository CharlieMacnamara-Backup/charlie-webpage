const REQUIRED_ENV_VARS = []

export function validateEnv() {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return
    }

    const missing = REQUIRED_ENV_VARS.filter(
      (key) => !process.env[key] || process.env[key]?.trim() === ''
    )

    if (missing.length > 0) {
      throw new Error(
        `Missing required production environment variables: ${missing.join(', ')}`
      )
    }
  }
}

validateEnv()
