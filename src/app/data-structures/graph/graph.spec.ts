import { Graph } from './graph';
import testData from '../test-resources/dataset_grafen.json';

type GraphTestData = {
  lijnlijst: [number, number][];
  verbindingslijst: number[][];
};

describe('Graph - `AddEdge`, `RemoveEdge`, `AddVertex` & `RemoveVertex`', () => {
  const graphTestData = testData as unknown as GraphTestData;
  const graph = new Graph();

  it('should add vertices to graph', () => {
    const startTimeAdd = window.performance.now();
    graphTestData.verbindingslijst.forEach((connections) => graph.addVertex(connections));
    const endTimeAdd = window.performance.now();
    const durationAdd = endTimeAdd - startTimeAdd;
    console.log(`Duration add vertices: ${durationAdd} ms`);

    expect(graph.verticesLength()).toBe(graphTestData.verbindingslijst.length);
  });

  it('should add edges to graph', () => {
    const startTimeAdd = window.performance.now();
    graphTestData.lijnlijst.forEach(([from, to]) => graph.addEdge(from, to));
    const endTimeAdd = window.performance.now();
    const durationAdd = endTimeAdd - startTimeAdd;
    console.log(`Duration add edges: ${durationAdd} ms`);

    expect(graph.edgesLength()).toBe(graphTestData.lijnlijst.length);
  });

  it('should remove edges from graph', () => {
    const startTimeRemove = window.performance.now();
    graphTestData.lijnlijst.forEach(([from, to]) => graph.removeEdge(from, to));
    const endTimeRemove = window.performance.now();
    const durationRemove = endTimeRemove - startTimeRemove;
    console.log(`Duration remove edges: ${durationRemove} ms`);

    expect(graph.edgesLength()).toBe(0);
  });

  it('should remove vertices from graph', () => {
    const startTimeRemove = window.performance.now();
    graphTestData.verbindingslijst.forEach((_, i) => graph.removeVertex(i));
    const endTimeRemove = window.performance.now();
    const durationRemove = endTimeRemove - startTimeRemove;
    console.log(`Duration remove vertices: ${durationRemove} ms`);

    expect(graph.verticesLength()).toBe(0);
  });
});
