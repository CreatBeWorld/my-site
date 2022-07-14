export default function (defaultValue = null) {
  return {
    data() {
      return {
        remoteData: defaultValue, //远程请求到的数据
        isLoading: true //是否正在加载数据中
      }
    },
    async created() {
      this.remoteData = await this.fetchData();
      this.isLoading = false;
    },
  }
}