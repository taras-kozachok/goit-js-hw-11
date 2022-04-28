import ServiceAPI from "./service-api";
import markup from "./markup";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSearch = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const searchBtn = document.querySelector('[type=submit]');

const option = {
    simpleLightBox: {
        captions: true,
        captionData: 'alt',
        captionDelay: 250,
    },
    IntersectionObserver: {
        root: null,
        threshold: 1,
    }
};

const loadService = new ServiceAPI();
formSearch.addEventListener('submit', onFormSubmit);
const callback = function (entries, observer) {
    if (entries[0].isIntersecting) { observer.unobserve(entries[0].target);
        loadImages();
    }
}
const observer = new IntersectionObserver(callback, options.intersectionObserver);
let galleryLightBox = new SimpleLightbox('.gallery a', options.simpleLightBox);

function onFormSubmit(e) {
    e.preventDefault()
    const isFilled = e.currentTarget.elements.searchQuery.value;
    if (isFilled) {
        searchBtn.disabled = true;
        loadService.searchQuery = isFilled;
        loadService.resPage();
        gallery.innerHTML = '';
        loadImages();
    }
}

function loadImages() {
    loadService
        .getImages()
        .then(dataProcessing)
        .catch(error => {
            console.log(error);
            Notify.failure('Error, try again');
        });
}

function dataProcessing(base) {
    searchBtn.disabled = false;
    if (base.data.totalHits === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
    }
    if (base.data.totalHits !== 0 && base.data.hits.length === 0) {
        Notify.warning("We're sorry, but you've reached the end of search results.");
        return
    }


    gallery.insertAdjacentHTML('beforeend', markup(base.data.hits));
    galleryLightBox.refresh();
    if (loadService.pageNumber === 2) {
        Notify.info(`Hooray! We found ${base.data.totalHits} images.`);
    }
    else {
        const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
        window.scrollBy({ top: cardHeight * 2 + 120, behavior: 'smooth' })
    }
    observer.observe(gallery.lastElementChild)
}