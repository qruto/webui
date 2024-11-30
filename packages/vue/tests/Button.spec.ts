import { render, /* fireEvent, */ screen } from '@testing-library/vue'

import Button from '@/components/Button.vue'

describe('Button', () => {
  it('renders properly as `<button>`', () => {
    render(Button, {
      slots: {
        default: 'click me',
      },
    })

    const button = screen.getByText('click me').parentElement as HTMLButtonElement

    expect(button.tagName.toLowerCase()).toBe('button')
  })

  it('renders properly as `<a> with href', () => {
    render(Button, {
      props: {
        href: '/some-url',
      },
      slots: {
        default: 'click me',
      },
    })

    const button = screen.getByText('click me') as HTMLAnchorElement

    expect(button.tagName.toLowerCase()).toBe('a')
  })
})
