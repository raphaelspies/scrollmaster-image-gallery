/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
//  import {rest} from 'msw'
import createApi from 'unsplash-js'

jest.mock('unsplash-js')

// const unsplash = createApi({accessKey: process.env.API_KEY});

const unsplash = createApi();


describe('Home', () => {

  beforeEach(() => {
    render(<Home />)
  })

   it('renders a heading', () => {
        // render(<Home />)
     const heading = screen.getByRole('heading', {
       name: /welcome to scrollmaster!/i,
     })
     expect(heading).toBeInTheDocument()
   })

   it('renders ScrollBox', () => {
    // render(<Home />)
     const scrollbox = screen.getByText(/this is the scroll box/i)
     expect(scrollbox).toBeInTheDocument()
   })

})


describe('API', () => {
  it('makes a fake call to api', async () => {

    // unsplash.search.getPhotos.mockResolvedValue(fakeApiData);

    const query = {query: 'cat'};
    const response = await unsplash.search.getPhotos(query);
    console.log(response)
    // expect(response).not.toBeEmpty
  })
 })