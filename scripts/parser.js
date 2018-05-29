module.exports = jsonData => {
    let parsed = [];

    for (let error in jsonData) {
        let item = jsonData[error];
        let objToAdd = {};

        // parse error types
        if (item.error_type === 'Box.WrongPos') {
            objToAdd['error_type'] = 'Wrong Position';
        } else if (item.error_type === 'Track.ErrorBoxes') {
            objToAdd['error_type'] = 'Box Error';
        } else if (item.error_type === 'Track.Missing.Stationary') {
            objToAdd['error_type'] = 'Missing Obj';
        } else if (item.error_type === 'Track.False') {
            objToAdd['error_type'] = 'False Track'
        }

        // parse label
        if (item.label.length === 1) {
            objToAdd['label'] = item.label[0];
        } 

        // parse cuboid Id
        if (item.cuboidId !== 'Track.Missing.Stationary')
            objToAdd['cuboidId'] = item.cuboidId;

        // parse nuro Id
        objToAdd['nuro_id'] = item.nuro_id;

        // parse dimensions
        for (let coordinate in item.dimensions) {
            let coordinates = item.dimensions[coordinate]
            objToAdd['dimensions'] = `${coordinates.x.toFixed(3)}, ${coordinates.y.toFixed(3)}, ${coordinates.z.toFixed(3)}`
        }

        // parse positions
        for (let coordinate in item.position) {
            let coordinates = item.position[coordinate]
            objToAdd['position'] = `${coordinates.x.toFixed(3)}, ${coordinates.y.toFixed(3)}, ${coordinates.z.toFixed(3)}`
        }

        // parse frames
        if (item.frames === 'stationary') {
            objToAdd['frames'] = 'Stationary';
        } else if (item.frames['Box.WrongPos']) {
            if (item.frames['Box.WrongPos'].length > 1) {
                objToAdd['frames'] = `Between Frame ${item.frames['Box.WrongPos'][0]} and ${item.frames['Box.WrongPos'][item.frames['Box.WrongPos'].length - 1]}`;
            } else {
                objToAdd['frames'] = `Frame ${item.frames['Box.WrongPos'][0]}`;
            }
        } else if (item.frames['Box.WrongHeading']) {
            objToAdd['frames'] = item.frames['Box.WrongHeading'];
        }

        // push onto array
        parsed.push(objToAdd)
    }

    return parsed;
}
