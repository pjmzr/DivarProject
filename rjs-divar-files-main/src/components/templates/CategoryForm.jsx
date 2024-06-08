import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addCategory } from "services/admin";

import styles from "./CategoryForm.module.css";

function CategoryForm() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", slug: "", icon: "" });

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: addCategory,
    onSuccess: () => queryClient.invalidateQueries("get-categories"),
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.slug || !form.icon) return;
    mutate(form);

    if (isPending) return;
    event.target[0].value = "";
    event.target[1].value = "";
    event.target[2].value = "";
  };

  return (
    <form
      onChange={changeHandler}
      onSubmit={submitHandler}
      className={styles.form}
    >
      <h3>دسته‌بندی جدید</h3>
      {!!error && <p>مشکلی پیش آمده است</p>}
      {data?.status === 201 && <p>دسته‌بندی با موفقیت اضافه شد</p>}
      <label htmlFor="name">نام دسته‌بندی</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="slug">اسلاگ</label>
      <input type="text" name="slug" id="slug" />
      <label htmlFor="icon">آیکن</label>
      <input type="text" name="icon" id="icon" />
      <button type="submit" disabled={isPending}>
        ایجاد
      </button>
    </form>
  );
}

export default CategoryForm;
