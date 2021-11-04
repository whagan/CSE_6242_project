const https = require('https');
const keys = require('../../../internal/keys');

class Graph {
    constructor()   {
        this.api_key = keys.google_books_key;
        this.url = "https://www.googleapis.com/";
        this.path = "books/v1/volumes?q="
        this.title = "Moby-Di"
    }
    getColors(quantity) {
        var get_url = this.url + this.path + this.api_key;
    }
}