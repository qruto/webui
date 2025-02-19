import registry from '$/registry'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { afterAll, afterEach, beforeAll } from 'vitest'

export const handlers = registry.components.map(component => {
  return http.get(
    registry.origin + `/${component.name.charAt(0).toUpperCase() + component.name.slice(1)}.vue`,
    () => {
      return HttpResponse.text('<component-content />')
    },
  )
})

export default function mockHttp() {
  const server = setupServer(...handlers)

  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  return server
}
