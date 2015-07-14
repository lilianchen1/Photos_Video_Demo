$.fn.alterPhotos = function() {
  return new $.PhotoVid(this);
}

$.PhotoVid = function(el) {
  this.$el = $(el);
  this.photos = $(".photos").children();
  this.alterPhotos();
}

$.PhotoVid.prototype.addModals = function() {
  for (var i = 0; i < this.photos.length; i++) {
    if (this.photos[i].className === "first" || this.photos[i].className === "third") {
      $(this.photos[i]).prepend("<div class='modal-" + this.photos[i].className + "'></div>");
    }
  }
}

$.PhotoVid.prototype.rotateOrder = function() {
  var orders = ["first", "second", "third", "fourth", "fifth"];
  for (var i = 0; i < this.photos.length; i++) {
    var currentName = this.photos[i].className;
    var currentIdx = orders.indexOf(currentName);
    if (currentIdx === 0) {
      var newIdx = this.photos.length - 1;
    }
    else {
      var newIdx = currentIdx - 1;
    }
    var newName = orders[newIdx];
    this.photos[i].className = newName;
    if ($(this.photos[i]).children().length === 2) {
      $(this.photos[i]).children()[1].className = newName;
    } else {
      $(this.photos[i]).children()[0].className = newName;
    }
    if (newName === "first" || newName === "third") {
      $(this.photos[i]).prepend("<div class='modal-" + newName + "'></div>");
    }
    if (currentName === "first" || currentName === "third") {
      $(this.photos[i]).children()[0].remove();
    }
  }
}

$.PhotoVid.prototype.alterPhotos = function() {
  var that = this;
  that.addModals();
  setInterval(function() {
    that.rotateOrder();
  }, 2000)
}
