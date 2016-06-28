jest.unmock('../metrics-service-click')

import React from 'react'
import { shallow } from 'enzyme'

import metricsServiceClick from '../metrics-service-click'

describe('metricsServiceClick()(Component)', () => {
  let subject
  const client = { event: jest.fn() }
  const Header = ({ title }) => (<h1>{title}</h1>) // eslint-disable-line

  describe('with ("event", "arg1")(Component)', () => {
    const Enhanced = metricsServiceClick('event', 'arg1', 'arg2')(Header)

    beforeEach(() => {
      subject = shallow(
        <Enhanced title={'here'} />,
        { context: { metricsServiceClient: client } }
      )
    })

    it('calls client event on click', () => {
      subject.simulate('click')
      expect(client.event.mock.calls.length).toBe(1)
      expect(client.event.mock.calls[0][0]).toBe('arg1')
      expect(client.event.mock.calls[0][1]).toBe('arg2')
    })
  })
})
