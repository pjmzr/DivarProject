import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { checkOtp } from "services/auth";
import { getProfile } from "services/user";
import { setCookie } from "utils/cookie";

import styles from "./CheckOtpForm.module.css"

function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const submitHandler = async (event) => {
    event.preventDefault();

    if (code.length !== 5) return;

    const { res, error } = await checkOtp(mobile, code);

    if (res) {
      setCookie(res.data);
      navigate("/");
      refetch()
    }
    if (error) console.log(error.response.data.message);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره‌ی «{mobile}» را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
    </form>
  );
}

export default CheckOtpForm;
