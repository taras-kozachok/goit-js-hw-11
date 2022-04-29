import axios from 'axios';

export default class ServiceAPI {
    constructor() {
        this.options = {
            params: {
                key: '27075017-94980455f851d9352f8ebdcd7',
                q: '',
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: 1,
                per_page:39
        }
        }
    }
    async getImages() {
        const response = await axios.get('https://pixabay.com/api/', this.options);
        this.incPage();
        return response;
    }
    incPage() {
        this.options.params.page += 1;
    }
    resPage() {
        this.pageNumber = 1;
    }
    get pageNumber() {
        return this.options.params.page;
    }
    set pageNumber(numberNew) {
        this.options.params.page = numberNew;
    }
    get searchQuery() {
        return this.options.params.q;
    }
    set searchQuery(QueryNew) {
        this.options.params.q = QueryNew;
    }

}