// Generated by CoffeeScript 1.8.0
var BankOperation;

BankOperation = require('../models/bankoperation');

module.exports.loadBankOperation = function(req, res, next, bankOperationID) {
  return BankOperation.find(bankOperationID, (function(_this) {
    return function(err, operation) {
      if ((err != null) || (operation == null)) {
        return res.send(404, {
          error: "BankOperation not found"
        });
      } else {
        req.operation = operation;
        return next();
      }
    };
  })(this));
};

module.exports.index = function(req, res) {
  return BankOperation.all(function(err, operations) {
    if (err) {
      return res.send(500, {
        error: 'Server error occurred while retrieving data'
      });
    } else {
      return res.send(200, operations);
    }
  });
};

module.exports.show = function(req, res) {
  return res.send(200, req.operation);
};

module.exports.query = function(req, res) {
  var paramAccounts;
  paramAccounts = req.body.accounts || [-1];
  return BankOperation.allFromBankAccounts(paramAccounts, function(err, operations) {
    var async, paramAmountFrom, paramAmountTo, paramDateFrom, paramDateTo, paramSearchText, treatment;
    if (err != null) {
      return res.send(500, {
        error: 'Server error occurred while retrieving data'
      });
    } else {
      paramDateFrom = new Date(req.body.dateFrom);
      paramDateTo = new Date(req.body.dateTo);
      paramAmountFrom = Number(req.body.amountFrom);
      paramAmountTo = Number(req.body.amountTo);
      paramSearchText = req.body.searchText;
      async = require("async");
      treatment = function(operation, callback) {
        var amount, date, paramQueryText, title;
        amount = Number(operation.amount);
        date = new Date(operation.date);
        title = operation.title.toLocaleUpperCase();
        paramQueryText = paramSearchText.toLocaleUpperCase();
        if (date < paramDateFrom || date > paramDateTo) {
          return callback(null);
        } else if (amount < paramAmountFrom || amount > paramAmountTo) {
          return callback(null);
        } else if ((paramSearchText != null) && paramSearchText !== "" && title.search(paramQueryText) < 0) {
          return callback(null);
        } else {
          return callback(null, operation);
        }
      };
      return async.concat(operations, treatment, function(err, results) {
        var errorMsg;
        if (err != null) {
          errorMsg = 'Server error occurred while retrieving data';
          return res.send(500, {
            error: errorMsg
          });
        } else {
          return res.send(200, results);
        }
      });
    }
  });
};


/*
    dev only
 */

module.exports.create = function(req, res) {
  console.log(body);
  return BankOperation.create(body, function(err, operation) {
    if (err != null) {
      return res.send(500, {
        error: "Server error while creating bank operation"
      });
    } else {
      return res.send(201, operation);
    }
  });
};
