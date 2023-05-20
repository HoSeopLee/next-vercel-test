import React from 'react';
import Layout from '../../components/Layout';
import Date from '../../components/Date';
import utilStyles from '../../styles/utils.module.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { MDXRemote } from 'next-mdx-remote';
import CodeBlock from '../../components/CodeBlock';
export async function getStaticPaths() {
  const paths = getAllPostIds();
  // Add the "await" keyword like this:
  // const paths = [
  //   {
  //     params: {
  //       id: 'ssg-ssr',
  //     },
  //   },
  // ];

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const Button = ({ children }) => {
  return (
    <button
      onClick={() => {
        alert('메롱');
      }}
    >
      {children}
    </button>
  );
};

const components = { Button, CodeBlock };

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
    </Layout>
  );
}
