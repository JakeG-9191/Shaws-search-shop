import axios from 'axios';

const userInput = 'Clutch';

const concertRequest = () => {
  let userInput = 'clutch';
  axios
    .get(
      'https://rest.bandsintown.com/artists/' +
        userInput +
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

const spotify = new Spotify(keys.spotify);

const spotifyRequest = () => {
  spotify
    .search({
      type: 'track',
      query: userInput || 'The Sign Ace of Base',
      limit: 1,
    })
    .then(function (response) {
      console.log('\n-------Artist Name----------');
      console.log(response.tracks.items[0].artists[0].name);
      console.log('-------Song Name----------');
      console.log(response.tracks.items[0].name);
      console.log('--------Preview URL---------');
      console.log(response.tracks.items[0].preview_url);
      console.log('--------Album Name---------');
      console.log(response.tracks.items[0].album.name);
    })
    .catch(function (err) {
      console.log(err);
    });
};
