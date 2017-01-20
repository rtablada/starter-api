const _ = require('underscore');

module.exports = function fillable(Model) {
  if (Model.prototype.unguarded === undefined) {
    Model.prototype.unguarded = false;
  }

  if (Model.prototype.fillable === undefined) {
    Model.prototype.fillable = [];
  }

  if (Model.prototype.guarded === undefined) {
    Model.prototype.guarded = [];
  }

  Model.prototype.isFillable = function (key) {
    return this.constructor.unguarded ||
      this.constructor.fillable.includes(key) ||
      (this.constructor.fillable.length === 0 && !this.constructor.guarded.includes(key));
  };

  Model.prototype.setJSON = function (values) {
    _.each(values, (value, key) => {
      if (this.isFillable(key)) {
        this.attributes[key] = this.mutateProperty(key, value);
      }
    });
  };
};
