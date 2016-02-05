Hivename = new Mongo.Collection('hiveName');

if (Meteor.isClient)
{
	Meteor.subscribe("hiveName");
	
	Template.collectionForm.events({});
	
	Template.collectionForm.events
	({
		'submit form': function(event)
		{
			event.preventDefault();
			var hive = $(event.target).find('textarea[name=hiveName]');
			var hiveText = hive.val();
			var observation = $(event.target).find('input[name=observationDate]');
			var observationValue = observation.val();
			var durationTime = $(event.target).find('input[name=duration]');
			var duration = durationTime.val();
			var mite = $(event.target).find('input[name=miteCount]');
			var miteValue = mite.val();
			
			Hivename.insert({hiveName: hiveText, observationDate: observationValue, duration: duration, miteCount: miteValue, sumbitedOn: Date.now()});
		}
	});
	
	Template.collectionForm.helpers
	({
		'Hivename':function()
		{
			return Hivename.find({}, {sort: {submittedOn: -1}}) || {};
		}
	})
}

if (Meteor.isServer)
{
	// code only runs on server side 
	Meteor.publish("hiveName", function(){
		return Hivename.find();
	})
}