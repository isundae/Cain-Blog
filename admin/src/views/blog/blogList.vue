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
        <a-col :span="4">col-4</a-col>
      </a-row>
    </div>
    <div class="tags-body">
      <a-table :data-source="BlogList">
        <a-table-column key="id" title="ID" data-index="id" />
        <a-table-column key="title" title="标题" data-index="title" />
        <a-table-column
          key="create_at"
          title="创建时间"
          data-index="create_at"
        />
        <a-table-column key="cover" title="封面" data-index="cover">
          <template #default="{ text: cover }">
            <img :src="cover" width="50" height="50" />
          </template>
        </a-table-column>
        <a-table-column key="introduce" title="描述" data-index="introduce" />
        <a-table-column key="tag" title="封面" data-index="tag">
          <template #default="{ text: tag }">
            {{ tag.name }}
          </template>
        </a-table-column>
        <a-table-column key="introduce" title="描述" data-index="introduce" />
        <a-table-column key="state" title="封面" data-index="state">
          <template #default="{ text: state, record }">
            <a-switch :checked="state" @change="Draft(record.id, state)" />
          </template>
        </a-table-column>
        <a-table-column key="action" title="操作">
          <template #default="{ record }">
            <span>
              <a>编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm
                title="确认删除吗，确认之后操作无法返回"
                ok-text="确认"
                cancel-text="取消"
                @confirm="BlogDelete(record.id)"
              >
                <a> 删除</a>
              </a-popconfirm>
            </span>
          </template>
        </a-table-column>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BlogFindAll, BlogsDelete, BlogsUpdate } from "../../service/Blog";
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
const params = ref();
const BlogList = ref();

const fetch = async () => {
  params.value = {
    search: {
    },
  };
  const data = await BlogFindAll(params.value);
  BlogList.value = data.data;
};

const BlogDelete = async (id: string) => {
  const data = await BlogsDelete(id);
  if (data.code == 200) {
    message.success("删除成功");
    fetch();
  }
};

const Draft = async (id: string, checked: boolean) => {
  const from = {
    id: id,
    state: !checked,
  };
  const data = await BlogsUpdate(from);
  fetch();
};

onMounted(() => {
  fetch();
});
</script>

<style lang="scss" scope>
.tagspage {
  .tags-header {
    padding-bottom: 10px;
  }
}
</style>
