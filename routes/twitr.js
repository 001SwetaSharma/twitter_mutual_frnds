const express = require("express");
const twitr_router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var Twit = require('twit');
var config = require('../config/config');
var client = new Twit(config);
let mutual_friends,first_list_ids,second_list_ids,friends;

twitr_router.get('/', (req, res) => {
    res.render(path.dirname(__dirname) + '/views/twitter_example.html');
}); 

twitr_router.post('/getMutualFriends',urlencodedParser,(req,res) =>{
    mutual_friends = [];first_list_ids = [];second_list_ids = [];friends={};
    getFriendList(req.body)
    .then(_ => {
        let matched_ids = first_list_ids.filter(element => second_list_ids.includes(element));
        matched_ids.forEach(id => {
            mutual_friends.push(friends[id]);
        });
        res.send(mutual_friends);
    });
});

let getFriendList = async(data) => {
    try{
        first_list_ids = await fetchFriend(data.user1);
        second_list_ids = await fetchFriend(data.user2);
    }
    catch(e){
        console.log(e);
    }
}

let fetchFriend = () => {
    let ids = [];
    return new Promise((resolve,reject) => {
        client.get('friends/list', {screen_name: 'akshaymarch7',cursor:-1,skip_status:true,include_user_entities:false}, function(error, tweets, response) {
            if(tweets.users.length > 0){
                /* console.log("for tweetes user");
                console.log(tweets.users); */
                tweets.users.forEach(function(tweet) {
                    friends[tweet.id_str] = {
                        "name":tweet.name,
                        "screen_name":tweet.screen_name,
                        "location":tweet.location,
                        "description":tweet.description,
                        "profile_img":tweet.profile_image_url_https
                    }
                    ids.push(tweet.id_str);
                });    
            }
            resolve(ids);
        });
    });
}
module.exports = twitr_router;