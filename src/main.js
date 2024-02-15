//Import libraries
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from 'axios';

//Import more data and functions
import {galleryTemplate} from "./js/render-functions";
import { API_KEY, BASE_URL } from "./js/pixabay-api";
import { hiddenRemove, hiddenAdd } from "./js/classes";

//References DOM elements
const refs = {
   searchForm: document.querySelector('.search-form'),
   galleryList: document.querySelector('.gallery'),
   loader: document.querySelector('.loader'),
   btnLodeMore: document.querySelector('.load-btn'),
}

let lightbox;
let page = 1;
let per_page = 15;
let searchQuery = '';

// Submit form
refs.searchForm.addEventListener('submit', onFormSubmit);

async function onFormSubmit(e) {
    e.preventDefault();
    hiddenRemove(refs.loader);
    hiddenAdd(refs.btnLodeMore);
    refs.galleryList.innerHTML = '';
    page = 1;
    searchQuery = e.target.elements.query.value;
    
    try{
      const data = await fetchImages(searchQuery);
      createMarkup(data.hits);
    } catch (error){
      hiddenAdd(refs.btnLodeMore);
        iziToast.error({
              message: `${error}`,
              position: 'topRight',
              backgroundColor: 'red',
              messageColor: 'white',});
           
    } finally{
      refs.searchForm.reset();
      hiddenAdd(refs.loader);
    };
  };

//Click button "Lode more"
refs.btnLodeMore.addEventListener('click', onLoadMoreClick);

async function onLoadMoreClick(){
    page+=1;
    hiddenRemove(refs.loader);
  try{
    const data = await fetchImages(searchQuery);
    createMarkup(data.hits);
    window.scrollBy({
      top: 400,
      behavior: "smooth",
    });

    if (page * per_page > data.totalHits) {
      hiddenAdd(refs.btnLodeMore);
      throw new Error('We\'re sorry, but you\'ve reached the end of search results.');
    }
  }catch(error){
    iziToast.error({
      message: ` ${error}`,
      position: 'topRight',
      backgroundColor: 'red',
      messageColor: 'white',});
      hiddenAdd(refs.btnLodeMore);
    }finally{
      hiddenAdd(refs.loader);
    }
}
  

// Create markup gallary
  function createMarkup(arr){
      if (arr.length === 0){
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
          backgroundColor: 'red',
          messageColor: 'white',});
          
      } else {
        const markup =arr.map(galleryTemplate).join('');
        refs.galleryList.insertAdjacentHTML('beforeend', markup);
        lightbox = new SimpleLightbox('.gallery a', {
          captionDelay: 250,
          captionsData: 'alt',
        });
        lightbox.refresh();
        hiddenRemove(refs.btnLodeMore);
      }  
  }


// Fetch images
async function fetchImages(query){
  const responce = await axios(BASE_URL, {
      params: {
          key: API_KEY,
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          per_page,
          page,
      }
  });

return responce.data;
};

