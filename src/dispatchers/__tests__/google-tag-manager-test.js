jest.unmock('../google-tag-manager')

import googleTagManager from '../google-tag-manager'

describe('googleTagManager dispatcher', () => {
  let subject

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
