'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArrayVisualizerProps {
  initialArray?: number[];
  onClose: () => void;
}

export default function ArrayVisualizer({ 
  initialArray = [10, 20, 30, 40, 50],
  onClose 
}: ArrayVisualizerProps) {
  const [array, setArray] = useState<number[]>(initialArray);
  const [inputValue, setInputValue] = useState('');
  const [insertIndex, setInsertIndex] = useState('');
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  const [operation, setOperation] = useState<string>('');

  // Insert at end
  const handlePush = () => {
    if (!inputValue) return;
    const newValue = parseInt(inputValue);
    setOperation('Pushing value to end of array...');
    setArray([...array, newValue]);
    setInputValue('');
    setTimeout(() => setOperation(''), 2000);
  };

  // Remove from end
  const handlePop = () => {
    if (array.length === 0) return;
    setOperation('Removing last element...');
    setHighlightIndex(array.length - 1);
    setTimeout(() => {
      setArray(array.slice(0, -1));
      setHighlightIndex(null);
      setOperation('');
    }, 1000);
  };

  // Insert at specific index
  const handleInsertAt = () => {
    if (!inputValue || !insertIndex) return;
    const value = parseInt(inputValue);
    const index = parseInt(insertIndex);
    
    if (index < 0 || index > array.length) {
      setOperation('Invalid index!');
      setTimeout(() => setOperation(''), 2000);
      return;
    }

    setOperation(`Inserting ${value} at index ${index}...`);
    setHighlightIndex(index);
    
    setTimeout(() => {
      const newArray = [...array];
      newArray.splice(index, 0, value);
      setArray(newArray);
      setInputValue('');
      setInsertIndex('');
      setHighlightIndex(null);
      setOperation('');
    }, 1000);
  };

  // Delete at specific index
  const handleDeleteAt = () => {
    if (!insertIndex) return;
    const index = parseInt(insertIndex);
    
    if (index < 0 || index >= array.length) {
      setOperation('Invalid index!');
      setTimeout(() => setOperation(''), 2000);
      return;
    }

    setOperation(`Deleting element at index ${index}...`);
    setHighlightIndex(index);
    
    setTimeout(() => {
      const newArray = [...array];
      newArray.splice(index, 1);
      setArray(newArray);
      setInsertIndex('');
      setHighlightIndex(null);
      setOperation('');
    }, 1000);
  };

  // Access element
  const handleAccess = () => {
    if (!insertIndex) return;
    const index = parseInt(insertIndex);
    
    if (index < 0 || index >= array.length) {
      setOperation('Index out of bounds!');
      setTimeout(() => setOperation(''), 2000);
      return;
    }

    setOperation(`Accessing array[${index}] = ${array[index]} in O(1) time!`);
    setHighlightIndex(index);
    
    setTimeout(() => {
      setHighlightIndex(null);
      setOperation('');
    }, 2000);
  };

  // Reset array
  const handleReset = () => {
    setArray(initialArray);
    setOperation('Array reset!');
    setTimeout(() => setOperation(''), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">📊 Array Visualizer</h2>
              <p className="text-blue-100">Interactive array operations with visual feedback</p>
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
                className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-700 font-semibold text-center"
              >
                {operation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Array Visualization */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Current Array:</h3>
            
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <AnimatePresence mode="popLayout">
                {array.map((value, index) => (
                  <motion.div
                    key={`${value}-${index}`}
                    layout
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      backgroundColor: highlightIndex === index ? '#fbbf24' : '#ffffff'
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    {/* Index Label */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 font-mono">
                      [{index}]
                    </div>
                    
                    {/* Array Cell */}
                    <div className={`
                      w-20 h-20 flex items-center justify-center
                      border-4 rounded-lg font-bold text-2xl
                      ${highlightIndex === index 
                        ? 'border-yellow-400 bg-yellow-50 text-yellow-700 shadow-lg scale-110' 
                        : 'border-blue-300 bg-white text-gray-700 shadow-md'
                      }
                      transition-all duration-300
                    `}>
                      {value}
                    </div>
                    
                    {/* Memory Address (simulated) */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-mono">
                      0x{(1000 + index * 4).toString(16)}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Array Info */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 mt-8">
              <div>
                <span className="font-semibold">Length:</span> {array.length}
              </div>
              <div>
                <span className="font-semibold">Size in Memory:</span> {array.length * 4} bytes
              </div>
              <div>
                <span className="font-semibold">Access Time:</span> O(1)
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Basic Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">📥 Basic Operations</h4>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                  />
                  <button
                    onClick={handlePush}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Push
                  </button>
                </div>
                
                <button
                  onClick={handlePop}
                  disabled={array.length === 0}
                  className="w-full px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pop (Remove Last)
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  🔄 Reset Array
                </button>
              </div>
            </div>

            {/* Advanced Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🎯 Index Operations</h4>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Value"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                  />
                  <input
                    type="number"
                    value={insertIndex}
                    onChange={(e) => setInsertIndex(e.target.value)}
                    placeholder="Index"
                    className="w-24 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none"
                  />
                </div>
                
                <button
                  onClick={handleInsertAt}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Insert at Index
                </button>
                
                <button
                  onClick={handleDeleteAt}
                  className="w-full px-6 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition"
                >
                  Delete at Index
                </button>
                
                <button
                  onClick={handleAccess}
                  className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition"
                >
                  Access Element
                </button>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-700 mb-4">💡 Key Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-blue-700 mb-1">Contiguous Memory</div>
                <div className="text-gray-600">Elements stored in consecutive memory locations</div>
              </div>
              <div>
                <div className="font-semibold text-purple-700 mb-1">Index-Based Access</div>
                <div className="text-gray-600">Direct access to any element in O(1) time</div>
              </div>
              <div>
                <div className="font-semibold text-green-700 mb-1">Fixed Type</div>
                <div className="text-gray-600">All elements must be the same data type</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}  