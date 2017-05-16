// Parse website
var cheerio = require('cheerio');
var request = require('request')
var config  = require('../config/config')
let sum=0;
for (let i=1;i<=10;i++){
    request(config.url4+i.toString(),function (err, response, body) {
        if (err){
            throw err
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
                sum=sum+1;
                let object={
                    link:link,
                    title: title,
                    image: image,
                    time: time,
                    transport: transport,
                    start_time: start_time,
                    schedule: schedule,
                    price: price,
                    sum: sum
                }
                console.log(object)
            })

        }

    })
}
