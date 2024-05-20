import moment from "moment";
import { Action } from "../Models";
import http from "../Services";
import { AppAction } from "./App.action";
export function Login(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.AUTH.LOADING });
    http
      .signIn(payload)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("x-access-token", response?.token);
          dispatch({
            type: AppAction.AUTH.SUCCESS,
            payload: response?.userDetails,
          });
          dispatch(fetchUserDetails());
        }
        dispatch({ type: AppAction.AUTH.FAILURE });
      })
      .catch((error) => {
        console.error(error);
        dispatch({ type: AppAction.AUTH.FAILURE });
      });
  };
}

export function Register(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.REGISTER.LOADING });
    http
      .signUp(payload)
      .then((response) => {
        localStorage.setItem("x-access-token", response?.token);
        dispatch({
          type: AppAction.REGISTER.SUCCESS,
          payload: response?.data?.userDetails,
        });
        dispatch(fetchUserDetails());
      })
      .catch((error) => {
        dispatch({ type: AppAction.REGISTER.FAILURE });
      });
  };
}

export function loadBlogs() {
  return (dispatch, getState) => {
    dispatch({ type: AppAction.BLOGS.LOADING });
    http
      .loadBlogs()
      .then((response) => {
        const { blogState } = getState();
        const blogs = response?.blogs?.map((itm) => {
          return {
            ...itm,
            likeCount: itm?.likes?.length ?? 0,
            isLikedByCurrentUser: itm?.likes.includes(
              blogState?.userDetails?._id
            ),
          };
        });
        dispatch({ type: AppAction.BLOGS.SUCCESS, payload: blogs });
      })
      .catch((error) => {
        dispatch({ type: AppAction.BLOGS.FAILURE });
      });
  };
}

export function signout() {
  return (dispatch, getState) => {
    dispatch({ type: AppAction.AUTH_REVOKE.LOADING });
    const timeoutId = setTimeout(() => {
      const { blogState } = getState();
      if (blogState.action.userDetails === Action.NONE) {
        localStorage.clear();
        dispatch({ type: AppAction.AUTH_REVOKE.SUCCESS });
      } else {
        dispatch({ type: AppAction.AUTH_REVOKE.FAILURE });
      }
      clearTimeout(timeoutId);
    }, 500);
  };
}

export function fetchUserDetails() {
  return (dispatch) => {
    dispatch({ type: AppAction.FETCH_USER_DETAILS.LOADING });
    http
      .fetchUserDetails()
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: AppAction.FETCH_USER_DETAILS.SUCCESS,
            payload: response?.userDetails,
          });
        } else {
          dispatch({ type: AppAction.FETCH_USER_DETAILS.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.FETCH_USER_DETAILS.FAILURE });
      });
  };
}

export function saveBlog(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.CREATE_BLOG.LOADING });
    http
      .saveBlog(payload)
      .then((response) => {
        if (response.status === 201) {
          dispatch(loadBlogs());
          dispatch({ type: AppAction.CREATE_BLOG.SUCCESS });
          const timeoutId = setTimeout(() => {
            dispatch({ type: AppAction.CREATE_BLOG.RESET });
            clearTimeout(timeoutId);
          }, 2000);
        } else {
          dispatch({ type: AppAction.CREATE_BLOG.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.CREATE_BLOG.FAILURE });
      });
  };
}

export function likeBlog(payload) {
  return (dispatch, getState) => {
    dispatch({ type: AppAction.BLOG_LIKED.SAVING });
    http
      .likeBlog(payload)
      .then((response) => {
        if (response.status === 200) {
          const data = response;
          const { blogState } = getState();
          const blogs = blogState?.blogs?.map((itm) => {
            if (itm._id === data._id) {
              return {
                ...itm,
                likes: data?.likes,
                likeCount: itm.likeCount + 1,
                isLikedByCurrentUser: itm?.likes.includes(
                  blogState?.userDetails?._id
                ),
              };
            }
            return itm;
          });
          dispatch({
            type: AppAction.BLOG_LIKED.SAVED,
            payload: blogs,
          });
        } else {
          dispatch({ type: AppAction.BLOG_LIKED.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.BLOG_LIKED.FAILURE });
      });
  };
}

export function fetchBlogDetails(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.BLOG_DETAILS.LOADING });
    http
      .fetchBlogDetails(payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: AppAction.BLOG_DETAILS.LOADED,
            payload: response.data,
          });
        } else {
          dispatch({ type: AppAction.BLOG_DETAILS.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.BLOG_DETAILS.FAILURE });
      });
  };
}

export function showToastMessage(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.TOAST_MESSAGE.SHOW, payload });
    const timeoutId = setTimeout(() => {
      dispatch({ type: AppAction.TOAST_MESSAGE.HIDE });
    }, 2000);
  };
}

