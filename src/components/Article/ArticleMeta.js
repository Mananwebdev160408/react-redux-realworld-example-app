import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';

const ArticleMeta = ({ article, canModify, onBookmark }) => {
  return (
    <div className="article-meta">
      <Link to={`/@${article.author.username}`}>
        <img src={article.author.image} alt={article.author.username} />
      </Link>

      <div className="info">
        <Link to={`/@${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
      </div>

      {/* --- NEW BOOKMARK BUTTON --- */}
      <button
        className={`btn btn-sm ${article.bookmarked ? 'btn-primary' : 'btn-outline-primary'}`}
        style={{ marginRight: '8px' }}
        onClick={() => onBookmark(article.slug, article.bookmarked)}
      >
        <i className="ion-bookmark"></i>
        &nbsp;
        {article.bookmarked ? 'Bookmarked' : 'Bookmark'}
      </button>

      <ArticleActions
        canModify={canModify}
        article={article}
      />
    </div>
  );
};

export default ArticleMeta;