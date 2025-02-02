import registry from '$/registry'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

export const handlers = [
  http.get(registry.origin + '/Action.vue', () => {
    return HttpResponse.text('<component-content />')
  }),
]

export default function mockHttp() {
  const server = setupServer(...handlers)

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  return server
}
