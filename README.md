This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# creative-blog

pages/ - Contains the main routes (home, posts, etc.).
posts/ - Contains markdown files or data for each blog post.
components/ - Contains reusable components like the header, footer, etc.
styles/ - Contains CSS or styling files.

gray-matter for parsing front matter from markdown files.
remark and remark-html for converting markdown to HTML.
date-fns for date formatting.

posts/first-post.md:

---

title: "My First Blog Post"
date: "2024-01-01"
description: "This is the description of my first blog post."

---

Hello, this is my first blog post written in markdown.

lib/posts.js:

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
const fileNames = fs.readdirSync(postsDirectory);
const allPostsData = fileNames.map(fileName => {
const id = fileName.replace(/\.md$/, '');
const fullPath = path.join(postsDirectory, fileName);
const fileContents = fs.readFileSync(fullPath, 'utf8');
const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data
    };

});
return allPostsData.sort((a, b) => {
if (a.date < b.date) {
return 1;
} else {
return -1;
}
});
}

export function getAllPostIds() {
const fileNames = fs.readdirSync(postsDirectory);
return fileNames.map(fileName => {
return {
params: {
id: fileName.replace(/\.md$/, '')
}
};
});
}

export async function getPostData(id) {
const fullPath = path.join(postsDirectory, `${id}.md`);
const fileContents = fs.readFileSync(fullPath, 'utf8');
const matterResult = matter(fileContents);

const processedContent = await remark().use(html).process(matterResult.content);
const contentHtml = processedContent.toString();

return {
id,
contentHtml,
...matterResult.data
};
}

pages/index.js:

import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
const allPostsData = getSortedPostsData();
return {
props: {
allPostsData
}
};
}

<!-- export default function Home({ allPostsData }) {
return (

<div>
<h1>My Blog</h1>
<ul>
{allPostsData.map(({ id, date, title }) => (
<li key={id}>
<Link href={`/posts/${id}`}>
<a>{title}</a>
</Link>
<br />
<small>{date}</small>
</li>
))}
</ul>
</div>
);
} -->

pages/posts/[id].js:

import { getAllPostIds, getPostData } from '../../lib/posts';

export async function getStaticPaths() {
const paths = getAllPostIds();
return {
paths,
fallback: false
};
}

export async function getStaticProps({ params }) {
const postData = await getPostData(params.id);
return {
props: {
postData
}
};
}

<!-- export default function Post({ postData }) {
return (

<div>
<h1>{postData.title}</h1>
<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
</div>
);
} -->

styles/globals.css:

body {
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
}

pages/\_app.js

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
return <Component {...pageProps} />;
}

export default MyApp;
