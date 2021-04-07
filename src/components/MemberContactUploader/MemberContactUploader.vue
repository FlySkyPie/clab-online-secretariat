<template>
  <div class="border border-dark rounded-lg">
    <div class="lead bg-dark text-white m-0 p-2">會員通訊錄更新申請表</div>
    <div class="p-2">
      <div v-if="!passed" class="m-5">
        <form>
          <label>請選擇包含人員名單的 CSV 檔</label>
          <b-form-file
            v-model="file"
            :state="passed"
            accept=".csv"
            @input="onSelectedFile"
            placeholder="選擇檔案或是拖曳檔案至此..."
            drop-placeholder="拖曳檔案至此..."
            browse-text="上傳檔案"
          ></b-form-file>
        </form>
      </div>
      <div v-if="passed" class="px-5">
        <table class="table table-striped">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">姓名</th>
              <th scope="col">email</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <th scope="row">{{ item.id + 1 }}</th>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </tbody>
        </table>
        <div class="mx-2 p-2 text-center">
          <hr />
          請確認資料無誤後再按下「確定送出」
          <div class="my-2">
            <button type="button" v-on:click="back" class="btn btn-dark m-1">
              返回上一步
            </button>
            <button
              type="button"
              v-on:click="onSubmit"
              class="btn btn-dark m-1"
            >
              確定送出
            </button>
          </div>
        </div>
      </div>
    </div>
    <AlertModal ref="alert-modal" title="錯誤" />
  </div>
</template>

<script>
import AlertModal from "./AlertModal";
import ParsePromise from "./ParsePromise";

export default {
  data: () => ({
    passed: false,
    list: [],
    file: null,
  }),
  components: {
    AlertModal,
  },
  methods: {
    onSelectedFile(file) {
      if (
        !file ||
        (file.type !== "text/csv" &&
          file.type !== "text/comma-separated-values")
      ) {
        this.passed = false;
        this.$refs["alert-modal"].show(
          "檔案格式錯誤，\n您上傳的檔案格式為: " + file.type
        );
        return;
      }

      ParsePromise(file)
        .then((list) => {
          this.list = list;
          this.passed = true;
        })
        .catch((error) => {
          this.passed = false;
          this.$refs["alert-modal"].show(error.toString());
        });
    },
    onSubmit() {},
    back() {
      this.file = null;
      this.passed = false;
    },
  },
};
</script>

<style>
</style>