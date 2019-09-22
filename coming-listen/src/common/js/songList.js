class Song {
  constructor(song) {
    this.id = song.id;
    this.pic = song.pic;
    this.name = song.name;
    this.singer = song.singer;
    this.album = song.album;
  }
}
export function createdSong(song) {
  return new Song({
    pic: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.album.mid}.jpg?max_age=2592000`,
    name: song.name,
    singer: initSingers(song.singer),
    id: song.mid,
    album: song.album.name
  });
}
function initSingers(singers) {
  let singerArr = [];
  for (const singer of singers) {
    singerArr.push(singer.name);
  }
  return singerArr.join('/');
}