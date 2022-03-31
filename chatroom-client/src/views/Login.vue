<template>
    <div class="view-account">
        <div class="view-account-header"></div>
        <div class="view-account-container">
            <n-form
                ref="formRef"
                label-placement="left"
                size="large"
                :model="formInline"
                :rules="rules"            
            >
                <n-form-item path="username">
                    <n-input v-model:value="formInline.username" placeholder="请输入用户名">
                    </n-input>
                </n-form-item>
                <n-form-item path="password">
                    <n-input v-model:value="formInline.password" placeholder="请输入密码">
                    </n-input>
                </n-form-item>  
                <n-form-item>
                    <n-checkbox v-model:checked="autoLogin">自动登录</n-checkbox>
                </n-form-item>
                <n-form-item>
                    <n-button type="primary" size="large" @click="submit" :loading="loading" block>登录</n-button>
                </n-form-item>
            </n-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {onMounted, reactive, ref} from 'vue'
    import router from '@/router'
    import { useUserStore } from '@/store/modules/user'
    import { login, checkToken } from '@/api/system/user';
    //import {useMessage} from 'naive-ui'

    interface FormState {
        username: string;
        password: string;
    }

    const formRef = ref();
    //const message = useMessage();
    const loading = ref(false);
    const autoLogin = ref(true);

    const store = useUserStore();

    const formInline = reactive({
        username: "user",
        password: "123456"
    });

    const rules = {
        username: {required: true, message: "请输入用户名", trigger: "blur"},
        password: {required: true, message: "请输入密码", trigger: "blur"},
    }

    const submit = (e) => {
        e.preventDefault();
        formRef.value.validate( async (error) => {
            if(!error) {
                const {username, password} = formInline;
                //message.loading("loading");
                loading.value = true;
                const param: FormState = {
                    username,
                    password
                } 

                login(param).then((res) => {
                    alert(res.data.msg);                                                                                   
                    if(!res.data.code) {
                        store.setUserName(formInline.username);
                        store.login(res.data.token);
                        router.replace('chatroom');
                    }
                });
            }else {
                message.error("请填写完整信息");
            }
        })
    }

    onMounted(() => {
        // console.log(store.getUserName);
        if(store.getToken) {
            checkToken({username: store.getUserName, token: store.getToken}).then((res) => {
                console.log(res.data.status);
                if(res.data.status) {
                    router.replace('chatroom');
                }
            })
        }
    })

</script>

<style lang="less" scoped>
    .view-account{
        display: flex;
        flex-direction: column;
        width: 100vw;
        margin:0 auto; 

        &-container {
        flex: 1;
        padding: 32px 0;
        width: 384px;
        margin: 0 auto;
        }
    }
</style>