const text = `### Project 1 \n
\n
![thumbnail](image.jpg)\n
[Link:](https://example.com/project1) \n
\n
> This is a short description of Project 1. \n
\n
### Project 2 \n
\n
![thumbnail](image.jpg) \n
[Link:](https://example.com/project2)
`

let projects = markdownRender(text);
insertProjects(projects);

function markdownRender(text) {
    const result = '';
    let lines = text.split('\n');
    let line;
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        console.log('running i')
        line = lines[i].trim();

        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
        } else if (inCodeBlock) {
            result += line + '\n';
        } else {
            const parts = line.split(/(\[.*?\]\([^\)]+\)|\!\[.*?\]\(.*\))/);
            let j = 0;
            for (; j < parts.length;) {
                if (parts[j].startsWith('[') && parts[j].endsWith(']')) {
                    result += parts[j];
                    j++;
                } else if (parts[j].startsWith('![') && parts[j].endsWith(']')) {
                    result += parts[j];
                    j++;
                } else {
                    const image = parts[j].replace(/^!\[.*?\]\(.*\)$/, '$1');
                    result += `<a href="${image}"><img src="${image}" alt="Image" /></a>`;
                    j++;
                }
            }
        }
    }
}

function insertProjects(projects) {
    const projectsDiv = document.getElementById('projects');
    projects.forEach((project) => {
        const projectHTML = `
        <a href="${project.link}" target="_blank" class='container'>
          <img src="${project.thumbnail}" alt="${project.title}"/>
          <h2>${project.title}</h2>
          <p>${project.text}</p>
        </a>
      `;
        projectsDiv.innerHTML += projectHTML;
    });
}