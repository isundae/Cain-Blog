<template>
  <div>
    <MdEditor
      v-model="Blogfrom.content"
      @onHtmlChanged="HtmlChange"
      @onUploadImg="onUploadImg"
    />
    <div class="BlogButtom">
      <a-drawer
        v-model:visible="visible"
        class="custom-class"
        title="博客信息"
        placement="right"
      >
        <a-form
          :model="Blogfrom"
          v-bind="{
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
          }"
          name="nest-messages"
        >
          <a-form-item label="博客标题">
            <a-input v-model:value="Blogfrom.title" />
          </a-form-item>

          <a-form-item label="Age">
            <a-upload
              v-model:file-list="fileList"
              name="file"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="http://localhost:3001/upload"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img
                v-if="imageUrl"
                :src="imageUrl"
                alt="avatar"
                class="avatar-uploader"
              />
              <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <plus-outlined v-else></plus-outlined>
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item label="选择标签">
            <a-select
              v-model:value="Blogfrom.tag"
              :options="options"
              style="width: 200px"
              @change="handleChange"
            ></a-select>
          </a-form-item>
          <a-form-item label="博客介绍">
            <a-textarea v-model:value="Blogfrom.introduce" />
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 16, offset: 8 }">
            <a-button type="primary" @click="submit(false)">Submit</a-button>
          </a-form-item>
        </a-form>
      </a-drawer>
      <a-button @click="submit(true)">草稿</a-button>
      <a-button type="primary" @click="visible = true">提交</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { Upload } from "../../service/Utils";
import { TagsFandAll } from "../../service/Tags";
import { BlogCreate, BlogFindAll, BlogsUpdate } from "../../service/Blog";
import { useRoute, useRouter } from "vue-router";
import type {
  UploadChangeParam,
  UploadProps,
  SelectProps,
} from "ant-design-vue";

interface Tag {
  name: string;
  id: string;
  superiors: any[];
  grade: string;
  create_at: Date;
  update_at: Date;
}

interface Blog {
  id?: string | string[];
  title: string;
  cover: string;
  introduce: string;
  content: string;
  htmlconten: string;
  tag: string | any;
  state: boolean;
}

const Blogfrom = reactive<Blog>({
  title: "",
  cover: "",
  introduce: "",
  content: "",
  htmlconten: "",
  tag: "",
  state: true,
});

const fileList = ref([]);
const route = useRoute();
const router = useRouter();
const loading = ref<boolean>(false);
const imageUrl = ref<string>("");
const options = ref<SelectProps>();
const routeFlag = ref<boolean>(true);

const routeFuc = async () => {
  const id:string[] | string | undefined = route.params.id;
  if (id != undefined) {
    const data = await BlogFindAll({
      search: {
        id: id,
      },
    });
    const from = ref<Blog>(data.data[0]);
    Blogfrom.id = id 
    Blogfrom.title = from.value.title;
    Blogfrom.cover = from.value.cover;
    Blogfrom.content = from.value.content;
    Blogfrom.introduce = from.value.introduce;
    Blogfrom.tag = from.value.tag?.id;
    imageUrl.value = from.value.cover;
    loading.value = false;
    routeFlag.value = true;
  }
};

const submit = async (bool: boolean) => {
  if (bool) {
    Blogfrom.state = false;
    Blogfrom.tag = "3";
  }
  if (routeFlag.value) {
    const data = await BlogsUpdate(Blogfrom);
     if (data.code != 200) {
        message.error("操作失败");
        return false
    }
  } else {
    const data = await BlogCreate(Blogfrom);
    if (data.code != 200) {
        message.error("操作失败");
        return false
    }
  }
  router.push("/blogs/list");
  message.success("操作成功");
  Blogfrom.title = "";
  Blogfrom.cover = "";
  Blogfrom.introduce = "";
  Blogfrom.content = "";
  Blogfrom.htmlconten = "";
  Blogfrom.tag = "";
  Blogfrom.state = true;
  visible.value = false;
};

const Fetch = async () => {
  const data = await TagsFandAll({
    search: {
      grade: "1",
    },
  });
  options.value = data.data.data.map((v: Tag) => ({
    label: v.name,
    options: v.superiors.map((k: Tag) => ({
      label: k.name,
      value: k.id,
    })),
  }));
};

const HtmlChange = (html: string) => {
  Blogfrom.htmlconten = html;
};

const visible = ref<boolean>();

onMounted(() => {
  Fetch();
  routeFuc();
});

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
}

const onUploadImg = async (
  files: FileList,
  callback: (urls: string[]) => void
) => {
  const res = await Promise.all(
    Array.from(files).map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData();
        form.append("file", file);
        Upload(form)
          .then((res: any) => rev(res))
          .catch((error: any) => rej(error));
      });
    })
  );

  callback(res.map((item: any) => item.data.url));
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file?.status === "uploading") {
    loading.value = true;
    return;
  }
  if (info.file?.status === "done") {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, (base64Url: string) => {
      imageUrl.value = base64Url;
      Blogfrom.cover = info.file.response.url;
      loading.value = false;
    });
  }
  if (info.file?.status === "error") {
    loading.value = false;
    message.error("upload error");
  }
};

const beforeUpload = (file: UploadProps["fileList"][number]) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
</script>

<style lang="scss" scoped>
.BlogButtom {
  height: 80px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 20px;
}
.avatar-uploader {
  width: 128px;
  height: 128px;
}
</style>
