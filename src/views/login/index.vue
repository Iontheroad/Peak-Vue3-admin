<template>
  <div class="login-container">
    <div class="container">
      <div
        class="drop"
        :class="{ register: actionType == 'register', forget: actionType == 'forget' }"
      >
        <div class="content">
          <h2>Peak Blog Admin</h2>
          <form>
            <div class="inputBox">
              <input type="text" v-model="formData.username" />
            </div>
            <div class="inputBox">
              <input type="password" v-model="formData.password" />
            </div>
            <div class="inputBox" @click.prevent="submit">
              <input
                type="submit"
                :value="
                  actionType == 'login'
                    ? '登录'
                    : actionType == 'register'
                      ? '注册'
                      : '修改'
                "
              />
            </div>
          </form>
        </div>
      </div>
      <div class="small-drop">
        <a
          v-if="['login', 'register'].includes(actionType)"
          href="javascript:;"
          class="btn forget"
          @click="actionType = 'forget'"
          >忘记密码
        </a>
        <a
          v-if="['register', 'forget'].includes(actionType)"
          href="javascript:;"
          class="btn login"
          @click="actionType = 'login'"
        >
          去登录
        </a>
        <a
          v-if="['login', 'forget'].includes(actionType)"
          href="javascript:;"
          class="btn signup"
          @click="actionType = 'register'"
        >
          注 册
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "Login"
});
import { ElMessage } from "element-plus";
import { reqUserLogin } from "@/api/user";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/modules/user";
import { ref, reactive } from "vue";

const router = useRouter();
const userStore = useUserStore();

let actionType = ref("login");
const formData = reactive({
  username: "peak",
  password: "123456"
});

/**
 * 提交
 */
const submit = () => {
  if (actionType.value == "login") {
    userLogin();
  } else if (actionType.value == "register") {
    // 注册
  }
};

/**
 * 用户登录
 */
