Resolutions = new Mongo.Collection('resolutions');

if (Meteor.isClient) {

    Meteor.subscribe("resolutions");
    
    Template.body.helpers({
        resolutions: function () {
            return Resolutions.find();
        },
    });

    Template.body.events({
        'submit #resolution': function (event) {
            var title = event.target.title.value;

            if (title.length > 0) {
                Meteor.call("addResolution", title);
            }

            event.target.title.value = "";

            return false;
        }
    });

    Template.resolution.events({

        'click .remove': function () {
            Meteor.call("deleteResolution", this._id);
        },
        'click .toggle-action': function () {
            Meteor.call("updateResolution", this._id, !this.checked);
        },

    });
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {

    });
    Meteor.publish("resolutions", function () {
        return Resolutions.find();
    });
}

Meteor.methods({

    addResolution: function (title) {
        Resolutions.insert({
            title: title,
            created: new Date(),
            owner: Meteor.userId(), // _id of logged in user
            username: Meteor.user().username // username of logged in user
        });
    },
    deleteResolution: function (id) {
        Resolutions.remove(id);
    },
    updateResolution: function (id, checked) {
        Resolutions.update(id, {
            $set: {
                checked: checked
            }
        });
    }

});
