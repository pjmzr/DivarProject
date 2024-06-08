import styles from "./Sidebar.module.css";

function Sidebar({ categories }) {
  
  return (
    <div className={styles.sidebar}>
      <h4>دسته‌ها</h4>
      <ul>
        {categories.data.map((cat) => (
          <li key={cat._id}>
            <img src={`${cat.icon}.svg`} />
            <p>{cat.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
