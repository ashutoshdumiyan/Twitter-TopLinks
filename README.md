# Twitter TopLinks App

Visit the website [here](https://intense-beyond-79161.herokuapp.com/) and give any suggestions and report bugs.<br/>

## Screenshots

- Homepage <br/><br/>
  ![Homepage](https://i.imgur.com/ksBWFO4.png)
- Loading screen (after clicking on the Login button in the top right corner)<br/><br/>
  ![Loading](https://i.imgur.com/8O6idFB.png)
- Your tweets after the loading is complete.<br/><br/>
  ![Tweets](https://i.imgur.com/TbzlyNv.png)
- Some more tweets after you scroll down <br/><br/>
  ![More Tweets](https://i.imgur.com/DUU4nHZ.png)
- The Top User tab. <br/><br/>
  ![Top User](https://i.imgur.com/ZbuDrNO.png)
- The Top Links tab. <br/><br/>
  ![Top Links](https://i.imgur.com/2nOQzTl.png)
  After this, you can logout by clicking in the top-right corner.

## Issues
When the user profile is huge (a very large friends list) then fetching the data from twitter may take a lot of time. In that case, the application will keep refreshing every 5 seconds until it eventually gets the data.

## Technologies Used

- [React](https://reactjs.org/) for user interface.<br/>
- [Bootstrap](https://getbootstrap.com/) for frontend design.<br/>
- [Node.js](https://nodejs.org/) for backend.<br/>
- [Twitter API](https://developer.twitter.com/en/products/twitter-api) to fetch user's data from Twitter.
- [Heroku](https://heroku.com/) for deployment.

## For Developers

Download or clone this repository and run `npm install` in the project directory and then replace heroku website URLs with your local development localhost URLs.<br/>

### Requirements

Node.js should be installed for `npm install` to work.

Special thanks to [twit](https://github.com/ttezel/twit) for their awesome Twitter API client.

## License

This project is licensed under MIT license. View [LICENSE](https://github.com/ashutoshdumiyan/twitter-toplinks/blob/master/LICENSE) for more information.
