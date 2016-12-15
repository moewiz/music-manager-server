var mongoose = require('mongoose');

// Song Schema
var playlistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  songs: [
    {
      type: Number
    }
  ],
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Playlist = mongoose.model('Playlist', playlistSchema);

// Get Playlists
Playlist.getPlaylists = function (callback, limit) {
  Playlist.find(callback).limit(limit);
}

module.exports = Playlist;