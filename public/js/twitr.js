const postData = (url = ``, data = {}) => {
    data = Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
    console.log(data);
    console.log("for url");
    console.log(url);
    // Default options are marked with *
    return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        credentials: 'include',
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data,
    })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
};

$('#get_friends').on('click',function(){
    let user_details = {'user1':$('#user1').val(),'user2':$('#user2').val()}
    console.log("for user_details");
    console.log(user_details);
    postData('/twitr/getMutualFriends', user_details)
    .then(res => {
        console.log("inside then");
        console.log(res);
    });
})