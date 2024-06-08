import { Link } from "react-router-dom";

import { sp } from "utils/numbers";

import styles from "./Main.module.css";

function Main({ posts }) {
  return (
    <div className={styles.container}>
      {posts.data.posts.map((post) => (
        <Link key={post._id} to={`/v/${post._id}`}>
          <div className={styles.card}>
            <div className={styles.info}>
              <p>{post.options.title}</p>
              <div>
                <p>{sp(post.amount)} تومان</p>
                <span>{post.options.city}</span>
              </div>
            </div>
            <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Main;
