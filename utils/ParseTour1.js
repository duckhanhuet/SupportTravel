//parse website http://tourdulich.org.vn

var cheerio = require('cheerio');
var request = require('request')
var config  = require('../config/config')
var async   = require('async');
var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();
let sum=0;
let page=5;

for (let i=1;i<=page;i++){
    request(config.url2+i.toString(), function(err, response, body) {
        if (err && response.statusCode != 200){
            console.log(err)
        }else {
            $ = cheerio.load(body);

            let ds= $('div.right_all div.details_tour_taxo');
            //console.log(ds)
            ds.each(function (i, e) {
                //console.log('-------------------------------------')
                let imageB = $(this).find('.img_thumbks_taxo a img');
                let linkB  = $(this).find('.img_thumbks_taxo a');
                let titleB = $(this).find('.title_tour a');
                let timeB  = $(this).find('.km_address');
                let priceB = $(this).find('.price_tour');
                let pr1= new Promise((resolve,reject)=>{
                    try {
                        let image=imageB[0].attribs['src'];
                        let link = linkB[0].attribs.href;
                        let title= $(titleB).text();
                        let time = trimSpace($(timeB).text());
                        let price= trimSpace($(priceB).text())
                        let object= {
                            image: image,
                            link: link,
                            title: title,
                            time: time,
                            price: price
                        }
                        resolve(object)
                    } catch (err){
                        reject(new Error(err))
                    }
                })
                pr1.then(res=> {
                    request(res.link,function (err, response, body) {
                        if (err){
                            console.log(err)
                        }else {
                            $= cheerio.load(body);
                            let vehicleB = $(body).find('p.phuongtien_tour');
                            let startB   = $(body).find('div.diemkhoihanh_tour span');
                            let scheduleB= $(body).find('p.diemthamquan_tour');

                            let vehicle=$(vehicleB).text();
                            let start  =$(startB).text();
                            let schedule=$(scheduleB).text()
                            sum=sum+1;
                            res.vehicle= vehicle;
                            res.start=start;
                            res.schedule=entities.decode(schedule).toLowerCase().trim();
                            res.sum=sum;
                            console.log(res)
                        }
                    })
                }).catch(err=>console.log(err+''))
            })
        }
    })
}

function trimSpace(str) {
    str= str.toString();
    str = str.replace(/\r?\n|\r/g, " ");
    return str;
}