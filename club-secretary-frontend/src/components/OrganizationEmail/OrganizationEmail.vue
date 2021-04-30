<template>
  <div class="border border-dark rounded-lg">
    <div class="lead bg-dark text-white m-0 p-2">社群電子郵件申請表</div>
    <div class="p-2">
      <div v-if="stage == 0" class="m-2">
        <b-overlay :show="loading" rounded="sm">
          <div class="m-2">
            <b-form-input v-model="title" type="text" placeholder="郵件標題" />
          </div>
          <div class="m-2">
            <vue-simplemde v-model="content" ref="markdownEditor" />
          </div>
          <div class="mx-2 p-2 text-center">
            <hr />
            <button type="button" class="btn btn-dark" v-on:click="onSubmit">
              送出申請
            </button>
          </div>
        </b-overlay>
      </div>
      <ResultTab v-if="stage == 1" :success="success" :failure="failure" />
    </div>
    <AlertModal ref="alert-modal" title="錯誤" />
    <ConfirmModal ref="confirm-modal" @confirm="sendEmail" />
  </div>
</template>

<script>
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import ResultTab from "./ResultTab";

export default {
  data: () => ({
    stage: 0,
    title: "",
    content: "",
    loading: false,
    success: [],
    failure: [],
  }),
  components: {
    AlertModal,
    ConfirmModal,
    ResultTab,
  },
  computed: {},
  methods: {
    onSubmit() {
      this.$refs["confirm-modal"].show();
    },
    sendEmail() {
      this.loading = true;
      const payload = {
        title: this.title,
        content: this.content,
      };
      this.$fetch("/organization-email/send", payload)
        .then((result) => {
          console.log(result);
          this.stage = 1;
          this.loading = false;
          this.success = result.data.success;
          this.failure = result.data.failure;
        })
        .catch((error) => {
          this.loading = false;
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