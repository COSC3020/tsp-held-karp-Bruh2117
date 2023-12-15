function tsp_hk(distance_matrix) {
    
    if (distance_matrix.length <= 1)
    {
        return 0; 
    }

    var cache = []; 
    var cities = Object.keys(distance_matrix);
    var min = Infinity; 

    for (var i = 0; i < cities.length; i++)
    {
        var tmp = heldkarp(distance_matrix, i, cities, cache);
        
        if (tmp < min)
        {
            min = tmp; 
        }
    }

    return min; 
}

function heldkarp(dist_mat, start, cities, cache)
{
    var key = JSON.stringify(cities) + start; 

    if (cache[key] != undefined)
    {
        return cache[key]; 
    }
    if (cities.length == 2)
    {
        cache[key] = dist_mat[cities[0]][cities[1]]; 
        return cache[key]; 
    }
    else
    {
        var min = Infinity;

        for (var j = 0; j < cities.length; j++)
        {
            if (cities[j] != start)
            {
                var newCities = cities.filter(j => j != start); 
                var newMin = heldkarp(dist_mat, cities[j], newCities, cache) + dist_mat[start][cities[j]]; 

                if (newMin < min)
                {
                    min = newMin; 
                }
            }
        }

        cache[key] = min; 
        return min; 
    }
}