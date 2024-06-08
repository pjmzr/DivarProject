const setCookie = (tokens) => {
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${
    1 * 24 * 60 * 60
  }`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * 24 * 60 * 60
  }`;
};

const getCookie = (cookieName) => {
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName)
    ?.split("=")[1];
};

const deleteCookie = () => {
  document.cookie = "accessToken=;max-age=0";
  document.cookie = "refreshToken=;max-age=0";
};

export { setCookie, getCookie, deleteCookie };
