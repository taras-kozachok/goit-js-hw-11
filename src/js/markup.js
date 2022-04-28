export default function markup(base) {
    return base.map(({ webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads }) => {
        return ` <div class="card-photo"> 
            <a  href = "${largeImageURL}" >
             <img src="${webformatURL}" alt="${tags}" loading="lazy" /> </a>
              <div class="info">
              <p class="info-item">
              <b>Likes: ${likes}</b>
              </p>
              <p class="info-item">
              <b>Views: ${views}</b>
              </p>
              <p class="info-item">
              <b>Comments: ${comments}</b>
              </p>
              <p class="info-item">
              <b>Downloads: ${downloads}</b>
              </p>
              </div>
              </div> `
    }).join('');
}