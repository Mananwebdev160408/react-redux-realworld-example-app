import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';

import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  ARTICLE_BOOKMARKED,
  ARTICLE_UNBOOKMARKED
} from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const BOOKMARKED_CLASS = 'btn btn-sm btn-warning';
const NOT_BOOKMARKED_CLASS = 'btn btn-sm btn-outline-warning';

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({
      type: ARTICLE_FAVORITED,
      payload: agent.Articles.favorite(slug)
    }),

  unfavorite: slug =>
    dispatch({
      type: ARTICLE_UNFAVORITED,
      payload: agent.Articles.unfavorite(slug)
    }),

  bookmark: slug =>
    dispatch({
      type: ARTICLE_BOOKMARKED,
      payload: agent.Articles.bookmark(slug)
    }),

  unbookmark: slug =>
    dispatch({
      type: ARTICLE_UNBOOKMARKED,
      payload: agent.Articles.unbookmark(slug)
    })
});

const ArticlePreview = props => {
  const { article } = props;

  // Favorite state
  const favoriteClass = article.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  // Bookmark state
  const bookmarkClass = article.bookmarked
    ? BOOKMARKED_CLASS
    : NOT_BOOKMARKED_CLASS;

  const handleFavorite = e => {
    e.preventDefault();
    article.favorited
      ? props.unfavorite(article.slug)
      : props.favorite(article.slug);
  };

  const handleBookmark = e => {
    e.preventDefault();
    article.bookmarked
      ? props.unbookmark(article.slug)
      : props.bookmark(article.slug);
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.author.username}`}>
          <img src={article.author.image} alt={article.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.author.username}`}>
            {article.author.username}
          </Link>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="pull-xs-right" style={{ display: "flex", gap: "8px" }}>
          
          {/* Favorite */}
          <button className={favoriteClass} onClick={handleFavorite}>
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>

          {/* Bookmark */}
          <button className={bookmarkClass} onClick={handleBookmark}>
            <i className="ion-bookmark"></i>
          </button>

        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more</span>

        <ul className="tag-list">
          {article.tagList.map(tag => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(ArticlePreview);
