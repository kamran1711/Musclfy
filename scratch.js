const https = require('https');

function searchItunes(term) {
  return new Promise((resolve, reject) => {
    https.get(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&limit=1`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data).results[0]));
    }).on('error', reject);
  });
}

async function run() {
  const terms = ['Sahiba Phillauri', 'Tum Hi Ho', 'Raataan Lambiyan', 'Kabira', 'Channa Mereya', 'Ghungroo'];
  for (const t of terms) {
    const res = await searchItunes(t);
    if(res) {
        console.log({
            title: t,
            audioUrl: res.previewUrl,
            image: res.artworkUrl100.replace('100x100bb', '500x500bb')
        });
    }
  }
}
run();
