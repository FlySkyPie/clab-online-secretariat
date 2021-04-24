<template>
  <b-modal
    v-model="display"
    title="你確定要送出申請表嗎？"
    header-bg-variant="dangur"
  >
    <p class="my-1">
      本版本尚未加入審核系統，電子郵件會直接寄出，本操作為不可逆。你確定要送出申請表嗎？
    </p>
    <template #modal-footer>
      <b-button variant="secondary" size="md" @click="display = false">
        取消
      </b-button>
      <b-button variant="primary" size="md" v-on:click="onConfirm">
        確認送出
      </b-button>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Untitled Modal",
    },
    //confirm: { type: Function },
  },
  data: () => ({
    display: false,
  }),
  methods: {
    show() {
      this.display = true;
    },
    onConfirm() {
      this.$emit("confirm");
      this.display = false;
    },
  },
};
</script>  
