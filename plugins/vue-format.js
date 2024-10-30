import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("dateFormat", function (value, formatType = "DD/MM/YYYY") {
  const formatted = dayjs(value).format(formatType);

  return formatted;
});

Vue.filter("dollarFormat", function (value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
});
