const fs = require("fs");

const preBuild = () => {

  const contents = fs.readFileSync("config.json");
  const jsonContent = JSON.parse(contents);
  const posts = jsonContent.params.posts

  posts.forEach(post => {
    jsonToMarkdown(post);
  })
};

const jsonToMarkdown = (postJson) => {
  const { id, title, description, image, series, date, draft, markdown } = postJson;

  fs.writeFileSync(`content/posts/${id}.md`, "---\n");
  fs.appendFileSync(`content/posts/${id}.md`, `title: "${title}"\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `date: ${date}\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `description: "${description}"\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `image: "${image}"\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `series: ${series}\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `draft: ${draft}\n`);
  fs.appendFileSync(`content/posts/${id}.md`, "---\n");
  fs.appendFileSync(`content/posts/${id}.md`, markdown);

};

preBuild();
