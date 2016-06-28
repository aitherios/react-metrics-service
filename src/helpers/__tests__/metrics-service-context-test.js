jest.unmock('../metrics-service-context')

import React from 'react'
import { mount } from 'enzyme'

import { withMetricsServiceContext } from '../metrics-service-context'

describe('mithMetricsServiceContext()', () => {
  let subject
  let client
  let Header
  let Enhanced

  describe('hooks into some react live cycle methods', () => {
    beforeEach(() => {
      client = {
        callDispatchers: jest.fn(),
      }
      Header = ({ header }) => (<h1>{ header }</h1>) // eslint-disable-line
      Enhanced = withMetricsServiceContext({ client })(Header)
      subject = mount(<Enhanced />)
    })

    it('renders', () => { expect(subject).toBeTruthy() })

    it('calls client componentWillMount', () => {
      expect(client.callDispatchers.mock.calls.length).toBe(2)
      expect(client.callDispatchers.mock.calls[0][0]).toBe('componentWillMount')
    })

    it('calls client componentDidMount', () => {
      expect(client.callDispatchers.mock.calls.length).toBe(2)
      expect(client.callDispatchers.mock.calls[1][0]).toBe('componentDidMount')
    })

    it('calls client componentWillUnmount', () => {
      subject.unmount()
      expect(client.callDispatchers.mock.calls.length).toBe(3)
      expect(client.callDispatchers.mock.calls[2][0]).toBe('componentWillUnmount')
    })
  })

  describe('injects the client in the context', () => {
    beforeEach(() => {
      client = {
        callDispatchers: jest.fn(),
      }
      Header = ({ header }) => (<h1>{ header }</h1>) // eslint-disable-line
      Enhanced = withMetricsServiceContext({ client })(Header)
      subject = mount(<Enhanced />)
    })

    it('injects context', () => {
      expect(subject.context()).not.toBeUndefined()
    })
  })
})
