const taskID     = '5a8eaf6bf24863003c30be31';
const raw        = require('./nuro_error_reports/'+taskID+'.js');
const _          = require('lodash');
const fs         = require('fs');
const jsonexport = require('jsonexport');

let errors = [];

const test = () => {
    console.log('receiving from nuro-script');
}

_.each(raw.errors, function(error, index){

    let temp = {};
    let frames;

    // Debug what (array) error and (object) temp are
    console.log(error);
    console.log(temp);

    // Set object temp with error type
    temp.error_type = error.error_type;

    // If Original exists, set CuboidId = UUID & nuro ID = original NuroID
    // Otherwise, set cuboidId = errorType & nuro ID = corrected NuroID
    if (error.original) {
        temp.cuboidId = error.original.uuid;;
        temp.nuro_id = error.original.nuro_id;
    } else {
        temp.cuboidId = error.error_type;
        temp.nuro_id = error.corrected.nuro_id;
    }

    // If error Frames exists, set frames to {},
    // Otherwise, set frames to stationary
    if (error.frames) frames = {}
    else frames = 'stationary';

    // If error Frames exists
	if (error.frames) {

        // Set types variable to be "grouped by" error type?
        // Double check what groupBy Lodash does
		let types = _.groupBy(error.frames,'error_type')

        // Go through each of the types and set frames[key] to error.frame_id
		_.each(types, function(type, key){
			frames[key] = _.map(type,function(error){return error.frame_id});
        })


        // debug
        // console.log(frames);
    }

    // set temp.frames to the frames object
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
	// console.log('temp',temp)
})

jsonexport(errors,function(err, csv){
    if(err) return console.log(err);
    fs.writeFile('nuro_errors_summary.csv', csv, function(err) {
      if (err) throw err;
      console.log('file saved');
    });
});

// console.log('errors: ',errors)


// Line 32, 33
// temp.cuboidId   = error.original ? error.original.uuid : error.error_type;
// temp.nuro_id    = error.original ? error.original.nuro_id : error.corrected.nuro_id

module.exports = { test };