export function fetchCommentDetails(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.FETCH_COMMENT.LOADING });
    http
      .fetchCommentDetails(payload)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: AppAction.FETCH_COMMENT.LOADED,
            payload: { comments: response.data, parentData: payload },
          });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.FETCH_COMMENT.FAILURE });
      });
  };
}

export function CommentAdd(payload) {
  return (dispatch, getState) => {
    dispatch({ type: AppAction.ADD_COMMENT.SAVING, payload });
    http
      .addComment(payload)
      .then((response) => {
        if (response.status === 200) {
          const { blogState } = getState();
          dispatch({ type: AppAction.ADD_COMMENT.SAVED, payload });
        } else {
          dispatch({ type: AppAction.ADD_COMMENT.FAILURE, payload });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.ADD_COMMENT.FAILURE });
      });
  };
}

export function ResetCommentStatus() {
  return (dispatch) => {
    dispatch({ type: AppAction.ADD_COMMENT.RESET });
  };
}

export function setActiveApp(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.ACTIVE_APP.SET_ACTIVE_APP, payload });
  };
}

export function saveDayTrade(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.ADD_TRADE.SAVING, payload });
    http
      .saveTradeDetails(payload)
      .then((response) => {
        if (response?.status == 201) {
          dispatch({
            type: AppAction.ADD_TRADE.SAVED,
            payload,
          });
          dispatch(fetchTrades());
        } else {
          dispatch({ type: AppAction.ADD_TRADE.FAILURE, payload });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.ADD_TRADE.FAILURE, payload });
      });
  };
}

export function fetchTrades(payload = null) {
  return (dispatch, getState) => {
    dispatch({ type: AppAction.FETCH_TRADES.LOADING });
    if (!payload) {
      const state = getState();
      payload = state?.tradeState?.filters ?? null;
    }
    http.fetchTrades(payload).then((response) => {
      const dateMap = new Map();
      response?.data?.forEach((itm) => {
        dateMap.set(moment(itm?.dateOfTrade).format("YYYY-MM-DD"), itm);
      });

      if (response.status == 200) {
        dispatch({
          type: AppAction.FETCH_TRADES.SUCCESS,
          payload: { trades: dateMap, filters: payload },
        });
      } else {
        dispatch({ type: AppAction.FETCH_TRADES.FAILURE });
      }
    });
  };
}

export function fetchProducts(payload = null) {
  return (dispatch, getState) => {
    dispatch({ type: AppAction.FETCH_PRODUCTS.LOADING });
    http
      .fetchProducts(payload)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: AppAction.FETCH_PRODUCTS.SUCCESS,
            payload: response?.data,
            productDetails: payload !== null,
          });
        } else {
          dispatch({ type: AppAction.FETCH_PRODUCTS.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.FETCH_PRODUCTS.FAILURE });
      });
  };
}

export function addProducts(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.ADD_PRODUCT.SAVING });
    http
      .addProduct(payload)
      .then((response) => {
        if (response.status == 201) {
          dispatch({ type: AppAction.ADD_PRODUCT.SAVED, payload });
          dispatch(fetchProducts());
        } else {
          dispatch({ type: AppAction.ADD_PRODUCT.FAILURE });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: AppAction.ADD_PRODUCT.FAILURE });
      });
  };
}

export function getAllTags() {
  return (dispatch) => {
    dispatch({ type: AppAction.GET_TAGS.LOADING });
    http
      .fetchTags()
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: AppAction.GET_TAGS.LOADED,
            payload: response.data,
          });
        } else {
          dispatch({ type: AppAction.GET_TAGS.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.GET_TAGS.FAILURE });
      });
  };
}

export function addTags(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.TAGS.SAVING });
    http
      .addTags(payload)
      .then((response) => {
        if (response.status == 201) {
          dispatch({ type: AppAction.TAGS.SAVED, payload: response.data });
          dispatch(getAllTags());
        } else {
          dispatch({ type: AppAction.TAGS.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.TAGS.FAILURE });
      });
  };
}

export function resetTagAddition() {
  return (dispatch) => {
    dispatch({ type: AppAction.TAGS.RESET });
  };
}

// export function addTags(payload) {
//   return (dispatch) => {
//     dispatch({ type: AppAction.TAGS.SAVING });
//     http
//       .addTags(payload)
//       .then((response) => {
//         if (response.status == 201) {
//           dispatch({ type: AppAction.TAGS.SAVED, payload: response.data });
//           dispatch(getAllTags());
//         } else {
//           dispatch({ type: AppAction.TAGS.FAILURE });
//         }
//       })
//       .catch((error) => {
//         dispatch({ type: AppAction.TAGS.FAILURE });
//       });
//   };
// }