async function userLogin() {
  try {
    let result = await reqUserLogin(formData);
    userStore.setToken(result.data);
    ElMessage.success("登录成功");
    userStore.getUserInfo(); // 获取用户信息
    router.push("/");
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #eff0f4;
  .container {
    position: relative;

    // left: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    // 大水滴
    .drop {
      position: relative;
      width: 350px;
      height: 350px;
      box-shadow:
        inset 20px 20px 20px rgb(0 0 0 / 5%),
        25px 35px 20px rgb(0 0 0 / 5%),
        25px 30px 30px rgb(0 0 0 / 5%),
        inset -20px -20px 25px rgb(255 255 255 / 90%);
      transition: 0.5s;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 52% 48% 33% 67% / 38% 45% 55% 62%;
      &.register {
        background: #46c4fa;
        box-shadow:
          inset 10px 10px 10px rgb(1 180 255 / 5%),
          15px 25px 10px rgb(1 180 255 / 10%),
          15px 20px 20px rgb(1 180 255 / 10%),
          inset -10px -10px 15px 10px rgb(255 255 255 / 50%);
      }
      &.forget {
        background: #c61dff;
        box-shadow:
          inset 10px 10px 10px rgb(190 1 254 / 5%),
          15px 25px 10px rgb(190 1 254 / 10%),
          15px 20px 20px rgb(190 1 254 / 10%),
          inset -10px -10px 15px rgb(255 255 255 / 50%);
      }
      &:hover {
        border-radius: 50%;
      }

      // 大水滴的两个小光点
      &::before {
        content: "";
        position: absolute;
        top: 50px;
        left: 85px;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background: #ffffff;
        opacity: 0.9;
      }
      &::after {
        content: "";
        position: absolute;
        top: 90px;
        left: 110px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #ffffff;
        opacity: 0.9;
      }

      // 大水滴主体内容
      .content {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        text-align: center;
        padding: 40px;
        gap: 15px;
        h2 {
          position: relative;
          color: #333333;
          font-size: 1.5em;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          justify-content: center;
          align-items: center;
          .inputBox {
            position: relative;
            width: 225px;
            box-shadow:
              inset 2px 5px 10px rgb(0 0 0 / 10%),
              inset -2px -5px 10px rgb(255 255 255 / 100%),
              15px 15px 10px rgb(0 0 0 / 5%),
              15px 10px 15px rgb(0 0 0 / 2.5%);
            border-radius: 25px;
            &::before {
              content: "";
              position: absolute;
              top: 8px;
              left: 50%;
              transform: translateX(-50%);
              width: 65%;
              height: 5px;
              background: rgb(255 255 255 / 50%);
              border-radius: 5px;
            }
            input {
              box-sizing: border-box;
              border: none;
              outline: none;
              background: transparent;
              width: 100%;
              font-size: 1em;
              padding: 10px 15px;
              &[type="submit"] {
                color: #ffffff;
                text-transform: uppercase;
                font-size: 1em;
                cursor: pointer;
                letter-spacing: 0.1em;
                font-weight: 500;
                text-align: center;
              }
            }
            &:last-child {
              width: 120px;
              background: #ff0f5b;
              box-shadow:
                inset 2px 5px 10px rgb(0 0 0 / 10%),
                15px 15px 10px rgb(0 0 0 / 5%),
                15px 10px 15px rgb(0 0 0 / 2.5%);
              transition: 0.5s;
            }
            &:last-child:hover {
              width: 150px;
            }
          }
        }
      }
    }

    // 忘记密码和注册水滴
    .btn {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      text-decoration: none;
      color: #ffffff;
      line-height: 1.2em;
      letter-spacing: 0.1em;
      font-size: 0.8em;
      transition: 0.25s;
      text-align: center;

      // 小光点
      &::before {
        content: "";
        position: absolute;
        top: 15px;
        left: 30px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #ffffff;
        opacity: 0.45;
      }
      &.forget {
        right: -120px;
        bottom: 0;
        width: 120px;
        height: 120px;
        background: #c61dff;
        border-radius: 44% 56% 65% 35% / 57% 58% 42% 43%;
        box-shadow:
          inset 10px 10px 10px rgb(190 1 254 / 5%),
          15px 25px 10px rgb(190 1 254 / 10%),
          15px 20px 20px rgb(190 1 254 / 10%),
          inset -10px -10px 15px rgb(255 255 255 / 50%);
      }

      // 登录水滴
      &.login {
        bottom: 150px;
        right: -120px;
        width: 80px;
        height: 80px;
        background-color: #e0e1e5;
        border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
        box-shadow:
          inset 10px 10px 10px rgb(0 0 0 / 5%),
          15px 25px 10px rgb(0 0 0 / 5%),
          15px 20px 20px rgb(0 0 0 / 5%),
          inset -10px -10px 15px rgb(255 255 255 / 90%);
        &::before {
          left: 20px;
          width: 15px;
          height: 15px;
        }
      }

      // 注册水滴
      &.signup {
        bottom: 150px;
        right: -120px;
        width: 80px;
        height: 80px;
        border-radius: 49% 51% 52% 48% / 63% 59% 41% 37%;
        background: #01b4ff;
        box-shadow:
          inset 10px 10px 10px rgb(1 180 255 / 5%),
          15px 25px 10px rgb(1 180 255 / 10%),
          15px 20px 20px rgb(1 180 255 / 10%),
          inset -10px -10px 15px rgb(255 255 255 / 50%);
        &::before {
          left: 20px;
          width: 15px;
          height: 15px;
        }
      }
      &:hover {
        border-radius: 50%;
      }
    }
  }

  // 媒体查询
  @media only screen and (width <= 768px) {
    .container {
      flex-direction: column !important;
      .small-drop {
        display: flex;
        justify-content: space-between;
        width: 100%;
      }
      .btn {
        position: unset;
      }
    }
  }
}
</style>
