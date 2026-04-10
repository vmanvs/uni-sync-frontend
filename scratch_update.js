const fs = require('fs');
const path = require('path');

const targetStr = 'className="flex-1 bg-bg-page px-10 py-8 overflow-y-auto"';
const replaceStr = 'className="flex-1 bg-bg-page px-4 pt-6 pb-8 lg:px-10 lg:py-8 overflow-y-auto w-full max-w-full"';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk('src/app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(targetStr)) {
    content = content.replace(targetStr, replaceStr);
    
    // Also inject some specific grid adjustments:
    // admin/page.tsx
    if (file.includes('admin')) {
      content = content.replace('grid-cols-4', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4');
    }
    
    // coolers/page.tsx
    if (file.includes('coolers')) {
      content = content.replace('gap-[200px]', 'gap-4 lg:gap-[200px] flex-wrap justify-between lg:justify-start');
      content = content.replace('gap-[56px]', 'gap-4 lg:gap-[56px] flex-wrap');
      content = content.replace('className="bg-bg-white rounded-[25px] px-[30px] pt-3 pb-6 mt-6"', 'className="bg-bg-white rounded-[25px] px-4 lg:px-[30px] pt-3 pb-6 mt-6 overflow-x-auto"');
      content = content.replace('className="grid grid-cols-4', 'className="grid grid-cols-4 min-w-[600px]');
      content = content.replace(/-mx-\[30px\] px-\[30px\]/g, '-mx-4 px-4 lg:-mx-[30px] lg:px-[30px]');
    }

    // library/page.tsx
    if (file.includes('library')) {
      content = content.replace('gap-[200px]', 'gap-4 lg:gap-[200px] flex-wrap justify-between lg:justify-start');
      // Wrap the chair grid
      content = content.replace('<div className="inline-flex flex-col gap-4">', '<div className="inline-flex flex-col gap-4 overflow-x-auto w-full pb-4">\\n            <div className="min-w-[600px] inline-flex flex-col gap-4">');
      // Note: we need to append the closing div. it's tricky with simple replace. Let's do it via regex
      content = content.replace(/(<div className="inline-flex flex-col gap-4[\s\S]*?)<\/main>/, '$1  </div>\n        </main>');
    }
    
    // playgrounds/page.tsx
    if (file.includes('playgrounds')) {
      content = content.replace('grid-cols-2 lg:grid-cols-3', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3');
    }
    
    // dashboard page.tsx
    if (file.endsWith('app\\\\page.tsx') || file.endsWith('app/page.tsx')) {
      content = content.replace(/-mx-\[30px\] px-\[30px\]/g, '-mx-4 px-4 lg:-mx-[30px] lg:px-[30px]');
      content = content.replace('px-[30px]', 'px-4 lg:px-[30px]');
    }

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
