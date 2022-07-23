//Create global variables for songs \\

let song;
let playSong;

//We need Spotify Credentials......(keep these off of Github)
const clientId = '4faace845185422792403e9959f17b99'
const clientSecret = '8fd551ba0712464c8f30abcc8a45facf'

const getToken = async () =>{
    const result = await fetch(`https://accounts.spotify.com/api/token`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + btoa(clientId + ":" + clientSecret)
        },
        body: 'grant_type=client_credentials'
    })

    const data = await result.json()
    console.log(data.access_token)
    return data.access_token
}
/**
 * Function gets songs from spotify using the image index from gallery.
* Then finding the correct item_index from the object returned from Spotify.
* This will produce a preview url to play the song.
 * @param {number} imgIndex -index of an image in gallery
 * @param {number} itemIndex -item on spotify response listt holding our song preview
 */
let clickedEvent = async (imgIndex, itemIndex) =>{
    // get track name
    let track = document.getElementsByTagName('img')[imgIndex].attributes[1].value;
    console.log(`searching for track: ${track}`)

    let token = await getToken();

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15 `,{
    method: 'GET',
    headers:headers
})

    let result = await fetch(request)
    let response = await result.json()
    let tracks = response.tracks.items
    for(let i =0; i < tracks.length; i++){
        console.log(`Track ${i}: ${tracks[i].preview_url}`)}
    // console.log(response.tracks.items)

    // todo: choose and play song
    song = tracks[itemIndex].preview_url

    if(playSong){
        stopSnippet();
    }
    songSnippet(song)
}

/**
 * Function produces songs from the clickedevent 
 * @param {*} id image id for gallery image
 * @param {*} event mouse event give by user action
 */
let getSong = (id, event ) =>{
    event.stopPropagation();
    switch(id){
        case 'fig1':{
            clickedEvent(0,2)
        }
        case 'fig2':{
            clickedEvent(1,0)
        }
        case 'fig3':{
            clickedEvent(2,0)
        }
        case 'fig4':{
            clickedEvent(3,0)
        }
        case 'fig5':{
            clickedEvent(4,0)
        }
        case 'fig6':{
            clickedEvent(5,0)
        }
        default:{
            console.log('No case for that')
            break;
        }
    }
}

/**
 * 
 * @param {string} url song preview url 
 * @returns a playing song
 */
let songSnippet = url =>{
    playSong = new Audio(url)
    return playSong.play()
}

let stopSnippet = () => playSong.pause();



