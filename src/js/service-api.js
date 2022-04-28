import axios from 'axios';

export default class ServiceAPI {
    constructor() {
        this.options = {
            params: {
                key: '27045563-cc1ad34e3f315d945d9d0efee',
                q: '',
                image_type: 'photo',
                orientation: true,
                page: 1,
                per_page:39
        }
        }
    }
    async getImages() {
        const response = await axios.get('https://pixabay.com/api', this.options);
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