<template>
  <b-modal v-model="display" :title="title" header-bg-variant="dangur">
    <p class="my-1" v-for="item in messageItems" :key="item">
      {{ item }}
    </p>
    <template #modal-footer>
      <div class="w-100 d-flex justify-content-center">
        <b-button variant="primary" size="md" @click="display = false">
          知道了
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Untitled Alert",
    },
  },
  data: () => ({
    display: false,
    message: "",
  }),
  methods: {
    show(message) {
      this.message = message;
      this.display = true;
    },
  },
  computed: {
    messageItems() {
      return this.message.split("\n");
    },
  },
  components: {},
};
</script>  
