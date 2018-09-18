
/* eslint no-restricted-globals: 'off' */


/*var movies = [
  {
    title: 'The Shawshank Redemption',
    year: '1994',
    director: 'Frank Darabont',
    duration: '2h 22min',
    genre: ['Crime', 'Drama'],
    rate: '9.3'
  }
];*/


// Duplicate the array of objects

var duplicate = function (arr){
  var movies2 = [];
  arr.forEach(element => {
    var newO = Object.assign({}, element);
    movies2.push(newO);
  });
  return movies2;
}


// Turn duration of the movies from hours to minutes

var turnHoursToMinutes = function(arr) {
  var movies2 = duplicate(arr);
  movies2.forEach(element => {
    if (!element.duration || typeof element.duration !== 'string') {
      if (isNaN(element.duration)){
        element.duration = 0;
      }
    } else if (element.duration.includes("min") === false) {
      var min = parseInt(element.duration.replace("h", " ")) * 60;
      element.duration = min;
    } else if (element.duration.includes("h") === false){
      var min = parseInt(element.duration.replace("min", " "));
      element.duration = min;
    } else {
      element.duration = element.duration.replace("min", "").replace("h", "").split(" ");
      var time = element.duration[0] * 60 + parseInt(element.duration[1]);
      element.duration = time;
    }
  });
  return movies2;
};

//console.log(turnHoursToMinutes(movies));


// Get the average of all rates with 2 decimals

var ratesAverage = function (arr){
  var average = 0;
  if (!arr || arr.length === 0) {
    return undefined;
  }
  arr.forEach(element => {
    var rate = parseFloat(element.rate);
    if (element.rate === undefined || isNaN(rate)) {
      rate = 0;
    }
    average += rate;
  });
  return Math.round((average/arr.length)*100)/100;
};

//console.log(ratesAverage(movies));



// Get the average of Drama Movies

var dramaMovies = function (arr){
  var drama = arr.filter(movie => {
    return movie.genre.indexOf('Drama') > -1;
  });
  return drama;
};

var dramaMoviesRate = function (arr){
  return ratesAverage(dramaMovies(arr));
};

//console.log(dramaMoviesRate(movies));



// Order by time duration, in growing order

var orderByDuration =  function(arr) {
  var movies2 = turnHoursToMinutes(arr);
  if (movies2 && movies2.length > 1) {
    movies2.sort(function(a, b) {
      if (a.duration === b.duration) {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        } else {
          return 0;
        }
      }
      return a.duration - b.duration;
    });
    return movies2;
  }
  return arr;
};

//console.log(orderByDuration(movies));



// How many movies did STEVEN SPIELBERG

var howManyMovies = function (arr) {
  var drama = dramaMovies(arr);
  if (drama && drama.length > 0) {
    var dramaSteven = drama.filter(movie => {
      return movie.director === 'Steven Spielberg';
    });
    if (dramaSteven.length > 0) {
      return 'Steven Spielberg directed ' + dramaSteven.length + ' drama movies!';
    }
    return 'Steven Spielberg directed 0 drama movies!';
  } else if (drama && drama.length === 0) {
    return undefined;
  }
};

//console.log(howManyMovies(movies));



// Order by title and print the first 20 titles

// var orderAlphabetically = function (arr) {
//   var top20 = [];
//   arr.forEach(movie => {
//     top20.push(movie.title);
//   });
//   return top20.sort(function(a, b) {
//     if (a > b) {
//       return 1;
//     } else if (a < b) {
//       return -1;
//     }
//     return 0;
//   }).slice(0,20);
// };

var orderAlphabetically = function (arr) {
  return arr.map(el=>el.title).sort(function(a, b) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }
    return 0;
  }).slice(0,20);
};

//console.log(orderAlphabetically(movies));


// Best yearly rate average

var bestYearAvg = function (arr){
  var years = {};
  if (!arr || arr.length === 0) {
    return undefined;
  }
  arr.forEach(element => {
    if (years[element.year]) {
      years[element.year].push(element.rate)
    } else {
      years[element.year] = [element.rate];
    }
  });
  var maxRate = 0;
  var maxYear = undefined;
  for (var year in years) {
    var sum = years[year].reduce((a,b)=>{
      return a + b;
    });
    sum = sum/years[year].length;
    if (sum > maxRate) {
      maxRate = sum;
      maxYear = year;
    }
  };
  return 'The best year was ' + maxYear + ' with an average rate of ' + maxRate;
};

//console.log(bestYearAvg(movies));
