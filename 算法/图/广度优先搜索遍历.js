import { initialzeColor } from "./创建图";

export const breadthFirstSearch = (graph, startVertex, callback) => {
  const vertices = graph.getVertices();
  const adjest = graph.getAdjList();
  const color = initialzeColor(vertices);
  const queue = new Queue();
};
