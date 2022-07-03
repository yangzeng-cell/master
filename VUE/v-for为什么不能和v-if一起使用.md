# v-for为什么不能和v-if一起使用

在vue3中v-for和v-if处于同一节点的时候，v-if的优先级会比v-for的优先级高，所以v-if可能访问不到v-for的内容

在vue2中v-for和v-if处于同一节点的时候，v-for具备更高的优先级