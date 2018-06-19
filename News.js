class News {
    constructor(id, title) {
        this._id = id;
        this._title = title;
        this._articles = [];
        this._counterArticle = 0;
    }

    get id(){
        return this._id;
    }
    get title(){
        return this._title
    }
    get articles(){
        return this._articles;
    }

    addArticle() {
        let title = `article # ${this._counterArticle} of ${this._title} `;
        let message = `bla bla bla in article # ${this._counterArticle}`;
        let article = {title, message};
        this._articles.push(article);
        this._counterArticle++;
        return article;
    }
}

module.exports = News;