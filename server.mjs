import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { guides } from './content/guides.mjs';
const root=resolve('.');
const allowed=new Set(['index.html','404.html','favicon.ico',...guides.map(g=>`${g.slug}.html`),'assets/style.css','assets/search.js','assets/icon.svg','assets/favicon-32.png','assets/apple-touch-icon.png']);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.ico':'image/x-icon','.png':'image/png','.svg':'image/svg+xml'};
createServer(async(req,res)=>{
 try {
  const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=resolve(root,'.'+(path==='/'?'/index.html':path));
  if(!file.startsWith(root+sep)||!allowed.has(file.slice(root.length+1))) throw Error('Not found');
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':types[extname(file)],'X-Content-Type-Options':'nosniff'}).end(data);
 } catch {res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(await readFile(resolve(root,'404.html')));}
}).listen(Number(process.env.PORT||3018),'127.0.0.1',()=>console.log(`DocuLocate Support: http://localhost:${process.env.PORT||3018}`));
