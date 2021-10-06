
import { readFileSync } from 'fs';
import path from 'path';

const fakeApiData = JSON.parse(readFileSync(path.join(__dirname, 'fakeApiData.json')).toString())

const createApi = {
  search: {
     getPhotos: function() {
      jest.fn();
      createApi.mockReturnValue(fakeApiData)
    }
  }
}

// const createApi = ;

export {createApi};