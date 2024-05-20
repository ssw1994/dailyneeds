import { Action } from "../Models";
import { AppAction } from "./App.action";
import { allTags } from "./App.selector";
const initialState = {
  userDetails: null,
  blogs: null,
  blog: null,
  blogDetails: null,
  toastMessage: null,
  comments: {},
  activeApp: null,
  allTags: [],
  loading: false,
  profileInfo: null,
  action: {
    signout: Action.NONE,
    register: Action.NONE,
    userDetails: Action.NONE,
    blogs: Action.NONE,
    blog: Action.NONE,
    create: Action.NONE,
    blogDetails: Action.NONE,
    comments: null,
    allTags: Action.NONE,
    tagAddition: Action.NONE,
    tagRemoval: Action.NONE,
    profileInfo: Action.NONE,
    address: Action.NONE,
    profile: Action.NONE,
    passwordChange: Action.NONE,
  },
};
export default function (state = initialState, action) {
  console.log(action, JSON.stringify(state));
  switch (action.type) {
    case AppAction.FETCH_USER_DETAILS.LOADING:
    case AppAction.AUTH.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          userDetails: Action.LOADING,
        },
      };
    }
    case AppAction.FETCH_USER_DETAILS.SUCCESS:
    case AppAction.AUTH.SUCCESS: {
      return {
        ...state,
        userDetails: action.payload,
        action: {
          ...state.action,
          userDetails: Action.SUCCESS,
        },
      };
    }
    case AppAction.FETCH_USER_DETAILS.FAILURE:
    case AppAction.AUTH.FAILURE: {
      return {
        ...state,
        userDetails: action.payload,
        action: {
          ...state.action,
          userDetails: Action.ERROR,
        },
      };
    }
    case AppAction.REGISTER.LOADING: {
      return {
        ...state,
        userDetails: null,
        action: {
          ...state.action,
          register: Action.LOADING,
          userDtails: Action.LOADING,
        },
      };
    }
    case AppAction.REGISTER.SUCCESS: {
      return {
        ...state,
        userDetails: action.payload,
        action: {
          ...state.action,
          register: Action.SUCCESS,
          userDtails: Action.LOADING,
        },
      };
    }
    case AppAction.REGISTER.FAILURE: {
      return {
        ...state,
        userDetails: action.payload,
        action: {
          ...state.action,
          register: Action.ERROR,
          userDtails: Action.ERROR,
        },
      };
    }
    case AppAction.BLOGS.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          blogs: Action.LOADING,
        },
      };
    }
    case AppAction.BLOGS.SUCCESS: {
      return {
        ...state,
        blogs: action.payload,
        action: {
          ...state.action,
          blogs: Action.SUCCESS,
        },
      };
    }
    case AppAction.BLOGS.FAILURE: {
      return {
        ...state,
        blogs: [],
        action: {
          ...state.action,
          blogs: Action.ERROR,
        },
      };
    }
    case AppAction.BLOG.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          blog: Action.LOADING,
        },
      };
    }
    case AppAction.BLOG.SUCCESS: {
      return {
        ...state,
        blog: action.payload,
        action: {
          ...state.action,
          blog: Action.SUCCESS,
        },
      };
    }
    case AppAction.BLOG.FAILURE: {
      return {
        ...state,
        blog: null,
        action: {
          ...state.action,
          blog: Action.FAILURE,
        },
      };
    }
    case AppAction.AUTH_REVOKE.LOADING: {
      return {
        ...initialState,
        action: {
          ...initialState.action,
          signout: Action.LOADING,
        },
      };
    }
    case AppAction.AUTH_REVOKE.SUCCESS: {
      return {
        ...state,
        action: {
          ...state.action,
          signout: Action.SUCCESS,
        },
      };
    }
    case AppAction.AUTH_REVOKE.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          signout: Action.FAILURE,
        },
      };
    }

    case AppAction.CREATE_BLOG.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          create: Action.LOADING,
        },
      };
    }
    case AppAction.CREATE_BLOG.SUCCESS: {
      return {
        ...state,
        action: {
          ...state.action,
          create: Action.SUCCESS,
        },
      };
    }
    case AppAction.CREATE_BLOG.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          create: Action.FAILURE,
        },
      };
    }
    case AppAction.CREATE_BLOG.RESET: {
      return {
        ...state,
        action: {
          ...state.action,
          create: Action.NONE,
        },
      };
    }
    case AppAction.BLOG_LIKED.SAVED: {
      return {
        ...state,
        blogs: action.payload,
        action: {
          ...state.action,
        },
      };
    }
    case AppAction.BLOG_DETAILS.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          blogDetails: Action.LOADING,
        },
      };
    }
    case AppAction.BLOG_DETAILS.LOADED: {
      return {
        ...state,
        blogDetails: action.payload,
        action: {
          ...state.action,
          blogDetails: Action.SUCCESS,
        },
      };
    }
    case AppAction.BLOG_DETAILS.FAILURE: {
      return {
        ...state,
        blogDetails: null,
        action: {
          ...state.action,
          blogDetails: Action.ERROR,
        },
      };
    }

    case AppAction.TOAST_MESSAGE.SHOW: {
      return {
        ...state,
        toastMessage: action?.payload,
      };
    }
    case AppAction.TOAST_MESSAGE.HIDE: {
      return {
        ...state,
        toastMessage: null,
      };
    }
    case AppAction.ADD_COMMENT.SAVING: {
      const id = action?.payload?.blogId || action?.payload?.parentId;
      return {
        ...state,
        action: {
          ...state.action,
          comments: {
            [id]: Action.LOADING,
          },
        },
      };
    }
    case AppAction.ADD_COMMENT.SAVED: {
      const id = action?.payload?.blogId || action?.payload?.parentId;
      return {
        ...state,
        action: {
          ...state.action,
          comments: { [id]: Action.SUCCESS },
        },
      };
    }
    case AppAction.ADD_COMMENT.FAILURE: {
      const id = action?.payload?.blogId || action?.payload?.parentId;
      return {
        ...state,
        action: {
          ...state.action,
          comments: { [id]: Action.FAILURE },
        },
      };
    }
    case AppAction.ADD_COMMENT.RESET: {
      return {
        ...state,
        action: {
          ...state.action,
          comments: null,
        },
      };
    }
    case AppAction.FETCH_COMMENT.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
        },
      };
    }
    case AppAction.FETCH_COMMENT.LOADED: {
      const comments = state.comments ? state.comments : {};
      if (comments && typeof comments === "object") {
        const id =
          action?.payload?.parentData?.blogId ||
          action?.payload?.parentData?.parentId;
        comments[id] = action.payload.comments;
      }
      return {
        ...state,
        comments,
        action: {
          ...state.action,
          comments: Action.SUCCESS,
        },
      };
    }
    case AppAction.FETCH_COMMENT.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          comments: Action.ERROR,
        },
      };
    }
    case AppAction.ACTIVE_APP.SET_ACTIVE_APP: {
      return {
        ...state,
        activeApp: action?.payload,
      };
    }
    case AppAction.TAGS.SAVING: {
      return {
        ...state,
        action: {
          ...state.action,
          tagAddition: Action.LOADING,
        },
      };
    }
    case AppAction.TAGS.SAVED: {
      return {
        ...state,
        action: {
          ...state.action,
          tagAddition: Action.SUCCESS,
        },
      };
    }
    case AppAction.TAGS.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          tagAddition: Action.ERROR,
        },
      };
    }

    case AppAction.TAGS.RESET: {
      return {
        ...state,
        action: {
          ...state.action,
          tagAddition: Action.NONE,
        },
      };
    }

    case AppAction.REMOVE_TAG.SAVING: {
      return {
        ...state,
        action: {
          ...state.action,
          tagRemoval: Action.LOADING,
        },
      };
    }
    case AppAction.REMOVE_TAG.SAVED: {
      return {
        ...state,
        action: {
          ...state.action,
          tagRemoval: Action.SUCCESS,
        },
      };
    }
    case AppAction.REMOVE_TAG.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          tagRemoval: Action.ERROR,
        },
      };
    }

    case AppAction.TAGS.RESET: {
      return {
        ...state,
        action: {
          ...state.action,
          tagRemoval: Action.NONE,
        },
      };
    }

    case AppAction.GET_TAGS.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          allTags: Action.LOADING,
        },
      };
    }
    case AppAction.GET_TAGS.LOADED: {
      return {
        ...state,
        allTags: [...action.payload],
        action: {
          ...state.action,
          allTags: Action.SUCCESS,
        },
      };
    }
    case AppAction.GET_TAGS.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          allTags: Action.ERROR,
        },
      };
    }

    case AppAction.SELECT_TAG: {
      return {
        ...state,
        allTags: [
          ...state.allTags.map((tag) => {
            if (tag._id === action?.tag?._id) {
              return {
                ...tag,
                selected: !tag.selected,
              };
            }
            return { ...tag };
          }),
        ],
      };
    }
    case AppAction.LOADER.SHOW: {
      return {
        ...state,
        loading: true,
      };
    }
    case AppAction.LOADER.HIDE: {
      return {
        ...state,
        loading: false,
      };
    }
    case AppAction.PROFILE.LOADING: {
      return {
        ...state,
        action: {
          ...state.action,
          profileInfo: Action.LOADING,
        },
      };
    }
    case AppAction.PROFILE.LOADED: {
      return {
        ...state,
        profileInfo: action.payload,
        action: {
          ...state.action,
          profileInfo: Action.SUCCESS,
        },
      };
    }
    case AppAction.PROFILE.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          profileInfo: Action.ERROR,
        },
      };
    }
    case AppAction.USER_PROFILE.SAVING: {
      return {
        ...state,
        action: {
          ...state.action,
          profile: Action.NONE,
        },
      };
    }
    case AppAction.USER_PROFILE.SAVED: {
      return {
        ...state,
        action: {
          ...state.action,
          profile: Action.SUCCESS,
        },
      };
    }
    case AppAction.USER_PROFILE.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          profile: Action.ERROR,
        },
      };
    }
    case AppAction.USER_PROFILE.RESET: {
      return {
        ...state,
        action: {
          ...state.action,
          profile: Action.NONE,
        },
      };
    }
    case AppAction.ADDRESS.SAVING: {
      return {
        ...state,
        action: {
          ...state.action,
          address: Action.NONE,
        },
      };
    }
    case AppAction.ADDRESS.SAVED: {
      return {
        ...state,
        action: {
          ...state.action,
          address: Action.SUCCESS,
        },
      };
    }
    case AppAction.ADDRESS.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          address: Action.ERROR,
        },
      };
    }
    case AppAction.ADDRESS.RESET: {
      return {
        ...state,
        action: {
          ...state.action,
          address: Action.NONE,
        },
      };
    }
    case AppAction.CHANGE_PASSWORD.SAVING: {
      return {
        ...state,
        action: {
          ...state.action,
          passwordChange: Action.LOADING,
        },
      };
    }
    case AppAction.CHANGE_PASSWORD.SAVED: {
      return {
        ...state,
        action: {
          ...state.action,
          passwordChange: Action.SUCCESS,
        },
      };
    }
    case AppAction.CHANGE_PASSWORD.FAILURE: {
      return {
        ...state,
        action: {
          ...state.action,
          passwordChange: Action.ERROR,
        },
      };
    }
    default:
      return { ...state };
  }
}
