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

describe('Graph - test complexity', () => {
  const sizes = [100, 1000, 10000];
  const graph = new Graph();

  sizes.forEach((size) => {
    // O(n)
    it(`should add vertices to graph of ${size} elements`, () => {
      const startTimeAdd = window.performance.now();
      Array.from({ length: size }).forEach(() => graph.addVertex());
      const endTimeAdd = window.performance.now();
      const durationAdd = endTimeAdd - startTimeAdd;
      console.log(`Duration add vertices ${size}: ${durationAdd} ms`);

      expect(graph.verticesLength()).toBe(size);
    });

    // O(n)
    it(`should add edges to graph of ${size} elements`, () => {
      const startTimeAdd = window.performance.now();
      Array.from({ length: size }).forEach((_, i) => graph.addEdge(i, i + 1));
      const endTimeAdd = window.performance.now();
      const durationAdd = endTimeAdd - startTimeAdd;
      console.log(`Duration add edges ${size}: ${durationAdd} ms`);

      expect(graph.edgesLength()).toBe(size);
    });

    /**
     * The expected complexity of removing edges is O(n ^ 2) because when the size increases by 10, the time
     * of the function increases by 100.
     */
    it(`should remove edges from graph of ${size} elements`, () => {
      const startTimeRemove = window.performance.now();
      Array.from({ length: size }).forEach((_, i) => graph.removeEdge(i, i + 1));
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove edges ${size}: ${durationRemove} ms`);

      expect(graph.edgesLength()).toBe(0);
    });

    // O(n)
    it(`should remove vertices from graph of ${size} elements`, () => {
      const startTimeRemove = window.performance.now();
      Array.from({ length: size }).forEach((_, i) => graph.removeVertex(i));
      const endTimeRemove = window.performance.now();
      const durationRemove = endTimeRemove - startTimeRemove;
      console.log(`Duration remove vertices ${size}: ${durationRemove} ms`);

      expect(graph.verticesLength()).toBe(0);
    });
  });

});
