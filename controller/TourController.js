var Tour = require('../model/Tour');

module.exports =  {
    find: function (params, callback) {
        Tour.find(params,function (err, Tours) {
            if (err){
                callback(err,null);
                return;
            }
            callback(null,Tours);
        })
    },

    findById: function (id, callback) {
        Tour.findById(id,function (err, Tour) {
            if (err){
                callback(err,null);
                return;
            }
            callback(null,Tour);
        })
    },

    create: function (params, callback) {
        Tour.create(params,function (err, Tour) {
            if (err){
                callback(err,null);
                return;
            }
            callback(null,Tour);
        })
    },
    update: function (id, params, callback) {
        Tour.findByIdAndUpdate(id,params,{new: true},function (err, Tour) {
            if (err){
                callback(err,null);
                return;
            }
            callback(null,Tour);
        })
    },
    delete: function (id, callback) {
        Tour.findByIdAndRemove(id,function (err) {
            if (err){
                callback(err,null);
                return;
            }
            callback(null,null);
        })
    }
}