import { writeFile } from 'node:fs/promises';

const ids = ['x-ZW9gzAQpQ', '7xE29M85_pU', 'm6rnWb-w-UA', 'cqtQbHqPnEk', '4RYWgUGqzPo'];
await Promise.all(ids.map(async id => {
  const response = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
  if (!response.ok) throw new Error(`Video poster ${id}: ${response.status}`);
  await writeFile(`public/images/video-${id}.jpg`, Buffer.from(await response.arrayBuffer()));
}));
const license = await fetch('https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/OFL.txt');
if (!license.ok) throw new Error('Unable to download the Poppins license');
await writeFile('src/assets/fonts/OFL.txt', await license.text());
console.log('Five video posters and the Poppins license saved.');
