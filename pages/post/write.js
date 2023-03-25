import React, { useRef, useState } from 'react';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Write() {
  const idRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  const [shoLink, setShoLink] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = idRef.current.value;
    const title = titleRef.current.value;
    const content = contentRef.current.value;

    if (id && title && content) {
      fetch('/api/post/write', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, title, content }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Something went wrong');
        })
        .then((data) => {
          setShoLink(true);
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Layout>
      <h1>Write a Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="id" placeholder="id" required ref={idRef} />
        <br />
        <input
          type="text"
          name="title"
          placeholder="title"
          required
          ref={titleRef}
        />
        <br />
        <textarea name="content" id="content" ref={contentRef} />
        <br />
        <input type="submit" value="Create" />
      </form>
      {shoLink && (
        <Link href="/posts/[id]" as={`/posts/${idRef.current.value}`}>
          Go to post
        </Link>
      )}
    </Layout>
  );
}
