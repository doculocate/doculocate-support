import { readFile, access } from 'node:fs/promises';
import { guides } from './content/guides.mjs';
const files=['index.html','404.html',...guides.map(g=>`${g.slug}.html`)];
let checked=0;
for(const file of files){
 const source=await readFile(file,'utf8');
 if((source.match(/<h1[ >]/g)||[]).length!==1)throw Error(`${file}: expected one h1`);
 if(!source.includes('name="description"'))throw Error(`${file}: missing description`);
 const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)throw Error(`${file}: duplicate IDs`);
 for(const [,url] of source.matchAll(/(?:href|src)="([^"]+)"/g)){
  if(/^https?:/.test(url))continue;
  if(url.startsWith('#')){if(!ids.includes(url.slice(1)))throw Error(`${file}: missing anchor ${url}`);}
  else {await access(url);}
  checked++;
 }
}
console.log(`Verified ${files.length} pages and ${checked} local links/assets/anchors.`);
