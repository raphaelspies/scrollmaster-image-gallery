/**
 * @jest-environment jsdom
 */

 import React from 'react'
 import { render, screen } from '@testing-library/react'
 import Home from '../pages/index'

 describe('Home', () => {
   it('renders a heading', () => {
     render(<Home />)

     const heading = screen.getByRole('heading', {
       name: /welcome to scrollmaster!/i,
     })

     expect(heading).toBeInTheDocument()
   })

   it('renders ScrollBox', () => {
     render(<Home />)

     const scrollbox = screen.getByText(/this is the scroll box/i)
     expect(scrollbox).toBeInTheDocument()
   })
   //add tests for home here
 })