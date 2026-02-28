'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  x?: number;
  y?: number;
}

interface BinaryTreeVisualizerProps {
  initialValues?: number[];
  onClose: () => void;
}

export default function BinaryTreeVisualizer({ 
  initialValues = [50, 30, 70, 20, 40, 60, 80],
  onClose 
}: BinaryTreeVisualizerProps) {
  const [root, setRoot] = useState<TreeNode | null>(() => {
    let tree: TreeNode | null = null;
    initialValues.forEach(val => {
      tree = insertNode(tree, val);
    });
    return tree;
  });
  
  const [inputValue, setInputValue] = useState('');
  const [highlightedNodes, setHighlightedNodes] = useState<number[]>([]);
  const [operation, setOperation] = useState<string>('');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);

  // Insert a node into BST
  function insertNode(node: TreeNode | null, value: number): TreeNode {
    if (!node) {
      return { value, left: null, right: null };
    }
    
    if (value < node.value) {
      node.left = insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = insertNode(node.right, value);
    }
    
    return node;
  }

  // Find minimum value node
  function findMin(node: TreeNode): TreeNode {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  // Delete a node from BST
  function deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = deleteNode(node.right, value);
    } else {
      // Node found - delete it
      if (!node.left && !node.right) {
        return null;
      }
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }
      
      // Node has two children
      const minRight = findMin(node.right);
      node.value = minRight.value;
      node.right = deleteNode(node.right, minRight.value);
    }
    
    return node;
  }

  // Calculate tree positions
  function calculatePositions(node: TreeNode | null, x: number, y: number, spacing: number): void {
    if (!node) return;
    
    node.x = x;
    node.y = y;
    
    if (node.left) {
      calculatePositions(node.left, x - spacing, y + 80, spacing / 2);
    }
    if (node.right) {
      calculatePositions(node.right, x + spacing, y + 80, spacing / 2);
    }
  }

  // Get all nodes for rendering
  function getAllNodes(node: TreeNode | null, nodes: TreeNode[] = []): TreeNode[] {
    if (!node) return nodes;
    
    nodes.push(node);
    getAllNodes(node.left, nodes);
    getAllNodes(node.right, nodes);
    
    return nodes;
  }

  // Get all edges for rendering
  function getAllEdges(node: TreeNode | null, edges: {from: TreeNode, to: TreeNode}[] = []): {from: TreeNode, to: TreeNode}[] {
    if (!node) return edges;
    
    if (node.left) {
      edges.push({ from: node, to: node.left });
      getAllEdges(node.left, edges);
    }
    if (node.right) {
      edges.push({ from: node, to: node.right });
      getAllEdges(node.right, edges);
    }
    
    return edges;
  }

  // Traversals
  function inorderTraversal(node: TreeNode | null, result: number[] = []): number[] {
    if (!node) return result;
    inorderTraversal(node.left, result);
    result.push(node.value);
    inorderTraversal(node.right, result);
    return result;
  }

  function preorderTraversal(node: TreeNode | null, result: number[] = []): number[] {
    if (!node) return result;
    result.push(node.value);
    preorderTraversal(node.left, result);
    preorderTraversal(node.right, result);
    return result;
  }

  function postorderTraversal(node: TreeNode | null, result: number[] = []): number[] {
    if (!node) return result;
    postorderTraversal(node.left, result);
    postorderTraversal(node.right, result);
    result.push(node.value);
    return result;
  }

  // Handlers
  const handleInsert = () => {
    if (!inputValue) return;
    const value = parseInt(inputValue);
    
    setOperation(`Inserting ${value} into tree...`);
    const newRoot = insertNode(root, value);
    setRoot({...newRoot});
    setInputValue('');
    
    setTimeout(() => setOperation(''), 2000);
  };

  const handleDelete = () => {
    if (!inputValue) return;
    const value = parseInt(inputValue);
    
    setOperation(`Deleting ${value} from tree...`);
    const newRoot = deleteNode(root, value);
    setRoot(newRoot ? {...newRoot} : null);
    setInputValue('');
    
    setTimeout(() => setOperation(''), 2000);
  };

  const animateTraversal = (values: number[], type: string) => {
    setOperation(`${type} Traversal: ${values.join(' → ')}`);
    setTraversalResult(values);
    
    let index = 0;
    const interval = setInterval(() => {
      if (index >= values.length) {
        clearInterval(interval);
        setTimeout(() => {
          setHighlightedNodes([]);
          setTraversalResult([]);
          setOperation('');
        }, 2000);
        return;
      }
      
      setHighlightedNodes([values[index]]);
      index++;
    }, 600);
  };

  const handleInorder = () => {
    const result = inorderTraversal(root);
    animateTraversal(result, 'Inorder');
  };

  const handlePreorder = () => {
    const result = preorderTraversal(root);
    animateTraversal(result, 'Preorder');
  };

  const handlePostorder = () => {
    const result = postorderTraversal(root);
    animateTraversal(result, 'Postorder');
  };

  const handleReset = () => {
    let tree: TreeNode | null = null;
    initialValues.forEach(val => {
      tree = insertNode(tree, val);
    });
    setRoot(tree);
    setOperation('Tree reset!');
    setTimeout(() => setOperation(''), 2000);
  };

  // Calculate positions
  if (root) {
    calculatePositions(root, 400, 50, 120);
  }

  const nodes = getAllNodes(root);
  const edges = getAllEdges(root);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">🌳 Binary Search Tree Visualizer</h2>
              <p className="text-green-100">Hierarchical structure with left {"<"} parent {"<"} right</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Operation Status */}
          <AnimatePresence>
            {operation && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 font-semibold text-center"
              >
                {operation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tree Visualization */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-700">Binary Search Tree:</h3>
              <div className="text-sm text-gray-500">
                Nodes: <span className="font-bold text-green-600">{nodes.length}</span>
              </div>
            </div>
            
            {/* Tree SVG Container */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-4 border-gray-300 relative" style={{ height: '500px' }}>
              
              {!root && (
                <div className="absolute inset-0 flex items-center justify-center text-center text-gray-400">
                  <div>
                    <div className="text-6xl mb-4">🌱</div>
                    <div className="text-xl font-semibold">Tree is Empty</div>
                    <div className="text-sm mt-2">Insert nodes to build your tree!</div>
                  </div>
                </div>
              )}

              {root && (
                <svg className="w-full h-full">
                  {/* Draw edges first */}
                  {edges.map((edge, idx) => (
                    <line
                      key={`edge-${idx}`}
                      x1={edge.from.x}
                      y1={edge.from.y}
                      x2={edge.to.x}
                      y2={edge.to.y}
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                  ))}
                  
                  {/* Draw nodes */}
                  {nodes.map((node, idx) => {
                    const isHighlighted = highlightedNodes.includes(node.value);
                    return (
                      <g key={`node-${idx}-${node.value}`}>
                        <motion.circle
                          cx={node.x}
                          cy={node.y}
                          r="25"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            fill: isHighlighted ? '#86efac' : '#ffffff',
                            stroke: isHighlighted ? '#22c55e' : '#64748b',
                          }}
                          transition={{ duration: 0.3 }}
                          strokeWidth="3"
                        />
                        <text
                          x={node.x}
                          y={node.y}
                          textAnchor="middle"
                          dy="0.3em"
                          className="text-lg font-bold fill-gray-700 pointer-events-none"
                        >
                          {node.value}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Tree Info */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 mt-6">
              <div>
                <span className="font-semibold">Search:</span> O(log n) avg
              </div>
              <div>
                <span className="font-semibold">Insert:</span> O(log n) avg
              </div>
              <div>
                <span className="font-semibold">Delete:</span> O(log n) avg
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Insert/Delete Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🔧 Tree Operations</h4>
              
              <div className="space-y-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInsert()}
                  placeholder="Value"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 outline-none"
                />
                
                <button
                  onClick={handleInsert}
                  className="w-full px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Insert Node
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={!inputValue}
                  className="w-full px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete Node
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  🔄 Reset Tree
                </button>
              </div>
            </div>

            {/* Traversal Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🔍 Tree Traversals</h4>
              
              <div className="space-y-3">
                <button
                  onClick={handleInorder}
                  disabled={!root}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Inorder (L → Root → R)
                </button>
                
                <button
                  onClick={handlePreorder}
                  disabled={!root}
                  className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Preorder (Root → L → R)
                </button>
                
                <button
                  onClick={handlePostorder}
                  disabled={!root}
                  className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Postorder (L → R → Root)
                </button>

                {/* Traversal Result Display */}
                {traversalResult.length > 0 && (
                  <div className="mt-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                    <div className="text-sm">
                      <div className="font-semibold text-gray-700 mb-2">Order:</div>
                      <div className="flex flex-wrap gap-2">
                        {traversalResult.map((val, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-mono font-semibold"
                          >
                            {val}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-700 mb-4">💡 Binary Search Tree Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-green-700 mb-1">BST Property</div>
                <div className="text-gray-600">Left subtree {"<"} node {"<"} right subtree for all nodes</div>
              </div>
              <div>
                <div className="font-semibold text-emerald-700 mb-1">Logarithmic Time</div>
                <div className="text-gray-600">Balanced tree operations in O(log n) time</div>
              </div>
              <div>
                <div className="font-semibold text-teal-700 mb-1">Common Uses</div>
                <div className="text-gray-600">Databases, file systems, expression parsing</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}