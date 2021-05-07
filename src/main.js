import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from 'primevue/config';
import CKEditor from '@ckeditor/ckeditor5-vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./directive/autocompleteBoxCss/autocompletebox.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

const app = createApp(App);

app.directive("autoCompleteMobi", {
  mounted(el, binding) {
    el.addEventListener("focus", () => {
      const mobi = document.createElement("div");
      mobi.classList.add("autocomplete-mobi");
      mobi.style.overflow = "auto";
      mobi.style.zIndex = 100;
      const body = document.getElementsByTagName("body");
      body[0].style.overflow = "hiden";
      document.body.appendChild(mobi);
      const closeMobiEvent = () => {
        mobi.classList.add("autocomplete-mobi-out");
          setTimeout(() => {
            document.body.removeChild(mobi);
          },300)
      };
      const makeCloseMobi = (title) => {
        const closeMobi = document.createElement("div");
        closeMobi.classList.add("d-flex", "justify-content-start", "w-100");
        closeMobi.innerHTML = `
                          <div class="d-flex align-items-center p-2 w-100">
                              <div id="closeMobi" class="p-2">
                                <span class="fas fa-times" style="fontSize:1.5rem"></span>
                              </div>
                              <div class="w-100 text-center">${title}</div>
                          </div>
                      `;
        mobi.appendChild(closeMobi);
        const close = document.getElementById("closeMobi");
        close.addEventListener("click", () => {
          closeMobiEvent();
        });
      };
      if (typeof binding.value === "function") {
        binding.value(el, mobi, makeCloseMobi, closeMobiEvent);
      }
    });
  },
});

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(CKEditor);
app.mount("#app");
