<template>
  <CkEditor :editor="ClassicEditor" v-model="value" :config="editorConfig" />
</template>

<script setup>
const { $CkEditor: CkEditor, $ClassicEditor: ClassicEditor } = useNuxtApp();

const { modelValue } = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const editorConfig = ref({
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
  ],
  heading: {
    options: [
      { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
      {
        model: "heading1",
        view: "h1",
        title: "Heading 1",
        class: "ck-heading_heading1",
      },
      {
        model: "heading2",
        view: "h2",
        title: "Heading 2",
        class: "ck-heading_heading2",
      },
    ],
  },
  // extraPlugins: [uploader],
});
</script>

<style>
.ck-content {
  min-height: 200px;
}
</style>
