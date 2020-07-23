import axios from 'axios';
import cheerio from 'cheerio';

// const url =
//   'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';

// axios(url)
//   .then((response) => {
//     const html = response.data;
//     const $ = cheerio.load(html);
//     const statsTable = $('.statsTableContainer > tr');
//     const topPremierLeagueScorers = [];

//     statsTable.each(function () {
//       const rank = $(this).find('.rank > strong').text();
//       const playerName = $(this).find('.playerName > strong').text();
//       const nationality = $(this).find('.playerCountry').text();
//       const goals = $(this).find('.mainStat').text();

//       topPremierLeagueScorers.push({
//         rank,
//         name: playerName,
//         nationality,
//         goals,
//       });
//     });

//     console.log(topPremierLeagueScorers);
//   })
//   .catch(console.error);

const url =
  'https://www.washingtonpost.com/graphics/2020/national/coronavirus-us-cases-deaths/?hpid=hp_hp-banner-main_gfx-virus-tracker%3Ahomepage%2Fstory-ans&itid=hp_hp-banner-main_gfx-virus-tracker%3Ahomepage%2Fstory-ans';

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const infoBox = [];
    const statsTable = $('.sortable-table > tr');

    statsTable.each(() => {
      const place = $(this).find('.table-row > td').text();
      console.log(place);

      infoBox.push({
        place,
      });
    });

    // statsTable.each(function () {
    //   const rank = $(this).find('.rank > strong').text();
    //   const playerName = $(this).find('.playerName > strong').text();
    //   const nationality = $(this).find('.playerCountry').text();
    //   const goals = $(this).find('.mainStat').text();

    //   topPremierLeagueScorers.push({
    //     rank,
    //     name: playerName,
    //     nationality,
    //     goals,
    //   });
    // });

    console.log(infoBox);
  })
  .catch(console.error);
