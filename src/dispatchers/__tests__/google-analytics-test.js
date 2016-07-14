jest.unmock('../google-analytics')

import googleAnalytics from '../google-analytics'

describe('googleAnalytics dispatcher', () => {
  let subject

  describe('componentWillMount', () => {
    beforeEach(() => {
      window.ga = undefined
      subject = googleAnalytics({ trackingID: 'test' })
    })

    it('defines window.ga', () => {
      expect(window.ga).toBeUndefined()
      subject.componentWillMount()
      expect(window.ga).toEqual(jasmine.any(Function))
    })

    it('defines window.ga.q', () => {
      expect(window.ga).toBeUndefined()
      subject.componentWillMount()
      expect(window.ga.q).toEqual(jasmine.any(Array))
    })

    it('populates window.ga.q', () => {
      subject.componentWillMount()
      expect(window.ga.q[0][0]).toEqual('create')
      expect(window.ga.q[0][1]).toEqual('test')
      expect(window.ga.q[0][2]).toEqual('auto')
    })
  })

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
