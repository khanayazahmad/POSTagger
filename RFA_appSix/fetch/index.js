var fetch = require("node-fetch");
const API_URL = "http://api.intellexer.com/analyzeText";
const API_KEY = "effdda1c-c745-48e8-b76e-8bf312700a0a";

const {URL,URLSearchParams} = require('url');

module.exports.posTagger = function (request, response) {
    if(!(request.body && request.body.text))
        return response.status(400).send("INVALID_REQUEST");

    var url = new URL(API_URL);
    url.search = new URLSearchParams(
        {
            apikey: API_KEY,
            loadSentences: 'True',
            loadTokens: 'True',
            loadRelations: 'True'
        },)
    var options = {
        method: 'POST',
        headers:{ 
            'cache-control': 'no-cache' 
        },
        body: request.body.text
    };

    fetch(url,options)
    .then(res => res.json()) 
    .then(json => {

        var posTag = [];
        json.sentences.forEach(element => {
            element.tokens.forEach(token => {
                posTag.push({
                    token: token.text.content,
                    pos: token.partOfSpeechTag,
                    lemma: token.lemma 
                })
            })
        });
        return response.render('home',{
            data: posTag
        });
    });





}