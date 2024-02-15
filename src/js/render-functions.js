export function galleryTemplate({webformatURL, largeImageURL, tags, likes, views, comments, downloads}){
    return `<li class="gallery-list">
    <a class="gallery-link" href="${largeImageURL}"><img class="img-gallery" src="${webformatURL}" alt="${tags}"></a>
    <div class="info-img">
      
      <div>
        <h3>Likes</h3>
        <p>${likes}</p>
      </div>

      <div>
        <h3>Views</h3>
        <p>${views}</p>
      </div>

      <div>
        <h3>Comments</h3>
        <p>${comments}</p>
      </div>

      <div>
        <h3>Downloads</h3>
        <p>${downloads}</p>
      </div>

    </div>
  </li>`};