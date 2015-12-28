Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {
  Template.body.helpers({
    resolutions: function () {
      return Resolutions.find();
    }
  });
  Template.body.events({
    'submit #resolution': function (event) {
      var title = event.target.title.value;

      if (title.length > 0) {
        Resolutions.insert({
          title: title,
          created: new Date()
        });
      }

      event.target.title.value = "";

      return false;
    }
  });

  Template.resolution.events({

    'click .remove': function () {
      Resolutions.remove(this._id);
    },
    'click .toggle-action': function () {
      Resolutions.update(this._id, {
        $set: {
          checked: !this.checked
        }
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
