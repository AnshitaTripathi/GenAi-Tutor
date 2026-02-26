'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  value: number;
}

interface LinkedListVisualizerProps {
  initialList?: number[];
  onClose: () => void;
}

export default function LinkedListVisualizer({ 
  initialList = [10, 20, 30],
  onClose 
}: LinkedListVisualizerProps) {
  const [list, setList] = useState<Node[]>(
    initialList.map((val, idx) => ({ id: `node-${idx}-${val}`, value: val }))
  );
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>('');

  // Insert at Head (beginning)
  const handleInsertHead = () => {
    if (!inputValue) return;
    const newValue = parseInt(inputValue);
    const newNode: Node = { id: `node-${Date.now()}-${newValue}`, value: newValue };
    
    setOperation(`Inserting ${newValue} at head...`);
    setList([newNode, ...list]);
    setInputValue('');
    setHighlightedIndex(0);
    
    setTimeout(() => {
      setHighlightedIndex(null);
      setOperation('');
    }, 2000);
  };

  // Insert at Tail (end)
  const handleInsertTail = () => {
    if (!inputValue) return;
    const newValue = parseInt(inputValue);
    const newNode: Node = { id: `node-${Date.now()}-${newValue}`, value: newValue };
    
    setOperation(`Inserting ${newValue} at tail...`);
    setList([...list, newNode]);
    setInputValue('');
    setHighlightedIndex(list.length);
    
    setTimeout(() => {
      setHighlightedIndex(null);
      setOperation('');
    }, 2000);
  };

  // Delete by value
  const handleDelete = () => {
    if (!inputValue) return;
    const valueToDelete = parseInt(inputValue);
    const index = list.findIndex(node => node.value === valueToDelete);
    
    if (index === -1) {
      setOperation(`Value ${valueToDelete} not found!`);
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    setOperation(`Deleting node with value ${valueToDelete}...`);
    setHighlightedIndex(index);
    
    setTimeout(() => {
      setList(list.filter(node => node.value !== valueToDelete));
      setHighlightedIndex(null);
      setInputValue('');
      setOperation('');
    }, 1000);
  };

  // Search for a value
  const handleSearch = () => {
    if (!searchValue) return;
    const valueToSearch = parseInt(searchValue);
    
    // Animate traversal
    let currentIndex = 0;
    setOperation(`Searching for ${valueToSearch}...`);
    
    const searchInterval = setInterval(() => {
      if (currentIndex >= list.length) {
        clearInterval(searchInterval);
        setHighlightedIndex(null);
        setOperation(`Value ${valueToSearch} not found in list`);
        setTimeout(() => setOperation(''), 2000);
        return;
      }
      
      setHighlightedIndex(currentIndex);
      
      if (list[currentIndex].value === valueToSearch) {
        clearInterval(searchInterval);
        setOperation(`Found ${valueToSearch} at position ${currentIndex}!`);
        setTimeout(() => {
          setHighlightedIndex(null);
          setOperation('');
        }, 2000);
        return;
      }
      
      currentIndex++;
    }, 500);
  };

  // Traverse - show each node
  const handleTraverse = () => {
    if (list.length === 0) {
      setOperation('List is empty!');
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    let currentIndex = 0;
    setOperation('Traversing list...');
    
    const traverseInterval = setInterval(() => {
      if (currentIndex >= list.length) {
        clearInterval(traverseInterval);
        setHighlightedIndex(null);
        setOperation('Traversal complete!');
        setTimeout(() => setOperation(''), 2000);
        return;
      }
      
      setHighlightedIndex(currentIndex);
      currentIndex++;
    }, 600);
  };

  // Reset
  const handleReset = () => {
    setList(initialList.map((val, idx) => ({ id: `node-${idx}-${val}`, value: val })));
    setOperation('List reset!');
    setTimeout(() => setOperation(''), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">🔗 Linked List Visualizer</h2>
              <p className="text-purple-100">Dynamic nodes connected by pointers</p>
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
                className="mb-6 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-purple-700 font-semibold text-center"
              >
                {operation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Linked List Visualization */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-700">Current Linked List:</h3>
              <div className="text-sm text-gray-500">
                Size: <span className="font-bold text-purple-600">{list.length}</span> nodes
              </div>
            </div>
            
            {/* List Container */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-8 border-4 border-gray-300 min-h-[300px] flex items-center justify-center overflow-x-auto">
              
              {/* Empty State */}
              {list.length === 0 && (
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">📭</div>
                  <div className="text-xl font-semibold">List is Empty</div>
                  <div className="text-sm mt-2">Insert nodes to get started!</div>
                </div>
              )}

              {/* Linked List Nodes */}
              <div className="flex items-center gap-3 px-4">
                {/* HEAD Label */}
                {list.length > 0 && (
                  <div className="text-sm font-bold text-purple-600 mr-2">HEAD →</div>
                )}
                
                <AnimatePresence mode="popLayout">
                  {list.map((node, index) => (
                    <motion.div
                      key={node.id}
                      layout
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3"
                    >
                      {/* Node Box */}
                      <div className="relative flex-shrink-0">
                        <motion.div
                          animate={{
                            backgroundColor: highlightedIndex === index ? '#e9d5ff' : '#ffffff',
                            scale: highlightedIndex === index ? 1.1 : 1,
                            borderColor: highlightedIndex === index ? '#a855f7' : '#d1d5db',
                          }}
                          className="w-32 h-24 border-4 rounded-xl shadow-lg flex flex-col items-center justify-center transition-all"
                        >
                          {/* Value */}
                          <div className="text-2xl font-bold text-gray-700">
                            {node.value}
                          </div>
                          
                          {/* Next Pointer Label */}
                          <div className="text-xs text-gray-400 mt-1">next →</div>
                        </motion.div>
                        
                        {/* Position Label */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-mono">
                          [{index}]
                        </div>
                        
                        {/* Head Indicator */}
                        {index === 0 && (
                          <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-purple-600">
                            head
                          </div>
                        )}
                        
                        {/* Tail Indicator */}
                        {index === list.length - 1 && (
                          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-pink-600">
                            tail
                          </div>
                        )}
                      </div>
                      
                      {/* Arrow to next node */}
                      {index < list.length - 1 && (
                        <div className="text-3xl text-purple-400 font-bold">→</div>
                      )}
                      
                      {/* Null pointer at end */}
                      {index === list.length - 1 && (
                        <div className="flex items-center gap-2">
                          <div className="text-3xl text-gray-400 font-bold">→</div>
                          <div className="text-lg font-mono text-gray-400">null</div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* List Info */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 mt-6">
              <div>
                <span className="font-semibold">Access Time:</span> O(n)
              </div>
              <div>
                <span className="font-semibold">Insert/Delete at Head:</span> O(1)
              </div>
              <div>
                <span className="font-semibold">Search:</span> O(n)
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Insert Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">➕ Insert Operations</h4>
              
              <div className="space-y-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInsertHead()}
                  placeholder="Value to insert"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 outline-none"
                />
                
                <button
                  onClick={handleInsertHead}
                  className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Insert at Head
                </button>
                
                <button
                  onClick={handleInsertTail}
                  className="w-full px-6 py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition"
                >
                  Insert at Tail
                </button>
                
                <button
                  onClick={handleDelete}
                  disabled={!inputValue}
                  className="w-full px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Delete Node
                </button>
              </div>
            </div>

            {/* Search & Traverse Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🔍 Search & Traverse</h4>
              
              <div className="space-y-3">
                <input
                  type="number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Value to search"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                />
                
                <button
                  onClick={handleSearch}
                  disabled={!searchValue}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Search Value
                </button>
                
                <button
                  onClick={handleTraverse}
                  disabled={list.length === 0}
                  className="w-full px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Traverse List
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  🔄 Reset List
                </button>
                
                {/* Info Display */}
                <div className="mt-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Nodes:</span>
                      <span className="font-bold text-purple-600">{list.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Head Value:</span>
                      <span className="font-bold text-purple-600">
                        {list.length > 0 ? list[0].value : 'null'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tail Value:</span>
                      <span className="font-bold text-pink-600">
                        {list.length > 0 ? list[list.length - 1].value : 'null'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-700 mb-4">💡 Linked List Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-purple-700 mb-1">Dynamic Size</div>
                <div className="text-gray-600">Can grow and shrink easily without reallocation</div>
              </div>
              <div>
                <div className="font-semibold text-pink-700 mb-1">Non-Contiguous</div>
                <div className="text-gray-600">Nodes can be anywhere in memory, connected by pointers</div>
              </div>
              <div>
                <div className="font-semibold text-indigo-700 mb-1">Common Uses</div>
                <div className="text-gray-600">Dynamic memory, undo/redo, music playlists</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}