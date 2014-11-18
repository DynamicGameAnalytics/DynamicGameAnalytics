# Dynamic Game Analytics

### How to setup for development

First create a file named `local.js` under `app/config/` with the following content:

```javascript
module.exports = {

   connections: {
     mongodb: {
       host: 'localhost',
       port: 27017,
       user: null,
       password: null,
       database: 'dynamic_game_analytics'
     },
   },

   redis: {
     host: 'localhost',
     database: 11
   }
};
```

1. Download vagrant from [https://www.vagrantup.com/]
2. Run `vagrant up` from base directory
3. Connect to vagrant box via `vagrant ssh`
4. Inside the box got to `/app/`
5. Run `nodemon`
6. The Server now runs on [http://localhost:1337]

The server restarts every time a file under `DynamicGameAnalytic/app/` is changed.

The Sails.js documentation can be found under [http://sailsjs.org/#/documentation/concepts]

It may be necessary to (re-) install npm packages inside the vagrant machine by running `npm install` in the `/app/` directory
