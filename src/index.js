const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  import(
    "./hello"
    /* webpackPrefetch:true */
  ).then((res) => {
    console.log(res);
  });
});
