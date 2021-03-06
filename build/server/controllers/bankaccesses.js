// Generated by CoffeeScript 1.7.1
var BankAccess, BankAccount;

BankAccess = require('../models/bankaccess');

BankAccount = require('../models/bankaccount');

module.exports.loadBankAccess = function(req, res, next, bankAccessID) {
  return BankAccess.find(bankAccessID, (function(_this) {
    return function(err, access) {
      if ((err != null) || (access == null)) {
        return res.send(404, {
          error: "BankAccess not found"
        });
      } else {
        delete access.password;
        _this.access = access;
        return next();
      }
    };
  })(this));
};

module.exports.index = function(req, res) {
  return BankAccess.all(function(err, accesses) {
    if (err != null) {
      return res.send(500, {
        error: 'Server error occurred while retrieving data'
      });
    } else {
      return res.send(200, accesses);
    }
  });
};

module.exports.create = function(req, res) {
  return BankAccess.addNewAccess(req.body, function(err, access) {
    var msg;
    if (err != null) {
      if (err.alreadyExist != null) {
        return res.send(409, {
          error: "This bank access already exists"
        });
      } else {
        msg = "Server error while creating bank access. -- " + err;
        return res.send(500, {
          error: msg
        });
      }
    } else {
      return res.send(201, access);
    }
  });
};

module.exports.destroy = function(req, res) {
  return this.access.destroy(function(err) {
    if (err != null) {
      return res.send(500, {
        error: "Server error while deleting the bank access"
      });
    } else {
      return res.send(204, {
        success: true
      });
    }
  });
};

module.exports.update = function(req, res) {
  return this.access.updateAttributes(body, function(err, access) {
    if (err != null) {
      return res.send(500, {
        error: "Server error while saving bank access"
      });
    } else {
      return res.send(200, access);
    }
  });
};

module.exports.show = function(req, res) {
  return res.send(200, this.access);
};

module.exports.getAccounts = function(req, res) {
  return BankAccount.allFromBankAccess(this.access, function(err, accounts) {
    if (err) {
      return res.send(500, {
        error: 'Server error occurred while retrieving data'
      });
    } else {
      return res.send(200, accounts);
    }
  });
};
