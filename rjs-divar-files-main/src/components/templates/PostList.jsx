import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deletePost, getPosts } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/numbers";

import styles from "./PostList.module.css";

function PostList() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries("my-post-list"),
  });

  const { data, isPending } = useQuery({
    queryKey: ["my-post-list"],
    queryFn: getPosts,
  });
  
  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی‌های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <button onClick={() => mutate(post._id)}>پاک کردن پست</button>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
