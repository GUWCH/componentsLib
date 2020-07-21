<template>
    <div>
        <el-upload
            ref="upload"
            action="/"
            :show-file-list="false"
            :on-change="importExcel"
            :auto-upload="false"
        >
            <el-button
                slot="trigger"
                icon="el-icon-upload"
                size="small"
                type="primary"
            >
                上传文件
            </el-button>
        </el-upload>
    </div>
</template>
<script>
import XLSX from 'xlsx'

export default {
    data() {
        return {}
    },
    methods: {
        importExcel(file) {
            // let file = file.files[0] // 使用传统的input方法需要加上这一步
            const types = file.name.split('.')[1]
            const fileType = [
                'xlsx',
                'xlc',
                'xlm',
                'xls',
                'xlt',
                'xlw',
                'csv',
            ].some(item => item === types)
            if (!fileType) {
                this.$message('格式错误！请重新选择')
                return
            }
            this.file2Xce(file).then(tabJson => {
                if (tabJson && tabJson.length > 0) {
                    this.xlsxJson = tabJson
                    console.log('数据', this.xlsxJson)
                    // xlsxJson就是解析出来的json数据,数据格式如下
                    // [
                    //   {
                    //     sheetName: sheet1
                    //     sheet: sheetData
                    //   }
                    // ]
                }
            })
        },
        file2Xce(file) {
            return new Promise(function(resolve) {
                const reader = new FileReader()
                reader.onload = function(e) {
                    const data = e.target.result
                    this.wb = XLSX.read(data, {
                        type: 'binary',
                    })
                    const result = []
                    this.wb.SheetNames.forEach(sheetName => {
                        result.push({
                            sheetName: sheetName,
                            sheet: XLSX.utils.sheet_to_json(
                                this.wb.Sheets[sheetName]
                            ),
                        })
                    })
                    resolve(result)
                }
                reader.readAsBinaryString(file.raw)
                // reader.readAsBinaryString(file) // 传统input方法
            })
        },
    },
}
</script>
