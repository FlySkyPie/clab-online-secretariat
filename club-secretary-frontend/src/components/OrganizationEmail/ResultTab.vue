<template >
  <div class="px-2 my-2">
    <b-alert show variant="success">
      <h4 class="alert-heading">社群電子郵件寄件完成</h4>
      <p>您的「社群電子郵件申請表」已被行政部秘書處受理，並完成寄件。</p>
      <p>
        總共有 {{ success.length }} 封電子郵件成功寄出，以及
        {{ failure.length }} 封電子郵件寄件失敗。
      </p>
    </b-alert>
    <table class="table table-striped table-responsive-md">
      <thead class="table-light">
        <tr>
          <th scope="col">#</th>
          <th scope="col">成功名單</th>
          <th scope="col">失敗名單</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in resultList" :key="item.col0">
          <th scope="row">{{ item.col0 + 1 }}</th>
          <td>{{ item.col1 }}</td>
          <td>{{ item.col2 }}</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <blockquote class="blockquote text-right mb-0">
      <footer class="blockquote-footer">
        <img src="../../img/lyana-signature.png" />
      </footer>
    </blockquote>
  </div>
</template>

<script>
//import signature from '../../img/lyana-signature.png';
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Array,
      default: () => [],
    },
    failure: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
  }),
  computed: {
    resultList() {
      const size = Math.max(this.success.length, this.failure.length);
      const list = [];
      for (let i = 0; i < size; i++) {
        list.push({
          col0: i,
          col1: i < this.success.length ? this.success[i] : "",
          col2: i < this.failure.length ? this.failure[i] : "",
        });
      }

      return list;
    },
  },
};
</script>

<style>
</style>