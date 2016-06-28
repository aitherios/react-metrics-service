jest.unmock('../google-analytics-legacy')

import googleAnalyticsLegacy from '../google-analytics-legacy'

describe('googleAnalyticsLegacy dispatcher', () => {
  let subject

  describe('componentDidMount', () => {
    beforeEach(() => {
      subject = googleAnalyticsLegacy({ trackingID: 'test' })
    })
    it('returns an object', () => {
      expect(subject).toBeTruthy()
      expect(subject).toEqual(jasmine.any(Object))
    })
    it('injects a script tag into head', () => {
      expect(document.head.innerHTML).toBeFalsy()
      subject.componentDidMount()
      expect(document.head.innerHTML).toBeTruthy()
      expect(document.head.innerHTML).toContain('google-analytics.com/ga.js')
    })
  })
})
