import PostsReducer from "./reducer_posts";
import { reducer as formReducer } from "redux-form";

const rootReducer = { PostsReducer, form: formReducer };

export default rootReducer;
