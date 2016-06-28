jest.unmock('../with-metrics-service-client')

import React from 'react'
import { shallow } from 'enzyme'

import { withMetricsServiceClient } from '../with-metrics-service-client'

describe('withMetricsServiceClient()(Component)', () => {
  let subject
  const client = {}
  const Header = ({ title }) => (<h1>{title}</h1>) // eslint-disable-line

  describe('when composing with default transformation function', () => {
    const Enhanced = withMetricsServiceClient()(Header)

    beforeEach(() => {
      subject = shallow(
        <Enhanced title={'here'} />,
        { context: { metricsServiceClient: client } }
      )
    })
    it('renders', () => {
      expect(subject).toBeTruthy()
    })
    it('renders a header', () => {
      expect(subject.find(Header).length).toBe(1)
    })
    it('defines a displayName', () => {
      expect(Enhanced.displayName).toBe('withMetricsServiceClient(Header)')
    })
    it('injects the property client', () => {
      expect(subject.find(Header).prop('metricsServiceClient')).toBe(client)
    })
  })

  describe('when composing with a custom transform function', () => {
    const Enhanced = withMetricsServiceClient({
      transform: (c) => ({ otherProp: c }),
    })(Header)

    beforeEach(() => {
      subject = shallow(
        <Enhanced title={'here'} />,
        { context: { metricsServiceClient: client } }
      )
    })

    it('injects largeness and tallness property', () => {
      expect(subject.find(Header).prop('otherProp')).toBe(client)
    })
  })
})
