<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { useLoading } from "vue-loading-overlay";
import { toast } from "vue3-toastify";
import axios from "axios";
import { vMaska } from "maska/vue";

interface IUserFormType {
  mail: string;
  phone_number: string;
}
const loading = useLoading();
const headers = [
  {
    title: "Name",
    key: "name",
  },
  {
    title: "Mail",
    key: "email",
  },
  {
    title: "Phone number",
    key: "number",
  },
];
const users = ref<any[]>([]);
const is_open_table = ref<boolean>(true);
const user_form = ref<IUserFormType>({
  mail: "",
  phone_number: "",
});
async function sendForm() {
  const loader = loading.show();
  try {
    const { data } = await axios.get(
      import.meta.env.VITE_APP_BALE_URL + "/search",
      {
        params: {
          mail: user_form.value.mail,
          phone_number: user_form.value.phone_number
            ? user_form.value.phone_number
                .split("(")
                .join("")
                .toString()
                .split(")")
                .join("")
                .toString()
                .split("-")
                .join("")
                .toString()
                .split("+")
                .join("")
                .toString()
            : "",
        },
      }
    );
    users.value = data.data;
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message || "Qidirishda xatolik yuz berdi!"
    );
  } finally {
    loader.hide();
  }
}
function clearData() {
  user_form.value.mail = "";
  user_form.value.phone_number = "";
  users.value = [];
}
</script>

<template>
  <div class="p-4">
    <h2>User search</h2>
    <div class="container mt-2">
      <div>
        <input
          type="text"
          placeholder="Mail"
          v-model="user_form.mail"
          @keyup.enter="sendForm"
          @keyup.esc="clearData"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone number"
          v-model="user_form.phone_number"
          @keyup.enter="sendForm"
          @keyup.esc="clearData"
          v-maska="'+998-(##)-###-##-##'"
        />
      </div>
      <div>
        <button :disabled="!user_form.mail" @click="sendForm">Apply</button>
      </div>
    </div>

    <div>
      <div class="mt-4 border border-[#DEE3DE] rounded-md p-6">
        <div class="flex items-center justify-between">
          <div class="text-[#405cf5]">Users</div>
          <div>
            <Icon
              :icon="
                is_open_table ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'
              "
              class="text-[20px] text-[#BBC0BB] cursor-pointer"
              @click="is_open_table = !is_open_table"
            />
          </div>
        </div>
        <div v-if="is_open_table" class="mt-6">
          <table v-if="users.length">
            <thead>
              <tr>
                <th
                  v-for="(header, index) of headers"
                  :key="index"
                  class="select-none"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user of users">
                <td v-for="(header, index) of headers" :key="index">
                  {{ user[header.key] }}
                </td>
              </tr>
            </tbody>
          </table>
          <div v-else class="text-sm">No data lable</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  gap: 10px;
}
input {
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #405bf591;
}
button {
  background: #405cf5;
  border-radius: 8px;
  border-width: 0;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
  padding: 10px 20px;
  transition: all 0.3s;
}
button:hover {
  background: #405bf5e3;
}
button:active {
  background: #405bf5d3;
}
button:disabled {
  background-color: #405bf598;
  cursor: not-allowed;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

th {
  text-align: center;
  color: #798179;
  font-size: 12px;
  font-weight: 400;
}

td {
  padding: 8px;
  text-align: center;
  font-weight: bolder;
  font-size: 14px;
}

tr {
  border-bottom: 8px solid #fff;
}

table {
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: -10px;
  /* correct offset on first border spacing if desired */
}

td {
  border-style: solid none;
  padding: 10px;
  background-color: #f8f8f8;
  padding: 16px;
}

td:first-child {
  border-left-style: solid;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

td:last-child {
  border-right-style: solid;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
}
</style>
