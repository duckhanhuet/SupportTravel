// Parse website
var cheerio = require('cheerio');
var request = require('request')
var config  = require('../config/config')


let crawl=(link,num)=>{
    return new Promise((resolve,reject)=>{
        let dem2=0;
        for (let i=1;i<=num;i++){
            request(link+i.toString(),function (err, response, body) {
                if (err){
                    return reject(new Error('cannot load link ',link+i))
                }else {
                    $= cheerio.load(body);

                    let list= $('div.product-list .left')
                    //console.log(list)
                    list.each(function (i, e) {
                        let linkB= $(this).find('h3.name a');
                        let imageB=$(this).find('div.image a img')
                        let timeB= $(this).find('div.description p.time span')
                        let transportB = $(this).find('div.description p.time span')
                        let start_timeB = $(this).find('div.description p.start_time span')
                        let scheduleB= $(this).find('div.description p.schedule span')

                        let priceBB= $(this).prev();
                        let priceB= $(priceBB).find('p.price label')
                        let price = $(priceB).text();

                        let link= linkB[0].attribs.href;
                        let title= $(linkB).text();
                        let image= imageB[0].attribs.src;
                        let time = $(timeB).text();
                        let transport = $(transportB).text();
                        let start_time = $(start_timeB).text();
                        let schedule = $(scheduleB).text();
                        dem2=dem2+1;
                        let object={
                            link:link,
                            title: title,
                            image: image,
                            time: time,
                            transport: transport,
                            start_time: start_time,
                            schedule: schedule,
                            price: price,
                            sum: dem2
                        }
                        console.log(object)
                        resolve(object)
                    })
                }
            })
        }
    })
}



crawl(config.url4,10)
    .then(res=>console.log('success load url4'))
    .then(res =>crawl(config.url5,2))
    .then(res =>console.log('succsess load url5'))
    .then(res =>crawl(config.url6,2))
    .then(res =>console.log('succsess load url6'))
    .then(res =>crawl(config.url7,5))
    .then(res =>console.log('succsess load url7'))
    .catch(err=>console.log(err));