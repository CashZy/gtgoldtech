import { component as CkEditor } from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      CkEditor,
      ClassicEditor,
    },
  };
});
