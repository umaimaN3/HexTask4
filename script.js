document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const audioPlayer = document.getElementById('audio-player');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const progressHandle = document.getElementById('progress-handle');
    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeLevel = document.getElementById('volume-level');
    const volumePercent = document.getElementById('volume-percent');
    const playlistBody = document.getElementById('playlist-body');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentArtist = document.getElementById('current-artist');
    const currentGenre = document.getElementById('current-genre');
    const currentYear = document.getElementById('current-year');
    const currentAlbumImg = document.getElementById('current-album-img');
    const albumArt = document.getElementById('album-art');
    const equalizer = document.getElementById('equalizer');
    const miniTitle = document.getElementById('mini-title');
    const miniArtist = document.getElementById('mini-artist');
    const totalSongsEl = document.getElementById('total-songs');
    const totalDurationEl = document.getElementById('total-duration');
    const clearBtn = document.getElementById('clear-btn');
    const addBtn = document.getElementById('add-btn');

    // Music Library
    const musicLibrary = [
        {
            id: 1,
            title: "Blinding Lights",
            artist: "The Weeknd",
            genre: "Pop",
            year: "2020",
            duration: "3:22",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "Stay",
            artist: "The Kid LAROI, Justin Bieber",
            genre: "Pop",
            year: "2021",
            duration: "2:23",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Heat Waves",
            artist: "Glass Animals",
            genre: "Indie",
            year: "2020",
            duration: "3:59",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "As It Was",
            artist: "Harry Styles",
            genre: "Pop",
            year: "2022",
            duration: "2:47",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3.mp3",
            cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            title: "Bad Habit",
            artist: "Steve Lacy",
            genre: "R&B",
            year: "2022",
            duration: "3:53",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 6,
            title: "Levitating",
            artist: "Dua Lipa",
            genre: "Pop",
            year: "2020",
            duration: "3:24",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 7,
            title: "Good 4 U",
            artist: "Olivia Rodrigo",
            genre: "Pop Rock",
            year: "2021",
            duration: "2:59",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3.mp3",
            cover: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 8,
            title: "Save Your Tears",
            artist: "The Weeknd",
            genre: "Pop",
            year: "2020",
            duration: "3:36",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3.mp3",
            cover: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 9,
            title: "Industry Baby",
            artist: "Lil Nas X",
            genre: "Hip Hop",
            year: "2021",
            duration: "3:32",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1571974599782-87624638275b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 10,
            title: "Shivers",
            artist: "Ed Sheeran",
            genre: "Pop",
            year: "2021",
            duration: "3:28",
            src: "Sapphire (Mp3 Song)-(SambalpuriStar.In).mp3",
            cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        }
    ];

    // Player State
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeated = false;
    let originalPlaylist = [...musicLibrary];
    let currentPlaylist = [...musicLibrary];

    // Initialize
    function init() {
        renderPlaylist();
        loadSong(currentSongIndex);
        updateTotalStats();
        
        // Set initial volume
        updateVolume(volumeSlider.value);
        
        // Set up event listeners
        setupEventListeners();
    }

    // Render Playlist
    function renderPlaylist() {
        playlistBody.innerHTML = '';
        
        currentPlaylist.forEach((song, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="song-number">${index + 1}</td>
                <td class="song-title">${song.title}</td>
                <td class="song-artist">${song.artist}</td>
                <td class="song-duration">${song.duration}</td>
                <td>
                    <button class="play-song-btn" data-index="${index}">
                        <i class="fas ${index === currentSongIndex && isPlaying ? 'fa-pause' : 'fa-play'}"></i>
                    </button>
                </td>
            `;
            
            if (index === currentSongIndex) {
                row.classList.add('playing');
            }
            
            playlistBody.appendChild(row);
        });
        
        // Add click events to playlist rows
        document.querySelectorAll('.play-song-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const index = parseInt(this.getAttribute('data-index'));
                playSongFromPlaylist(index);
            });
        });
        
        // Add click events to playlist rows
        document.querySelectorAll('#playlist-body tr').forEach((row, index) => {
            row.addEventListener('click', function(e) {
                if (!e.target.classList.contains('play-song-btn')) {
                    playSongFromPlaylist(index);
                }
            });
        });
    }

    // Load Song
    function loadSong(index) {
        currentSongIndex = index;
        const song = currentPlaylist[index];
        
        // Update audio source
        audioPlayer.src = song.src;
        
        // Update UI
        currentSongTitle.textContent = song.title;
        currentArtist.textContent = song.artist;
        currentGenre.textContent = song.genre;
        currentYear.textContent = song.year;
        currentAlbumImg.src = song.cover;
        currentAlbumImg.alt = `${song.title} - ${song.artist}`;
        
        // Update mini player
        miniTitle.textContent = song.title;
        miniArtist.textContent = song.artist;
        
        // Update playlist highlight
        document.querySelectorAll('#playlist-body tr').forEach(row => {
            row.classList.remove('playing');
        });
        document.querySelectorAll('#playlist-body tr')[index].classList.add('playing');
        
        // Reset progress
        progress.style.width = '0%';
        currentTimeEl.textContent = '0:00';
        
        // Update play button in playlist
        updatePlaylistPlayButtons();
    }

    // Play/Pause
    function togglePlay() {
        if (audioPlayer.src) {
            if (isPlaying) {
                pauseSong();
            } else {
                playSong();
            }
        } else {
            playSongFromPlaylist(0);
        }
    }

    function playSong() {
        isPlaying = true;
        audioPlayer.play();
        playIcon.className = 'fas fa-pause';
        albumArt.classList.add('playing');
        equalizer.style.display = 'flex';
        playBtn.title = 'Pause';
        updatePlaylistPlayButtons();
    }

    function pauseSong() {
        isPlaying = false;
        audioPlayer.pause();
        playIcon.className = 'fas fa-play';
        albumArt.classList.remove('playing');
        equalizer.style.display = 'none';
        playBtn.title = 'Play';
        updatePlaylistPlayButtons();
    }

    // Next Song
    function nextSong() {
        if (isShuffled) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * currentPlaylist.length);
            } while (newIndex === currentSongIndex && currentPlaylist.length > 1);
            currentSongIndex = newIndex;
        } else {
            currentSongIndex = (currentSongIndex + 1) % currentPlaylist.length;
        }
        
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Previous Song
    function prevSong() {
        if (isShuffled) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * currentPlaylist.length);
            } while (newIndex === currentSongIndex && currentPlaylist.length > 1);
            currentSongIndex = newIndex;
        } else {
            currentSongIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
        }
        
        loadSong(currentSongIndex);
        if (isPlaying) {
            playSong();
        }
    }

    // Play song from playlist
    function playSongFromPlaylist(index) {
        if (currentSongIndex === index && isPlaying) {
            pauseSong();
        } else {
            loadSong(index);
            playSong();
        }
    }

    // Update playlist play buttons
    function updatePlaylistPlayButtons() {
        document.querySelectorAll('.play-song-btn').forEach((btn, index) => {
            const icon = btn.querySelector('i');
            if (index === currentSongIndex && isPlaying) {
                icon.className = 'fas fa-pause';
                btn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                icon.className = 'fas fa-play';
                btn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    // Update progress
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        
        // Update time display
        currentTimeEl.textContent = formatTime(currentTime);
        
        // Update progress handle position
        if (!isNaN(duration)) {
            const handlePosition = (progressPercent / 100) * progressBar.offsetWidth;
            progressHandle.style.left = `${handlePosition}px`;
        }
    }

    // Set progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    // Update time display
    function updateTimeDisplay() {
        totalTimeEl.textContent = formatTime(audioPlayer.duration);
    }

    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Volume control
    function updateVolume(value) {
        const volume = value / 100;
        audioPlayer.volume = volume;
        volumeLevel.style.width = `${value}%`;
        volumePercent.textContent = `${value}%`;
        
        // Update volume icons
        const volumeIcons = document.querySelectorAll('.volume-icon');
        if (value == 0) {
            volumeIcons.forEach(icon => icon.className = 'fas fa-volume-mute');
        } else if (value < 50) {
            volumeIcons[0].className = 'fas fa-volume-down';
            volumeIcons[1].className = 'fas fa-volume-up';
        } else {
            volumeIcons[0].className = 'fas fa-volume-up';
            volumeIcons[1].className = 'fas fa-volume-up';
        }
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        shuffleBtn.classList.toggle('active', isShuffled);
        shuffleBtn.style.color = isShuffled ? '#4ecdc4' : '';
        
        if (isShuffled) {
            // Create shuffled playlist
            currentPlaylist = [...originalPlaylist];
            for (let i = currentPlaylist.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [currentPlaylist[i], currentPlaylist[j]] = [currentPlaylist[j], currentPlaylist[i]];
            }
        } else {
            // Restore original order
            currentPlaylist = [...originalPlaylist];
        }
        
        renderPlaylist();
        // Keep current song playing
        const currentSong = originalPlaylist.find(song => 
            song.id === currentPlaylist[currentSongIndex].id
        );
        currentSongIndex = originalPlaylist.indexOf(currentSong);
        updatePlaylistPlayButtons();
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeated = !isRepeated;
        repeatBtn.classList.toggle('active', isRepeated);
        repeatBtn.style.color = isRepeated ? '#4ecdc4' : '';
        audioPlayer.loop = isRepeated;
    }

    // Update total stats
    function updateTotalStats() {
        totalSongsEl.textContent = `${currentPlaylist.length} Songs`;
        
        // Calculate total duration
        let totalSeconds = 0;
        currentPlaylist.forEach(song => {
            const [mins, secs] = song.duration.split(':').map(Number);
            totalSeconds += mins * 60 + secs;
        });
        
        const totalMins = Math.floor(totalSeconds / 60);
        const totalSecs = totalSeconds % 60;
        totalDurationEl.textContent = `${totalMins}:${totalSecs < 10 ? '0' : ''}${totalSecs}`;
    }

    // Clear playlist
    function clearPlaylist() {
        if (currentPlaylist.length > 0) {
            if (confirm('Clear all songs from playlist?')) {
                currentPlaylist = [];
                originalPlaylist = [];
                audioPlayer.pause();
                isPlaying = false;
                playIcon.className = 'fas fa-play';
                albumArt.classList.remove('playing');
                equalizer.style.display = 'none';
                currentSongIndex = 0;
                renderPlaylist();
                updateTotalStats();
                
                // Reset current song display
                currentSongTitle.textContent = 'Select a Song';
                currentArtist.textContent = 'Artist Name';
                currentGenre.textContent = 'Pop';
                currentYear.textContent = '2023';
                miniTitle.textContent = 'No song playing';
                miniArtist.textContent = 'Select a song to begin';
                progress.style.width = '0%';
                currentTimeEl.textContent = '0:00';
                totalTimeEl.textContent = '0:00';
            }
        }
    }

    // Add demo song (for demo purposes)
    function addDemoSong() {
        const newSong = {
            id: originalPlaylist.length + 1,
            title: "New Demo Song",
            artist: "Demo Artist",
            genre: "Demo",
            year: "2023",
            duration: "3:30",
            src: "https://assets.codepen.io/4358584/Blinding+Lights.mp3", // Using existing demo URL
            cover: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
        };
        
        originalPlaylist.push(newSong);
        currentPlaylist = [...originalPlaylist];
        renderPlaylist();
        updateTotalStats();
        
        // Show notification
        showNotification('Song added to playlist!');
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Set up event listeners
    function setupEventListeners() {
        // Play/Pause button
        playBtn.addEventListener('click', togglePlay);
        
        // Next/Previous buttons
        nextBtn.addEventListener('click', nextSong);
        prevBtn.addEventListener('click', prevSong);
        
        // Shuffle/Repeat buttons
        shuffleBtn.addEventListener('click', toggleShuffle);
        repeatBtn.addEventListener('click', toggleRepeat);
        
        // Audio events
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('loadedmetadata', updateTimeDisplay);
        audioPlayer.addEventListener('ended', () => {
            if (!isRepeated) {
                nextSong();
            }
        });
        
        // Progress bar
        progressBar.addEventListener('click', setProgress);
        
        // Volume slider
        volumeSlider.addEventListener('input', () => updateVolume(volumeSlider.value));
        
        // Clear/Add buttons
        clearBtn.addEventListener('click', clearPlaylist);
        addBtn.addEventListener('click', addDemoSong);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextSong();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    prevSong();
                    break;
                case 'KeyM':
                    e.preventDefault();
                    audioPlayer.muted = !audioPlayer.muted;
                    break;
                case 'KeyS':
                    e.preventDefault();
                    toggleShuffle();
                    break;
                case 'KeyR':
                    e.preventDefault();
                    toggleRepeat();
                    break;
            }
        });
    }

    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .control-btn.active {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4) !important;
            color: white !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize the player
    init();
});