export function removeTag(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.REMOVE_TAG.SAVING });
    http
      .removeTags(payload)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: AppAction.REMOVE_TAG.SAVED,
            payload: response.data,
          });
          dispatch(getAllTags());
        } else {
          dispatch({ type: AppAction.REMOVE_TAG.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.REMOVE_TAG.FAILURE });
      });
  };
}

export function selectTag(tag) {
  return (dispatch) => {
    dispatch({ type: AppAction.SELECT_TAG, tag });
  };
}

export function resetProductSave() {
  return (dispatch) => {
    dispatch({ type: AppAction.ADD_PRODUCT.RESET });
  };
}

export function addToCartOrWish(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.ADD_TO_CART_OR_WISH.SAVING });
    return http
      .addToCartOrWish(payload)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: AppAction.ADD_TO_CART_OR_WISH.SAVED });
        } else {
          dispatch({ type: AppAction.ADD_TO_CART_OR_WISH.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.ADD_TO_CART_OR_WISH.FAILURE });
      });
  };
}

export function fetchCartItems() {
  return (dispatch) => {
    dispatch({ type: AppAction.CART_ITEMS.LOADING });
    http
      .fetchCartItems()
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: AppAction.CART_ITEMS.LOADED,
            payload: response?.data,
          });
        } else {
          dispatch({ type: AppAction.CART_ITEMS.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.CART_ITEMS.FAILURE });
      });
  };
}

export function updateItemQuantity(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.QUANTITY_UPDATE.SAVING });
    http.updateItemQuantity(payload).then((response) => {
      if (response.status === 200) {
        dispatch({ type: AppAction.QUANTITY_UPDATE.SAVED });
        dispatch(fetchCartItems());
      } else {
        dispatch({ type: AppAction.QUANTITY_UPDATE.FAILURE });
      }
    });
  };
}

export function removeFromCart(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.REMOVE_CART_ITEM.SAVING });
    http
      .removeFromCart(payload)
      .then((response) => {
        if (response.status == 200) {
          dispatch({ type: AppAction.REMOVE_CART_ITEM.SAVED });
          dispatch(fetchCartItems());
        } else {
          dispatch({ type: AppAction.REMOVE_CART_ITEM.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.REMOVE_CART_ITEM.FAILURE });
      });
  };
}

export function fetchUserProfile() {
  return (dispatch) => {
    dispatch({ type: AppAction.PROFILE.LOADING });
    http
      .fetchUserProfile()
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: AppAction.PROFILE.LOADED, payload: response?.data });
        } else {
          dispatch({ type: AppAction.PROFILE.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.PROFILE.FAILURE });
      });
  };
}

export function saveUserProfile(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.USER_PROFILE.SAVING });
    http
      .saveUserProfile(payload)
      .then((response) => {
        if (response?.status === 201) {
          dispatch({ type: AppAction.USER_PROFILE.SAVED });
          dispatch(fetchUserProfile());
          setTimeout(() => {
            //dispatch({ type: AppAction.USER_PROFILE.RESET });
          }, 1000);
        } else {
          dispatch({ type: AppAction.USER_PROFILE.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.USER_PROFILE.FAILURE });
      });
  };
}

export function saveUserAddress(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.ADDRESS.SAVING });
    http
      .saveUserAddress(payload)
      .then((response) => {
        if (response.status === 201) {
          dispatch({ type: AppAction.ADDRESS.SAVED });
          dispatch(fetchUserProfile());
          setTimeout(() => {
            dispatch({ type: AppAction.ADDRESS.RESET }, 1000);
          });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.ADDRESS.FAILURE });
      });
  };
}

export function deleteUserAddress(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.DELETE_ADDRESS.SAVING });
    http
      .deleUserAddress(payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch(fetchUserProfile());
          dispatch({ type: AppAction.DELETE_ADDRESS.SAVED });
        } else {
          dispatch({ type: AppAction.DELETE_ADDRESS.FAILURE });
        }
      })
      .then((error) => {
        dispatch({ type: AppAction.DELETE_ADDRESS.FAILURE });
      });
  };
}

export function changePassword(payload) {
  return (dispatch) => {
    dispatch({ type: AppAction.CHANGE_PASSWORD.SAVING });

    http
      .changePassword(payload)
      .then((response) => {
        if (response.status === 200) {
          dispatch({ type: AppAction.CHANGE_PASSWORD.SAVED });
        } else {
          dispatch({ type: AppAction.CHANGE_PASSWORD.FAILURE });
        }
      })
      .catch((error) => {
        dispatch({ type: AppAction.CHANGE_PASSWORD.FAILURE });
      });
  };
}
