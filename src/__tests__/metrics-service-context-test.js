jest.unmock('../metrics-service-context')

import React from 'react'
import { mount } from 'enzyme'

import metricsServiceContext from '../metrics-service-context'

describe('metricsServiceContext()', () => {
  let subject
  let client
  let Header
  let Enhanced

  describe('hooks into some react live cycle methods', () => {
    beforeEach(() => {
      client = {
        componentDidMount: jest.fn(),
        componentWillMount: jest.fn(),
        componentWillUnmount: jest.fn(),
      }
      Header = ({ header }) => (<h1>{ header }</h1>) // eslint-disable-line
      Enhanced = metricsServiceContext({ client })(Header)
      subject = mount(<Enhanced />)
    })

    it('renders', () => { expect(subject).toBeTruthy() })

    it('calls client componentDidMount', () => {
      expect(client.componentDidMount.mock.calls.length).toBe(1)
    })

    it('calls client componentWillMount', () => {
      expect(client.componentWillMount.mock.calls.length).toBe(1)
    })

    it('calls client componentWillUnmount', () => {
      subject.unmount()
      expect(client.componentWillUnmount.mock.calls.length).toBe(1)
    })
  })

  describe('injects the client in the context', () => {
    beforeEach(() => {
      client = {
        componentDidMount: jest.fn(),
        componentWillMount: jest.fn(),
        componentWillUnmount: jest.fn(),
      }
      Header = ({ header }) => (<h1>{ header }</h1>) // eslint-disable-line
      Enhanced = metricsServiceContext({ client })(Header)
      subject = mount(<Enhanced />)
    })

    it('injects context', () => {
      expect(subject.context()).not.toBeUndefined()
    })
  })
})
