'use strict';

module.exports = function(Income) {
  Income.getIncomesPerPeriod = function(period, status, cb) {
    let filter = {
      where: {
        id_fk_period_id: period,
        status: status,
      },
    };

    Income.find(filter, function(err, trafficResults) {
      if (err) return cb(err); // error out and return err msg to client

      let graphData = {
        total: 0,
      };

      var test = 0;
      trafficResults.forEach(function(obj) {
        test += parseFloat(obj.amount);
      });

      cb(null, test);
    });
  };

  Income.remoteMethod('getIncomesPerPeriod', {
    http: {path: '/getIncomesPerPeriod', verb: 'get'},
    accepts: [
      {arg: 'period', type: 'string'},
      {arg: 'status', type: 'string'},
    ],
    returns: {type: 'object', root: true},
  });

};
