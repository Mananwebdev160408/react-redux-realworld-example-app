import React from 'react';
import { connect } from 'react-redux';
import ArticleList from './ArticleList';
import agent from '../agent';
import {
  PROFILE_BOOKMARKS_PAGE_LOADED,
  PROFILE_BOOKMARKS_PAGE_UNLOADED,
  SET_PAGE
} from '../constants/actionTypes';

class ProfileBookmarks extends React.Component {
  componentWillMount() {
    const username = this.props.match.params.username;
    this.props.onLoad(
      username,
      agent.Articles.byBookmarked(username, 0)
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const { pager, articles, articlesCount, currentPage } = this.props;

    return (
      <div className="profile-page">
        <div className="container page">
          <div className="row">

            {/* LEFT PANEL USER PROFILE CAN BE ADDED IF NEEDED */}

            <div className="col-xs-12 col-md-10 offset-md-1">
              <h2>Bookmarked Articles</h2>

              <ArticleList
                articles={articles}
                pager={pager}
                articlesCount={articlesCount}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser
});

const mapDispatch = dispatch => ({
  onLoad: (username, payload) =>
    dispatch({
      type: PROFILE_BOOKMARKS_PAGE_LOADED,
      payload,
      pager: (page) => agent.Articles.byBookmarked(username, page)
    }),
  onUnload: () =>
    dispatch({ type: PROFILE_BOOKMARKS_PAGE_UNLOADED }),
  onSetPage: (page, payload) =>
    dispatch({ type: SET_PAGE, page, payload })
});

export default connect(mapState, mapDispatch)(ProfileBookmarks);
