import axios from 'axios';
import moment from 'moment';

console.log('test');

const checkClick = () => {
  console.log('clicked');
};

const alwaysLook = () => {
  document.getElementById('searchButton').addEventListener('click', checkClick);
};

alwaysLook();

const concertRequest = (myInput) => {
  myInput = 'Clutch';
  axios
    .get(
      'https://rest.bandsintown.com/artists/' +
        myInput +
        '/events?app_id=codingbootcamp'
    )
    .then(function (response) {
      for (var i = 0; i < 5; i++) {
        var time = moment(response.data[i].datetime).format('L');
        console.log('\n------------Next Event----------------');
        console.log('Venue Name: ' + response.data[i].venue.name);
        console.log('Venue Country: ' + response.data[i].venue.country);
        console.log('Venue City: ' + response.data[i].venue.city);
        console.log(time);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

concertRequest();
