<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column> -->
            <el-table-column
                v-for="(item, index) in this.itemAttr"
                :key="index"
                :prop="item.value"
                :label="item.name"
            ></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    props: { tableData: Array, opotionsArr: Array },
    data() {
        return {
            itemAttr: [],
        }
    },
    mounted() {
        // console.log(this.opotionsArr)
        let itemArr = Object.keys(this.tableData[0])
        itemArr.map((data, index) => {
            this.itemAttr.push({
                name: this.opotionsArr[index],
                value: data,
            })
        })
        console.log(this.itemAttr)
    },
}
</script>
