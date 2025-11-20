import {
  ARTICLE_FAVORITED,
  ARTICLE_UNFAVORITED,
  ARTICLE_BOOKMARKED,
  ARTICLE_UNBOOKMARKED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED,
  PROFILE_BOOKMARKS_PAGE_LOADED,
  PROFILE_BOOKMARKS_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {

    case ARTICLE_FAVORITED:
    case ARTICLE_UNFAVORITED:
      return {
        ...state,
        articles: state.articles.map(article => {
          if (article.slug === action.payload.article.slug) {
            return {
              ...article,
              favorited: action.payload.article.favorited,
              favoritesCount: action.payload.article.favoritesCount
            };
          }
          return article;
        })
      };

    // ⭐ BOOKMARK SYSTEM
    case ARTICLE_BOOKMARKED:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.slug === action.payload.article.slug
            ? { ...article, bookmarked: true }
            : article
        )
      };

    case ARTICLE_UNBOOKMARKED:
      return {
        ...state,
        articles: state.articles.map(article =>
          article.slug === action.payload.article.slug
            ? { ...article, bookmarked: false }
            : article
        )
      };

    // Pagination
    case SET_PAGE:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: action.page
      };

    // Tag filtered page
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };

    // Home feed
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0,
        tab: action.tab
      };

    case HOME_PAGE_UNLOADED:
      return {};

    // Tabs
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };

    // Profile page
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload[1].articles,
        articlesCount: action.payload[1].articlesCount,
        currentPage: 0
      };

    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};

    // ⭐ NEW: Profile Bookmarks Page
    case PROFILE_BOOKMARKS_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        currentPage: 0
      };

    case PROFILE_BOOKMARKS_PAGE_UNLOADED:
      return {};

    default:
      return state;
  }
};