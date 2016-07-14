jest.unmock('../google-analytics-legacy')

import googleAnalyticsLegacy from '../google-analytics-legacy'

describe('googleAnalyticsLegacy dispatcher', () => {
  let subject

  describe('componentWillMount', () => {
    beforeEach(() => {
      window._gaq = undefined
      subject = googleAnalyticsLegacy({ trackingID: 'test' })
    })

    it('defines window._gaq', () => {
      expect(window._gaq).toBeUndefined()
      subject.componentWillMount()
      expect(window._gaq).toEqual(jasmine.any(Array))
    })

    it('populates window._gaq', () => {
      subject.componentWillMount()
      expect(window._gaq).toEqual([['_setAccount', 'test']])
    })
  })

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
