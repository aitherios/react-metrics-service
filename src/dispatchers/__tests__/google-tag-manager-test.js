jest.unmock('../google-tag-manager')

import googleTagManager from '../google-tag-manager'

describe('googleTagManager dispatcher', () => {
  let subject

  describe('componentWillMount', () => {
    beforeEach(() => {
      window.dataLayer = undefined
      subject = subject = googleTagManager({
        containerID: 'GTM-XXXX',
        dataLayer: { quoth: 'the', raven: 'nevermore' },
      })
    })

    it('defines dataLayer', () => {
      expect(window.dataLayer).toBeUndefined()
      subject.componentWillMount()
      expect(window.dataLayer).toEqual(jasmine.any(Object))
    })

    it('populates dataLayer', () => {
      expect(window.dataLayer).toBeUndefined()
      subject.componentWillMount()
      expect(window.dataLayer).toEqual({ quoth: 'the', raven: 'nevermore' })
    })
  })

  describe('componentDidMount', () => {
    beforeEach(() => {
      subject = googleTagManager({
        containerID: 'GTM-XXXX',
        dataLayer: { quoth: 'the', raven: 'nevermore' },
      })
    })

    it('returns an object', () => {
      expect(subject).toBeTruthy()
      expect(subject).toEqual(jasmine.any(Object))
    })

    it('injects a script tag into head', () => {
      expect(document.head.innerHTML).toBeFalsy()
      subject.componentDidMount()
      expect(document.head.innerHTML).toBeTruthy()
      expect(document.head.innerHTML).toContain('//www.googletagmanager.com/ns.html?id=')
    })
  })
})
