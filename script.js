console.log('Welcome to Spotify')

// Initialize the audio element
let songIndex = 0
let audioElement = new Audio('songs/1.mp3') // Default song
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = document.getElementsByClassName('songItem')
let currentSongText = document.getElementById('currentSongText') // Get the song name display element

let songs = [
  {
    songName: 'warriyo - mortals[ncs release]',
    filePath: 'songs/1.mp3',
    coverPath: 'covers/1.jpg',
  },
  {
    songName: 'Cielo - Huma-Huma ',
    filePath: 'songs/2.mp3',
    coverPath: 'covers/2.jpg',
  },
  {
    songName: 'Deaf Kev - Invincible-320k',
    filePath: 'songs/3.mp3',
    coverPath: 'covers/3.jpg',
  },
  {
    songName: 'Different Heaven & EH!DE - My Heart',
    filePath: 'songs/4.mp3',
    coverPath: 'covers/4.jpg',
  },
  {
    songName: 'Janji-Heroes-Tonight',
    filePath: 'songs/5.mp3',
    coverPath: 'covers/5.jpg',
  },
  {
    songName: 'Rabba - Salam-e-Ishq',
    filePath: 'songs/6.mp3',
    coverPath: 'covers/6.jpg',
  },
  {
    songName: 'Shakhyaan - Salam-e-Ishq',
    filePath: 'songs/7.mp3',
    coverPath: 'covers/7.jpg',
  },
  {
    songName: 'Bhula Dena - Salam-e-Ishq',
    filePath: 'songs/8.mp3',
    coverPath: 'covers/8.jpg',
  },
  {
    songName: 'Tumhari Kasam - Salam-e-Ishq',
    filePath: 'songs/9.mp3',
    coverPath: 'covers/9.jpg',
  },
  {
    songName: 'salam-e-ishq',
    filePath: 'songs/10.mp3',
    coverPath: 'covers/10.jpg',
  },
]

// Update songItem images and song names
Array.from(songItems).forEach((element, i) => {
  element.getElementsByTagName('img')[0].src = songs[i].coverPath
  element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity = 1
    currentSongText.innerText = songs[songIndex].songName // Show current song name
  } else {
    audioElement.pause()
    masterPlay.classList.add('fa-circle-play')
    masterPlay.classList.remove('fa-circle-pause')
    gif.style.opacity = 0
  }
})

// Listen to events
audioElement.addEventListener('timeupdate', () => {
  // Update seekbar
  let progress = parseInt(
    (audioElement.currentTime / audioElement.duration) * 100,
  )
  myProgressBar.value = progress
})

// Update audio seek time when user changes the progress bar
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

// Function to reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach(
    (element) => {
      element.classList.remove('fa-circle-pause')
      element.classList.add('fa-circle-play')
    },
  )
}

// Handle individual song item play click
Array.from(document.getElementsByClassName('songItemPlay')).forEach(
  (element, i) => {
    element.addEventListener('click', (e) => {
      // Reset all play buttons
      makeAllPlays()

      // Update audio source to the selected song
      songIndex = i
      audioElement.src = songs[songIndex].filePath
      audioElement.currentTime = 0
      audioElement.play()

      // Update the main play button, gif, and current song name
      masterPlay.classList.remove('fa-circle-play')
      masterPlay.classList.add('fa-circle-pause')
      gif.style.opacity = 1
      currentSongText.innerText = songs[songIndex].songName // Show current song name

      // Change the clicked button to pause
      e.target.classList.remove('fa-circle-play')
      e.target.classList.add('fa-circle-pause')
    })
  },
)
