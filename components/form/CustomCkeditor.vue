<template>
  <div v-if="isloaded == true">
    <ckeditor
      :editor="editor"
      :config="{ extraPlugins: [uploadPlugin] }"
      :value="value"
      @input="(event) => $emit('input', event)"
    />
  </div>
</template>
<script>
// https://blowstack.com/blog/ckeditor-5-nuxt-integration/
let ClassicEditor;
let CKEditor;
let VMaxios;

if (process.client) {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
  CKEditor = require("@ckeditor/ckeditor5-vue2");
} else {
  CKEditor = { component: { template: "<div></div>" } };
}

export default {
  components: {
    ckeditor: CKEditor.component,
  },
  props: ["value"],
  data() {
    return {
      isloaded: false,
      editor: ClassicEditor,
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  mounted() {
    console.log("2", this.$axios);
    VMaxios = this.$axios;
    this.isloaded = true;
  },
  methods: {
    uploadPlugin: function (editor) {
      // const axios = this;
      console.log("1", VMaxios);
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return {
          upload: () => {
            // console.log("2", axios);
            return new Promise((resolve, reject) => {
              const body = new FormData();
              loader.file.then((file) => {
                body.append("media", file);
                body.append("title", file.name);
                VMaxios.$post("/media", body)
                  .then((res) => {
                    console.log("finished", res);
                    resolve({
                      default: `${res.url}`,
                    });
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            });
          },
        };
      };
    },
  },
};
</script>
