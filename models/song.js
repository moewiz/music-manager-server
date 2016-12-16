let mongoose = require('mongoose');

// Song Schema
const songSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  artist: { type: String },
  create_date: { type: Date, default: Date.now }
});

const Song = mongoose.model('Song', songSchema);

// Get Songs
Song.getSongs = (callback, limit) => {
  Song.find(callback).limit(limit);
}

Song.getSongById = (id, callback) => {
  Song.findById(id, callback);
}

Song.getSongsByIds = (ids, callback) => {
  let query = { _id: { $in: ids } };

  Song.find(query, callback);
}

Song.addSong = (song, callback) => {
  Song.create(song, callback);
}

Song.updateSong = (id, song, options, callback) => {
  let query = { _id: id };
  let songUpdate = {
    name: song.name,
    artist: song.artist
  };
  Song.findByIdAndUpdate(query, songUpdate, options, callback);
}

Song.removeSong = (id, callback) => {
  let query = { _id: id };
  Song.remove(query, callback);
}

Song.removeMultipleSongs = (ids, callback) => {
  let query = { _id: { $in: ids } };
  Song.remove(query, callback);
}

module.exports = Song;