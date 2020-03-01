const fs = require("fs");

const preBuild = () => {

  const contents = fs.readFileSync("config.json");
  const jsonContent = JSON.parse(contents);
  const posts = jsonContent.params.posts

  posts.forEach(post => {
    jsonToMarkdown(post);
  })
};

const getCdnUrl = (key) => {
  const imageRequest = JSON.stringify({
    bucket: 'cf-simple-s3-origin-cloudfrontfors3-273116933489',
    key,
  });
  return `https://d1kk667yopfgms.cloudfront.net/${Buffer.from(imageRequest).toString('base64')}`;
};

const jsonToMarkdown = (postJson) => {
  const { id, title, description, image_url, series, date_published, draft, markdown } = postJson;

  const cdnUrl = getCdnUrl(image_url || "2a297023-60db-48c9-994e-00c76621779c");

  fs.writeFileSync(`content/posts/${id}.md`, "---\n");
  fs.appendFileSync(`content/posts/${id}.md`, `title: "${title}"\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `date: ${date_published}\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `description: "${description}"\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `image: "${cdnUrl}"\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `series: ${series}\n`);
  fs.appendFileSync(`content/posts/${id}.md`, `draft: ${draft}\n`);
  fs.appendFileSync(`content/posts/${id}.md`, "---\n");
  fs.appendFileSync(`content/posts/${id}.md`, markdown);

};

preBuild();
