<template>
<div id="we">
    <m-header class="par"/>
    <!-- <img src="../assets/kl.jpg"> -->
    {{msg}}
</div>
</template>
<script>
import mHeader from "./components/m-header";
export default {
  data() {
    return {
      msg: "message"
    };
  },
  components: {
    mHeader
  }
};
</script>
<style  lang="scss" scoped>
@import "./comm.css";
#we {
  background: url("../assets/kl.jpg");
  .par {
    /deep/ .op {
      color: blue;
    }
  }
}
</style>

