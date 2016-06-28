jest.unmock('../google-analytics')

import googleAnalytics from '../google-analytics'

describe('googleAnalytics middleware', () => {
  let subject

  describe('componentDidMount', () => {
    beforeEach(() => {
      subject = googleAnalytics({ trackingID: 'test' })
    })
    it('returns an object', () => {
      expect(subject).toBeTruthy()
      expect(subject).toEqual(jasmine.any(Object))
    })
    it('injects a script tag into head', () => {
      expect(document.head.innerHTML).toBeFalsy()
      subject.componentDidMount()
      expect(document.head.innerHTML).toBeTruthy()
      expect(document.head.innerHTML).toContain('https://www.google-analytics.com/analytics.js')
    })
  })
})
