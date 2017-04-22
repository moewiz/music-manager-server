const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Song = require('./song');

// Playlist Schema
const playlistSchema = mongoose.Schema({
  name: {type: String, required: true, trim: true},
  songs: [{type: ObjectId, ref: 'Song'}],
  createdAt: {type: Date, default: Date.now}
});

const Playlist = mongoose.model('Playlist', playlistSchema);

// Get Playlists
Playlist.getPlaylists = (callback, limit) => {
  Playlist.find(callback).limit(limit);
};

Playlist.getPlaylistById = (id, callback) => {
  Playlist.findById(id, callback);
};

Playlist.getSongs = (id, callback) => {
  let listSongId;

  Playlist.findById(id, (err, playlists) => {
    if (err)
      throw err;

    listSongId = playlists.songs;
    return Song.getSongsByIds(listSongId, callback);
  });
};

Playlist.addPlaylist = (playlist, limit) => {
  // Playlist.create(playlist, callback);
};

Playlist.updatePlaylist = (id, playlist, options, callback) => {
  const query = {_id: id};
  const playlistUpdate = {
    name: playlist.name,
    songs: playlist.songs
  };

  console.log(playlistUpdate);
  // Playlist.findByIdAndUpdate(query, playlistUpdate, options, callback);
};

Playlist.removePlaylist = (id, callback) => {
  const query = {_id: id};

  Playlist.remove(query, callback);
};

Playlist.removeMultiplePlaylists = (ids, callback) => {
  const query = {_id: {$in: ids}};

  Playlist.remove(query, callback);
};

module.exports = Playlist;