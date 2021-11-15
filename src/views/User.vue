<template>
  <div class="member">
    <div class="header-con">
      <router-link to="/login" class="mui-navigate-right">
        <div class="user-info">
          <div class="avatar-con">
            <div class="avatar">
              <img src="../assets/img/6.jpg" alt="">
            </div>
          </div>
          <div class="person-con">
            <span>登录/注册</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style>
 .metmber {
   margin-bottom: 15px;
 }

 .header-con {
   padding: 10px;
   background: #fff;
 }
 .user-info {
   position: relative;
   overflow: hidden;
   width: 100%;
   height: 120px;
   background: linear-gradient(90deg,#28a2ff,#ffd787);
   box-shadow: 0 0.1rem 0.25rem#f8e3c6;
 }
 .acatar-con {
   position: absolute;
   left: 15px;
   top: 50%;
   transform: translateY(-50%);
 }
 .avatar {
   width: 60px;
   height: 60px;
   overflow: hidden;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 15);
   border: 1px solid hsla(0, 0%, 100%, 4);
   border-radius: 50%;
   /* margin-top: 30px; */
   margin: 30px 0 0 10px;
 }
 .avatar img {
   widows: 60px;
   height: 60px;
   margin-left: -28px;
 }
 .image-info {
   width: 100%;
   height: 100%;
 }
 .person-con {
   position: absolute;
   left: 90px;
   top: 50%;
   transform: translateY(-50%);
   color: #fff;
 }
</style>
