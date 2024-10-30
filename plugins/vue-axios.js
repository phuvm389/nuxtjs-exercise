import Cookies from "js-cookie";

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    const token = Cookies.get("token");
    console.log("Making request to " + config);
    if (token) $axios.setHeader("Authorization", token);
  });

  $axios.onError((error) => {
    console.log("error", error);
    const code = parseInt(error.response && error.response.status);
    let originalRequest = error.config;
    if (code === 400) {
      redirect("/400");
    }

    if (code === 401) {
      originalRequest.__isRetryRequest = true;

      let refresh_token = Cookies.get("refresh_token");

      return new Promise((resolve, reject) => {
        $axios.setHeader("refreshtoken", refresh_token);
        $axios
          .get(`refresh-token`)
          .then((response) => {
            Cookies.set("token", response.data.token);
            Cookies.set("refresh_token", response.data.refresh_token);
            originalRequest.headers["Authorization"] = response.data.token;
            resolve(response);
          })
          .catch((err) => {
            reject();
          });
      })
        .then((res) => {
          return $axios(originalRequest);
        })
        .catch((e) => {
          redirect("/login");
        });
    }
  });
}
