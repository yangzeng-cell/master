export function defaultToString(item) {
  if (item === null) {
    return "NULL";
  } else if (item === undefined) {
    return "UNDEFINED";
  } else if (typeof item === "string" || item instanceof String) {
    return `${item}`;
  }

  return item.toString();
}

export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  set(key,value){
    if(key!=null&&value!=null){
      const tableKey=this.toStrFn(key)
      this.table[tableKey]=new ValuePair(key,value)
      return true
    }
    return false
  }
  hasKey(key){
    return this.table[this.toStrFn(key)]!=null
  }
  remove(key){
    if(this.hasKey(key)){
      delete this.table[this.toStrFn(key)]
      return true
    }
    return false
  }
  get(key){
    const ValuePair=this.table[this.toStrFn(key)]
    return ValuePair==null?undefined:ValuePair.value
  }
  keyValues(){
    return Object.values(this.table)
  }
  keys(){
    return this.keyValues.map((item)=>{
      return item.key
    })
  }
  values(){
    return this.keyValues().map(item=>item.value)
  }
  forEach(callbackFn){
    const ValuePair=this.keyValues()
    for(let i=0;i<ValuePair.length;i++){
      const result=callbackFn(ValuePair[i].key,ValuePair[i].value)
      if(result===false){
        break
      }
    }
  }
  size(){
    return Object.keys(this.table).length
  }
  isEmpty(){
    return this.size()===0
  }
  clear(){
    this.table={}
  }
  toString(){
    if(this.isEmpty()){
      return ""
    }
    const ValuePair=this.keyValues()
    let objString=`${ValuePair[0].toString()}`
    for(let i=1;i<ValuePair.length;i++){
      objString+=`${ValuePair[i].toString()}`
    }
    return objString
  }

}

class ValuePair{
  constructor(key,value){
    this.key=key
    this.value=value
  }
  toString(){
    return `[#${this.key}:${this.value}]`;
  }
}

export  class Graph {
  // isDirected判断是否时有向图，默认是无向图
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.vertices = [];//用来存储顶点的名字
    this.adjList = new Dictionary();//字典用顶点的名字作为键，邻接顶点列表作为值
  }

//   向图添加新的顶点
  addVertex(v){
      if(!this.vertices.includes(v)){
          this.vertices.push(v)
          this.adjList.set(v,[])
      }
  }
//   向图添加顶点的边
addEdge(v,w){
    if(!this.adjList.get(v)){
        this.addVertex(v)
    }
    if(!this.adjList.get(w)){
        this.addVertex(w)
    }

    this.adjList.get(v).push(w)
    if(!this.isDirected){
        this.adjList.get(w).push(v)
    }
}
// 返回顶点列表
getVertices(){
  return this.vertices
}
// 返回邻接表
getAdjList(){
  return this.adjList
}

toString(){
  let s='',
  for(let i=0;i<this.vertices.length;i++){
    s+=`${this.vertices[i]}->`
    const neighbors=this.adjList.get(this.vertices[i])
    for(let j=0;j<neighbors.length;j++){
      s+=`${neighbors[j]}`
    }
    s+='\n'
  }
  return s
}
}
//用颜色来标记
export const Colors={
  WHITE:0,
  GREY:1,
  BLACK:2
}

export const initialzeColor=vertices=>{
  const color={

  }

  for(let i=0;i<vertices.length;i++){
    color[vertices[i]]=Colors.WHITE
  }
  return color
}
