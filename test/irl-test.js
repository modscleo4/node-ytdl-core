const assert = require('assert');
const nock = require('nock');
const ytdl = require('..');


const videos = {
  'Regular video': 'mgOS64BF2eU',
  'No embed allowed': 'GFg8BP01F5Q',
  Offensive: 'hCKDsjLt_qU',
  'Live broadcast': '5qap5aO4i9A',
};


describe('Try using ytdl-core without mocking', function test() {
  this.retries(1);
  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
    ytdl.cache.sig.clear();
    ytdl.cache.info.clear();
    ytdl.cache.cookie.clear();
  });

  describe('Try starting a download', () => {
    for (let [desc, videoID] of Object.entries(videos)) {
      describe(desc, () => {
        it('Request status code is 2xx', done => {
          const stream = ytdl(videoID);
          stream.on('error', done);
          stream.once('response', res => {
            stream.destroy();
            assert.ok(res.statusCode >= 200 && res.statusCode < 300);
            done();
          });
        });
      });
    }
  });
});
