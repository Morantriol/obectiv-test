<template>
  <table cellspacing="0" border="0">
    <thead>
      <tr>
        <th v-for="col in COLUMNS" :key="col.name">
          <div class="title-wrapper">
            <button class="table-title" @click="sortBy(col)">
              {{ col.title }}
            </button>
            <div class="arrows-wrapper">
              <SortArrow
                class="sort-arrow sort-arrow--up"
                :active="
                  col.name === sortOptions.column?.name && !sortOptions.reverse
                "
                upend
                @click="sortBy(col)"
              />
              <SortArrow
                class="sort-arrow sort-arrow--down"
                :active="
                  col.name === sortOptions.column?.name && sortOptions.reverse
                "
                @click="sortBy(col, true)"
              />
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in sortedRows" :key="row.id">
        <td v-for="col in COLUMNS" :key="col.name">
          {{ col.output?.(row[col.name]) ?? row[col.name] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { type Items, ITEMS } from "@/mocks/tableData";
import { getISODate } from "@/utils/getISODate";

import SortArrow from "@/components/icons/SortArrow.vue";

interface Column {
  name: string;
  title: string;
  type: string;
  output?: (ISODate: string) => string;
}

const COLUMNS: Column[] = [
  { name: "number", title: "Номер", type: "number" },
  { name: "developer", title: "Девелопер", type: "string" },
  {
    name: "deadline",
    title: "Срок",
    type: "date",
    output: (date) => getISODate(date),
  },
  { name: "type", title: "Тип", type: "string" },
  { name: "floor", title: "Этаж", type: "number" },
  { name: "square", title: "Площадь", type: "number" },
];

let sortOptions = ref<{ column: null | Column; reverse: boolean }>({
  column: null,
  reverse: false,
});

const sortFunctions = {
  number: (a: number, b: number) => a - b,
  string: (a: string, b: string) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  date: (a: string, b: string) => {
    const date1 = new Date(a).getTime();
    const date2 = new Date(b).getTime();

    return date1 - date2;
  },
};

let sortedRows = ref<Items[]>([...ITEMS]);

const sortBy = (column: Column, reverse = false) => {
  const isSameColumn = sortOptions?.value?.column?.name === column?.name;
  sortOptions.value = {
    column,
    reverse: isSameColumn ? !sortOptions.value.reverse : reverse,
  };
  const key = sortOptions.value.column?.name;
  const sort = sortFunctions[sortOptions.value.column?.type];

  sortedRows.value = sort
    ? [...ITEMS].sort(
        (a, b) => sort(a[key], b[key]) * (sortOptions.value.reverse ? -1 : 1),
      )
    : ITEMS;
};
</script>

<style scoped lang="scss">
table {
  display: block;
  overflow-x: scroll;
  max-height: 600px;
}

thead {
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgb(171, 219, 255);
}

tbody tr:nth-child(2n) {
  background-color: rgb(238, 238, 238);
}

th,
td {
  padding: 10px 15px;
}

tbody {
  overflow-x: scroll;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.table-title {
  min-width: 100px;
  text-align: left;
}

.arrows-wrapper {
  display: flex;
  flex-direction: column;
  padding-left: 5px;
}

.sort-arrow {
  cursor: pointer;
}
</style>
