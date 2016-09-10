$(document).ready(function(){
  AllIdeas.retrieve();
  AllIdeas.renderStorage();
});

$('.save-button').on('click', function(){
  var title = $('.title').val();
  var body = $('.body').val();
  var idea = new Idea(title, body);
  AllIdeas.addStoreToArray(idea);
  AllIdeas.retrieve();
  AllIdeas.clearListContainer();
  AllIdeas.renderStorage();
});

$('.list-container').on('click', '.downvote', function(){
  var id = $(this).parent('.list-item').attr('id');
  // var title = $('.title').val();
  // var body = $('.body').val();
  // var idea = new Idea(title, body, id);
  AllIdeas.find(id).qualityDown();
  AllIdeas.clearListContainer();
  AllIdeas.renderStorage();
  // AllIdeas.addStoreToArray();
  // AllIdeas.clearListContainer();
  // AllIdeas.renderStorage();
});

$('.list-container').on('click', '.upvote', function(){
  var id = $(this).parents('.list-item').attr('id');
  // var title = $('.title').val();
  // var body = $('.body').val();
  // var idea = new Idea(title, body);
  AllIdeas.find(id).qualityUp();
  AllIdeas.clearListContainer();
  AllIdeas.renderStorage();
  // debugger;
  // AllIdeas.store();
  // $(this).parent().children('.quality').children().text(this.quality);
  // AllIdeas.addStoreToArray();
  // AllIdeas.clearListContainer();
  // AllIdeas.rendexrStorage();
});


function Idea(title, body, id, quality) {
  this.title = title;
  this.body = body;
  this.id = id || Date.now();
  this.quality = quality || 'swill';
}

Idea.prototype.qualityUp = function () {
  var quality = this.quality;
  var id = this.id;

  switch (quality) {
    case 'swill':
      this.quality = 'plausible';
      return AllIdeas.store();
    case 'plausible':
      this.quality = 'genius';
      return AllIdeas.store();
    default:
  }
};

Idea.prototype.qualityDown = function() {
  var quality = this.quality;
  switch (quality) {
    case 'genius':
      this.quality = 'plausible';
      return AllIdeas.store();
    case 'plausible':
      this.quality = 'swill';
      return AllIdeas.store();
    default:
  }
  AllIdeas.store();
};

var ideasArray = [];

var AllIdeas = {

  addStoreToArray: function(idea){
    ideasArray.push(idea);
    this.store();
    console.log(ideasArray);
  },

  store: function () {
    localStorage.setItem('ideasArray', JSON.stringify(ideasArray));
    console.log(localStorage.setItem('ideasArray', JSON.stringify(ideasArray)));
  },

  render: function(idea) {
    $('.list-container').prepend('<div class="list-item"' + 'id="' + idea.id + '"><li class="title-style"><input value=' + idea.title + '><img src="icons/delete.svg" height="20" width="20"></li><li class="body-style"><input value=' + idea.body + '></li><img class="downvote" src="icons/downvote.svg" height="20" width="20"><img class="upvote" src="icons/upvote.svg" height="20" width="20"><p class="quality">quality: ' + '<span class="quality-value">' + idea.quality + '</span>' + '</p></div>');
  },

  renderStorage: function() {
    for (var i = 0; i < ideasArray.length; i++) {
        var object = ideasArray[i];
        var idea = new Idea(object.title, object.body, object.id, object.quality);
        ideasArray[i] = idea;
      this.render(idea);
    }
  },

  retrieve: function(title, body){
    if (localStorage.ideasArray) {
      var retrievedArray = localStorage.getItem('ideasArray');
      ideasArray = JSON.parse(retrievedArray);
    }
  },

  clearListContainer: function() {
    $('.list-item').remove();
  },

  find: function(id) {
    id = parseInt(id);
    return ideasArray.find(function (idea) {
      return idea.id === id;
    });
  },

  remove: function() {}



};
