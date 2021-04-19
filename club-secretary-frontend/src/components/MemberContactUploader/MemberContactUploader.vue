<template>
  <div class="border border-dark rounded-lg">
    <div class="lead bg-dark text-white m-0 p-2">會員通訊錄更新申請表</div>
    <div class="p-2">
      <div v-if="stage == 0" class="m-2">
        <form>
          <label>請選擇包含人員名單的 CSV 檔</label>
          <b-form-file
            v-model="file"
            :state="stage == 1"
            accept=".csv"
            @input="onSelectedFile"
            placeholder="選擇檔案或是拖曳檔案至此..."
            drop-placeholder="拖曳檔案至此..."
            browse-text="上傳檔案"
          ></b-form-file>
        </form>
      </div>
      <div v-if="stage == 1" class="px-2">
        <table class="table table-striped table-responsive-md">
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
      <div v-if="stage == 2" class="px-2 my-2">
        <b-alert show variant="success">
          <h4 class="alert-heading">會員通訊錄更新完成</h4>
          <p>
            您的「會員通訊錄更新申請」已被行政部秘書處受理，並完成名單更新。
          </p>
          <p>
            總共有 {{ added.length }} 個人被新增至社群通訊錄，以及
            {{ removed.length }} 個人被從名單中移除。
          </p>
        </b-alert>
        <table class="table table-striped table-responsive-md">
          <thead class="table-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">新增名單</th>
              <th scope="col">移除名單</th>
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
            <img data-src="../../img/lyana-signature.png" />
          </footer>
        </blockquote>
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
    stage: 0,
    list: [],
    file: null,
    removed: [],
    added: [],
  }),
  components: {
    AlertModal,
  },
  computed: {
    resultList() {
      const size = Math.max(this.added.length, this.removed.length);
      const list = [];
      for (let i = 0; i < size; i++) {
        list.push({
          col0: i,
          col1: i < this.added.length ? this.added[i] : "",
          col2: i < this.removed.length ? this.removed[i] : "",
        });
      }

      return list;
    },
  },
  methods: {
    onSelectedFile(file) {
      if (
        !file ||
        (file.type !== "text/csv" &&
          file.type !== "text/comma-separated-values")
      ) {
        this.stage = 0;
        this.$refs["alert-modal"].show(
          "檔案格式錯誤，\n您上傳的檔案格式為: " + file.type
        );
        return;
      }
      ParsePromise(file)
        .then((list) => {
          this.list = list;
          this.stage = 1;
        })
        .catch((error) => {
          this.stage = 0;
          this.$refs["alert-modal"].show(error.toString());
        });
    },
    onSubmit() {
      const contacts = this.list.map(({ name, email }) => ({ name, email }));
      this.$fetch("/member-contacts/update", { contacts })
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