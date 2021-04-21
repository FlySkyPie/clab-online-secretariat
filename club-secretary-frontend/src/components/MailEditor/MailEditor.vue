<template>
  <div class="border border-dark rounded-lg">
    <div class="lead bg-dark text-white m-0 p-2">社群電子郵件申請表</div>
    <div class="p-2">
      <div v-if="stage == 0" class="m-2">
        <div class="m-2">
          <b-form-input v-model="title" type="text" placeholder="郵件標題" />
        </div>
        <div class="m-2">
          <vue-simplemde v-model="content" ref="markdownEditor" />
        </div>
        <div class="mx-2 p-2 text-center">
          <hr />
          <button type="button" class="btn btn-dark" v-on:click="onSubmit">
            下一步
            <i class="fa fa-share-square-o"></i>
          </button>
        </div>
      </div>
    </div>
    <AlertModal ref="alert-modal" title="錯誤" />
  </div>
</template>

<script>
import AlertModal from "./AlertModal";

export default {
  data: () => ({
    stage: 0,
    title: "",
    content: "",
  }),
  components: {
    AlertModal,
  },
  computed: {},
  methods: {
    onSubmit() {
      const payload = {
        title: this.title,
        content: this.content,
      };
      this.$fetch("/organization-email/preview", payload)
        .then((result) => {
          this.stage = 2;
          this.added = result.data.added;
          this.removed = result.data.removed;
        })
        .catch((error) => {
          this.$refs["alert-modal"].show("網路發生錯誤\n" + error.toString());
        });
    },
    back() {
      this.file = null;
      this.stage = 0;
    },
  },
};
</script>

<style>
</style>