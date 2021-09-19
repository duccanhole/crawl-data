const cheerio = require('cheerio');
const req = require('request-promise');
const fs = require('fs');

let url = 'https://vnexpress.net/';
req(url,(err,res,html)=>{
    console.log(res.statusCode);
    let $ = cheerio.load(html);
    let arr = [];
    $('.item-news').each((i,el)=>{
        let title = $(el).find('.title-news > a').text();
        let link = $(el).find('.title-news > a').attr('href');
        let intro = $(el).find('.description > a').text();
        arr.push({title, link, intro});
    })
    fs.writeFileSync('data.json',JSON.stringify(arr),(err)=>{
        if(err) console.log(err);
        console.log('Write data to file data.json !');
    })
})