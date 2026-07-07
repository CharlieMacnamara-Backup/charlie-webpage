export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
      return new Response('', { status: 302, headers: { Location: '/index.html' } })
    }
    return env.ASSETS.fetch(request)
  },
}
