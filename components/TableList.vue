<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="header in columns" :key="header.id">
            <slot :name="`header${header.id}`">
              {{ header.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="column in columns" :key="column.id">
            <slot :name="column.id" :value="row">
              {{ row[column.id] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "columns"],
};
</script>

<style lang="scss" scoped></style>
