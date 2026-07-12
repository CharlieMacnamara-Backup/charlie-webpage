export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)

    try {
      console.log(
        JSON.stringify({
          message: 'incoming request',
          method: request.method,
          path: url.pathname,
        }),
      )

      if (url.hostname === 'www.charliemacnamara.uk') {
        url.hostname = 'charliemacnamara.uk'
        return Response.redirect(url.toString(), 301)
      }

      if (url.pathname === '/') {
        return new Response('', {
          status: 302,
          headers: { Location: '/index.html' },
        })
      }

      return env.ASSETS.fetch(request)
    } catch (error) {
      console.error(
        JSON.stringify({
          message: 'request failed',
          error: error instanceof Error ? error.message : String(error),
          path: url.pathname,
        }),
      )
      return new Response('Internal server error', { status: 500 })
    }
  },
}
