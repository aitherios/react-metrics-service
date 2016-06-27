jest.unmock('../metrics-service')

import { createClient } from '../client'

describe('client', () => {
  let subject

  describe('createClient()', () => {
    beforeEach(() => { subject = createClient() })
    it('exists', () => { expect(subject).toBeTruthy() })
  })

  describe('addMiddleware', () => {
    beforeEach(() => { subject = createClient() })
    it('adds a middleware', () => {
      const aMiddleware = () => ({})
      subject.addMiddleware(aMiddleware)
      expect(subject.middlewares).toContain(aMiddleware)
    })
  })
})
