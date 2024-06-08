import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteCategory, getCategory } from "services/admin";
import Loader from "../modules/Loader";

import styles from "./CategoryList.module.css";

function CategoryList() {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const { data, isPending } = useQuery({
    queryKey: ["get-categories"],
    queryFn: getCategory,
  });
  console.log({ data, isPending });
  return (
    <div className={styles.list}>
      {isPending ? (
        <Loader />
      ) : (
        data.data.map((i) => (
          <div key={i._id}>
            <img src={`${i.icon}.svg`} />
            <h5>{i.name}</h5>
            <button onClick={() => mutate(i._id)}>حذف</button>
            <p>slug: {i.slug}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CategoryList;
