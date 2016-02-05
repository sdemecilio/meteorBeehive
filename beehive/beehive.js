Observations = new Mongo.Collection('observations');

if (Meteor.isClient)
{
	Meteor.subscribe("observations");
	
	Template.collectionForm.events({});
	
	Template.collectionForm.events
	({
		'submit form':function(event)
		{
			event.preventDefault();
			var hivename = $(event.target).find('input[name=hiveName]');
			var hiveNameText = hivename.val();
			
			var observationDate = $(event.target).find('input[name=observationDate]');
			var observation = observationDate.val();
			
			var duration = $(event.target).find('input[name=duration]');
			var durationTime = duration.val();
			
			var miteCount = $(event.target).find('input[name=miteCount]');
			var mites = miteCount.val();
			
			Observations.insert
			({
				hiveName: hiveNameText,
				observationDate: observation,
				duration: durationTime,
				miteCount: mites,
				createdOn: Date.now()
			});
			
			
		}
	});
	
	Template.collectionForm.helpers
	({
		// sorts by the date that information was submitted on
		'observations':function()
		{
			return Observations.find({}, {sort: {createdOn: -1}}) || {};
		}
	})
}

if (Meteor.isServer)
{
	// this code only runs on the server side
	Meteor.publish("observations", function()
	{
		return Observations.find();
	})
}