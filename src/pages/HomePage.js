import PostsList from "../posts/PostsList/PostsList";
import PostsAddForm from "../posts/PostsAddForm/PostsAddForm";

const HomePage = () => {
    return (
        <div>
            <PostsAddForm/>
            <h2 className="title">Посты</h2>
            <PostsList/>
        </div>
    )
}

export default HomePage;