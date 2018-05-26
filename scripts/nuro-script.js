const _          = require('lodash');
const jsonexport = require('jsonexport');
const fs         = require('fs');

let errors = [];

module.exports = jsonData => {
    _.each(jsonData.errors, function(error, index){

		let temp = {};
		temp.error_type = error.error_type;
		temp.cuboidId = error.original ? error.original.uuid : error.error_type;
		temp.nuro_id = error.original ? error.original.nuro_id : error.corrected.nuro_id
		
		// console.log(index)
		// console.log('error type:', error.error_type)
		// let cuboidId = error.original ? error.original.uuid : error.error_type
		// console.log('cuboidID: ', cuboidId);

		let frames = error.frames ? {} : 'stationary'
		if (error.frames) {
			let types = _.groupBy(error.frames,'error_type')
			
			_.each(types, function(type, key){
				frames[key] = _.map(type,function(error){return error.frame_id});
			})
		}
		temp.frames = frames;
			if (error.original) {
				if (error.original.cuboid) {
					temp.dimensions = [error.original.cuboid.dimensions]
					temp.position = [error.original.cuboid.position]
					temp.label = [error.original.cuboid.label]
					// stationary
				} else {
					// moving
					temp.dimensions = [_.find(error.original.cuboids,"dimensions").dimensions]
					temp.position = [_.find(error.original.cuboids,"position").position]
					temp.label = [_.find(error.original.cuboids,"label").label]
				}
			} else {
				// Missing cuboid

				if(error.corrected.cuboid) {
					// stationary
					temp.dimensions = [error.corrected.cuboid.dimensions]
					temp.position = [error.corrected.cuboid.position]
					temp.label = [error.corrected.cuboid.label]

				} else {
					// moving
					temp.dimensions = [_.find(error.corrected.cuboids,"dimensions").dimensions]
					temp.position = [_.find(error.corrected.cuboids,"position").position]
					temp.label = [_.find(error.corrected.cuboids,"label").label]
				}
				console.log('missing: ',error.error_type)
			}
			// temp.dimensions = [1,2,3]
		errors.push(temp);
	})

	jsonexport(errors,function(err, csv){
		if(err) return console.log(err);
		fs.writeFile('nuro_errors_summary.csv', csv, function(err) {
			if (err) throw err;
			console.log('file saved');
		});
	});
	// console.log('errors: ',errors)
	return errors;
}


