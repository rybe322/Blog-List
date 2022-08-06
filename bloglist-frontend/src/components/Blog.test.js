import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing',
    author: 'Test author',
    url: 'test.com',
    likes: 100
  }

  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Testing'
  )


})
test('Testing the details button', () => {
  const blog = {
    title: 'Testing the button',
    author: 'button tester',
    url: 'buttontesting.com',
    likes: 999
  }

  render(<Blog blog={blog} />)

  const button = screen.getByText('Show details')
  screen.debug(button)
  expect(button).toBeDefined()
})

test('Testing button click shows details', async () => {
  const blog = {
    title: 'Testing show details button',
    author: 'Button Tester',
    url: 'details.com',
    likes: 100
  }
  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('Show details')
  await user.click(button)
  //screen.debug()
  const div = container.querySelector('.blog')
  //screen.debug(div)
  expect(div).toHaveTextContent('Button Tester')
})

