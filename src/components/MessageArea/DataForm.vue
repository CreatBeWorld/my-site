<template>
  <form
    class="data-form-container"
    id="data-form-container"
    ref="container"
    @submit.prevent="handleSubmit"
  >
    <div class="form-item">
      <div class="content">
        <input
          type="text"
          placeholder="用户昵称"
          maxlength="10"
          class="text"
          v-model="formData.nickname"
        />
        <span>{{ formData.nickname.length }}/10</span>
      </div>
      <div class="error">{{ error.nickname }}</div>
    </div>
    <div class="form-item">
      <div class="content textarea">
        <textarea
          placeholder="请输入内容"
          v-model="formData.content"
          maxlength="300"
          class="text text-area"
        ></textarea>
        <span>{{ formData.content.length }}/300</span>
      </div>
      <div class="error">{{ error.content }}</div>
    </div>
    <div class="form-item">
      <button :disabled="isSubmitting">
        {{ isSubmitting ? "提交中..." : "提交" }}
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "DataForm",
  data() {
    return {
      formData: {
        nickname: "",
        content: "",
      },
      error: {
        nickname: "",
        content: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      !this.formData.nickname && (this.error.nickname = "请填写昵称");
      !this.formData.content && (this.error.content = "请填写内容");
      if (!this.formData.nickname || !this.formData.content) {
        return;
      }
      this.isSubmitting = true;
      this.$emit("submit", this.formData, (successMsg,type='success') => {
        this.$showMessage({
          message: successMsg,
          type,
          duration: 1000,
          container: this.$refs.container,
          callback: () => {
            this.isSubmitting = false;
            this.formData.nickname = "";
            this.formData.content = "";
          },
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.data-form-container {
  padding-top: 20px;
}
.content {
  width: 50%;
  position: relative;
  &.textarea {
    width: 100%;
  }
  .text {
    width: 100%;
    border: 1px dashed @gray;
    padding: 15px 0 15px 15px;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    &-area {
      height: 130px;
      resize: none;
    }
    &:focus {
      border-color: @primary;
    }
  }
  span {
    position: absolute;
    color: @gray;
    font-size: 12px;
    bottom: 8px;
    right: 5px;
  }
}

.error {
  height: 30px;
  line-height: 30px;
  color: @danger;
}
button {
  padding: 10px 25px;
  border-radius: 3px;
  outline: none;
  border: none;
  background-color: @primary;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background-color: lighten(@primary, 10%);
  }
}
</style>
