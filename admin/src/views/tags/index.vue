<template>
  <div class="tagspage">
    <div class="tags-header">
      <a-row type="flex" justify="space-between">
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
      <a-row type="flex" justify="space-between">
        <a-col :span="4">
          <a-button type="primary" @click="typefuc('create')">新增</a-button>
        </a-col>
        <a-col :span="4">col-4</a-col>
      </a-row>
    </div>
    <div class="tags-body">
      <a-table
        :data-source="TagsList"
        childrenColumnName="superiors"
        :pagination="pagination"
        @change="change"
      >
        <a-table-column key="id" title="ID" data-index="id" />
        <a-table-column key="name" title="标签" data-index="name" />
        <a-table-column
          key="create_at"
          title="创建时间"
          data-index="create_at"
        />
        <a-table-column key="action" title="操作">
          <template #default="{ record }">
            <span>
              <a
                v-if="record.superiors"
                @click="typefuc('createtags', '', record.id)"
                >创建子菜单</a
              >
              <a-divider type="vertical" />
              <a @click="typefuc('update', record.name, record.id)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认删除吗，确认之后操作无法返回"
                ok-text="确认"
                cancel-text="取消"
                @confirm="DeleteTag(record.id)"
              >
                <a> 删除</a>
              </a-popconfirm>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
    <div>
      <a-modal
        v-model:visible="visibleCreate"
        title="新增标签"
        okText="确认"
        cancelText="取消"
        @ok="TagsType()"
      >
        <a-form-item label="标签名称">
          <a-input v-model:value="tagvalue" />
        </a-form-item>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  TagsCreate,
  TagsFandAll,
  TagDelete,
  TagUpdate,
} from "../../service/Tags";
import { message } from "ant-design-vue";

interface Pagination {
  page: string;
  total: number;
}

interface Params {
  search: any;
  limit?: string;
  page: string;
}

const visibleCreate = ref<boolean>(false);
const tagvalue = ref<string | undefined>("");
const typevalue = ref<string>("");
const TagsList = ref();
const tagid = ref<string | undefined>("");
const pagination = ref<Pagination>({
  total: 10,
  page: "1",
});
const params = ref<Params>();
const Fetch = async () => {
  const data = await TagsFandAll(params.value);
  TagsList.value = data.data.data;
  pagination.value.total = data.data.totol;
};

const TagsType = () => {
  if (tagvalue.value != "") {
    if (typevalue.value == "create") {
      CreateTag();
    } else if (typevalue.value == "update") {
      UpdateTag();
    } else if (typevalue.value == "createtags") {
      CreateTags();
    }
  } else {
    message.info("标签名称未输入");
  }
};

const CreateTag = async () => {
  const data = await TagsCreate({
    name: tagvalue.value,
    grade: "1",
  });
  if (data.data.code == 200) {
    message.success("创建成功");
    tagvalue.value = "";
    Fetch();
    visibleCreate.value = false;
  }
};

const DeleteTag = async (id: string) => {
  const data = await TagDelete(id);
  if (data.data.code == 200) {
    message.success("删除成功");
    Fetch();
  } else {
    message.warn("删除失败");
  }
};

const UpdateTag = async () => {
  const data = await TagUpdate({
    id: tagid.value,
    name: tagvalue.value,
  });
  if (data.data.code == 200) {
    message.success("修改成功");
    Fetch();
    visibleCreate.value = false;
    tagvalue.value = "";
    tagid.value = "";
  } else {
    message.warn("删除失败");
  }
};

const CreateTags = async () => {
  const data = await TagsCreate({
    name: tagvalue.value,
    grade: "2",
    superiorsid: tagid.value,
  });
  if (data.data.code == 200) {
    message.success("创建成功");
    tagvalue.value = "";
    Fetch();
    visibleCreate.value = false;
  }
};

const typefuc = (str: string, name?: string, id?: string) => {
  typevalue.value = str;
  visibleCreate.value = true;
  tagvalue.value = name;
  tagid.value = id;
};

const change = (e: any) => {
  params.value = {
    search: {
      grade: "1",
    },
    page: e.current,
  };
  Fetch();
};

onMounted(() => {
  params.value = {
    search: {
      grade: "1",
    },
    page: "1",
  };
  Fetch();
});
</script>

<style lang="scss" scope>
.tagspage {
  .tags-header {
    padding-bottom: 10px;
  }
}
</style>
