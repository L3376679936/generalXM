import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

/**
 * 表格导出为Excel
 * @param {Object} options - 导出配置
 * @param {Array} options.data - 表格数据数组
 * @param {Array} options.columns - 列配置 [{ label: '表头', prop: '字段名' }]
 * @param {String} options.filename - 导出文件名，默认'表格数据'
 * @param {Boolean} options.autoWidth - 是否自动调整列宽，默认true
 * @param {Function} options.formatter - 单元格格式化函数 (row, column) => value
 */
export function exportTableToExcel(options) {
  // 默认配置
  const {
    data = [],
    columns = [],
    filename = '表格数据',
    autoWidth = true,
    formatter
  } = options

  // 处理数据，转换为Excel所需格式
  const excelData = data.map(row => {
    const item = {}
    columns.forEach(column => {
      // 支持自定义格式化
      if (formatter) {
        item[column.label] = formatter(row, column)
      } else {
        // 支持嵌套字段，如 'user.name'
        item[column.label] = column.prop.split('.').reduce((obj, key) => {
          return obj ? obj[key] : ''
        }, row)
      }
    })
    return item
  })

  // 创建工作簿和工作表
  const worksheet = XLSX.utils.json_to_sheet(excelData)
  
  // 自动调整列宽
  if (autoWidth) {
    /* 获取worksheet的每一列的最大宽度 */
    const arr = columns.map(col => col.label)
    excelData.forEach(row => {
      columns.forEach(col => {
        arr.push(row[col.label] ? String(row[col.label]) : '')
      })
    })
    
    const wscols = arr.map(title => {
      return {
        wch: Math.max(title.length * 2, 10) // 最小宽度10
      }
    })
    
    worksheet['!cols'] = wscols
  }

  // 创建工作簿并添加工作表
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1')

  // 生成Excel文件并下载
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(blob, `${filename}.xlsx`)
}

/**
 * 从Element UI表格组件直接导出
 * @param {Object} tableRef - Element UI表格的ref对象
 * @param {String} filename - 导出文件名
 */
export function exportElTable(tableRef, filename = '表格数据') {
  if (!tableRef) {
    console.error('请传入表格的ref对象')
    return
  }

  // 获取表格数据
  const data = tableRef.data || []
  // 获取列配置
  const columns = tableRef.columns
    .filter(col => !col.hidden)
    .map(col => ({
      label: col.label,
      prop: col.property
    }))

  // 调用通用导出方法
  exportTableToExcel({
    data,
    columns,
    filename
  })
}
