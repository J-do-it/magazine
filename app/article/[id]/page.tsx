import React from 'react';

type ArticlePageProps = {
  params: {
    id: string;
  };
};

const ArticlePage = ({ params }: ArticlePageProps) => {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold">Article Title for ID: {params.id}</h1>
      <p className="mt-4 text-gray-600">Published on January 1, 2024</p>
      <div className="mt-8 prose lg:prose-xl max-w-none">
        <p>
          This is the content of the article with ID <strong>{params.id}</strong>. 
          This content can be fetched from a CMS or a database.
        </p>
        <p>
          ffffLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
};

export default ArticlePage; 