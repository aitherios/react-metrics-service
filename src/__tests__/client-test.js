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

  describe('removeMiddleware', () => {
    const aMiddleware = () => ({})

    beforeEach(() => {
      subject = createClient({ middlewares: [aMiddleware, { other: true }] })
    })

    it('removes its middleware', () => {
      subject.removeMiddleware(aMiddleware)
      expect(subject.middlewares).not.toContain(aMiddleware)
    })
  })
})
