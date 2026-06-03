const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '8h417cxp',
  dataset: 'production',
  apiVersion: '2026-06-01',
  useCdn: false
});

client.fetch(`*[_type == "post"] { _id, title, slug, publishedAt }`)
  .then(posts => {
    console.log("Found posts:", JSON.stringify(posts, null, 2));
  })
  .catch(err => {
    console.error("Error fetching posts:", err);
  });
