<template>
  <div class="form-group w-100">
    <label for="">Nội dung</label>
    <ckeditor
      :editor="editor"
      v-model="editorData"
      :config="editorConfig"
      @input="onEditorInput"
    ></ckeditor>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import DecoupledEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  props:["valueProps"],
  setup(props, { emit }) {
    const editor = reactive(DecoupledEditor);
    const editorData = reactive("<p>Content of the editor.</p>");
    // const token = localStorage.getItem("token")
    const editorConfig = reactive({
      ckfinder: {
        uploadUrl: "http://localhost:3000/ckeditor",
      },
      toolbar: {
        items: [
          "heading",
          "|",
          "fontSize",
          "fontFamily",
          "fontColor",
          "fontBackgroundColor",
          "imageInsert",
          "|",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "highlight",
          "removeFormat",
          "|",
          "alignment",
          "|",
          "numberedList",
          "bulletedList",
          "|",
          "indent",
          "outdent",
          "|",
          "todoList",
          "link",
          "blockQuote",
          "insertTable",
          "mediaEmbed",
          "|",
          "undo",
          "redo",
          // "ckfinder",
          "imageUpload",
        ],
      },
      language: "cs",
      image: {
        toolbar: [
          "imageTextAlternative",
          "imageStyle:full",
          "imageStyle:side",
          "linkImage",
        ],
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
      licenseKey: "",
    });
    const onEditorInput = (value) => {
      emit("event-return-value", "Ckeditor", value);
    };
    return { editor, editorData, editorConfig, onEditorInput };
  },
  watch:{
    valueProps:{
      handler(val){
         this.editorData = val;
      }
    }
  },
  mounted() {
    if(this.valueProps){
      this.editorData = this.valueProps
    }
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 300px;
  max-height: 500px;
  overflow: auto;
}
</style>