const data = [
  { id: "02", name: "小亮", pid: "01", job: "产品leader" },
  { id: "01", name: "张大大", pid: "", job: "项目经理" },
  { id: "03", name: "小美", pid: "01", job: "UIleader" },
  { id: "04", name: "老马", pid: "01", job: "技术leader" },
  { id: "05", name: "老王", pid: "01", job: "测试leader" },
  { id: "06", name: "老李", pid: "01", job: "运维leader" },
  { id: "07", name: "小丽", pid: "02", job: "产品经理" },
  { id: "08", name: "大光", pid: "02", job: "产品经理" },
  { id: "09", name: "小高", pid: "03", job: "UI设计师" },
  { id: "10", name: "小刘", pid: "04", job: "前端工程师" },
  { id: "11", name: "小华", pid: "04", job: "后端工程师" },
  { id: "12", name: "小李", pid: "04", job: "后端工程师" },
  { id: "13", name: "小赵", pid: "05", job: "测试工程师" },
  { id: "14", name: "小强", pid: "05", job: "测试工程师" },
  { id: "15", name: "小涛", pid: "06", job: "运维工程师" },
];

// 方法一
// 使用递归来查找父级节点，添加元素
const treeData = arrayToTree(data);

function arrayToTree(data) {
  let tree = [];

  if (!Array.isArray(data)) {
    return data;
  }
  let copyArr = copy(data);
  data.forEach((item, index) => {
    if (!item.pid) {
      return tree.push(newObj(item));
    }
    const obj = getChildren(item, tree);
    if (obj) {
      obj.children.push(newObj(item));
    }
  });
  console.log(copyArr);
  return tree;
}
// 根据扁平数组对象生成树形对象
function newObj(item) {
  return {
    id: item.id,
    label: item.name,
    children: [],
    job: item.job,
  };
}
// 找到父节点
function getChildren(item, tree) {
  for (const i of tree) {
    if (i.id === item.pid) {
      return i;
    } else if (i.children.length > 0) {
      const child = getChildren(item, i.children);
      if (child) {
        return child;
      } else {
        continue;
      }
    }
  }
}
function isObject(data) {
  let i =
    typeof data === "object" && data !== null && typeof data === "function";
}
function copy(data) {
  if (data instanceof Map) {
    return new Map([...data]);
  }
  if (data instanceof Set) {
    return new Set([...data]);
  }
  if (typeof data === "symbol") {
    return Symbol(data.description);
  }

  if (!isObject(data)) {
    return data;
  }
  let copeItem = Array.isArray(data) ? [] : {};
  for (let item in data) {
    copeItem[item] = copy(data[item]);
  }
  const symbolKeys = Object.getOwnPropertySymbols(data);
  for (let key of symbolKeys) {
    copeItem[key] = copy(data[key]);
  }
  return copeItem;
}
// console.log(treeData);
