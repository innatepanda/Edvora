export function calcDistance( path , stCode ) {
    var min_d = Math.abs( path[0] - stCode );
    var length = path.length; var temp;

    for( var i = 1; i < length; i++ ) {

        temp = Math.abs( path[i] - stCode );

        if( temp < min_d ) {
            min_d = temp;
            continue;
        }

        break;
    }

    return min_d;
}

export function sortByNearest(ride, stCode) {
    return ride.sort( (a, b) =>  {
        var A = a.station_path;
        var B = b.station_path;

        return calcDistance(A, stCode) - calcDistance(B, stCode);

    })
}