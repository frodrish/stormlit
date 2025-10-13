import fs from 'fs';
import path from 'path';

function generateSidebar(pathToMarkdown = 'sidebar.md') {
  const filePath = path.resolve(process.cwd(), pathToMarkdown);
  const markdownContent = fs.readFileSync(filePath, 'utf-8');
  
  const lines = markdownContent.split('\n').filter(line => line.trim().startsWith('-'));

  const sidebar = [];
  let currentGroup = null;
  for (const line of lines) {
    // Check if it's a top-level group (e.g., '- Guides')
    if (line.trim().startsWith('- ') && !line.trim().startsWith('- [')) {
      const label = line.trim().substring(2);
      currentGroup = {
        label,
        items: [],
      };
      sidebar.push(currentGroup);
    } 
    // Check if it's a link item (e.g., '  - [Introduction](/guides/introduction)')
    else if (line.trim().startsWith('- [')) {
      const linkMatch = line.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch ) {
        if(!currentGroup) {
          currentGroup = {
            label: 'Default',
            items: [],
          };
          sidebar.push(currentGroup);
        }
        const [, label, slug] = linkMatch;
        currentGroup.items.push({ label, slug:slug.replace(/\.(md|mdx)$/i, '') });
      }
    }
  }

  return sidebar;
}

export default generateSidebar;