table: '.tbody_box .table tbody', // 表单体
CBtn: 'thead>tr>th:first input[type="checkbox"]', // 全选按钮
dC: false, //defaultCheck //默认是否选中
checkboxes: 'td:nth-of-type(1) input[type="checkbox"]',//子项check按钮
filter: null //过滤条件
使用 
var ca = checkAll({....})
ca.getValue(); //去选中的值
