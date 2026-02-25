'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StackVisualizerProps {
  initialStack?: number[];
  onClose: () => void;
}

export default function StackVisualizer({ 
  initialStack = [10, 20, 30],
  onClose 
}: StackVisualizerProps) {
  const [stack, setStack] = useState<number[]>(initialStack);
  const [inputValue, setInputValue] = useState('');
  const [highlightTop, setHighlightTop] = useState(false);
  const [operation, setOperation] = useState<string>('');
  const [peekedValue, setPeekedValue] = useState<number | null>(null);

  // Push - Add to top
  const handlePush = () => {
    if (!inputValue) return;
    const newValue = parseInt(inputValue);
    setOperation(`Pushing ${newValue} onto stack...`);
    setStack([...stack, newValue]);
    setInputValue('');
    setHighlightTop(true);
    setTimeout(() => {
      setHighlightTop(false);
      setOperation('');
    }, 1500);
  };

  // Pop - Remove from top
  const handlePop = () => {
    if (stack.length === 0) {
      setOperation('Stack is empty! Cannot pop.');
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    const topValue = stack[stack.length - 1];
    setOperation(`Popping ${topValue} from stack...`);
    setHighlightTop(true);
    
    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setHighlightTop(false);
      setOperation('');
    }, 1000);
  };

  // Peek - Look at top without removing
  const handlePeek = () => {
    if (stack.length === 0) {
      setOperation('Stack is empty! Nothing to peek.');
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    const topValue = stack[stack.length - 1];
    setPeekedValue(topValue);
    setOperation(`Top of stack: ${topValue}`);
    setHighlightTop(true);
    
    setTimeout(() => {
      setHighlightTop(false);
      setPeekedValue(null);
      setOperation('');
    }, 2000);
  };

  // Check if empty
  const handleIsEmpty = () => {
    if (stack.length === 0) {
      setOperation('✅ Stack is EMPTY (true)');
    } else {
      setOperation(`❌ Stack is NOT empty (false) - Contains ${stack.length} elements`);
    }
    setTimeout(() => setOperation(''), 2000);
  };

  // Reset
  const handleReset = () => {
    setStack(initialStack);
    setOperation('Stack reset!');
    setTimeout(() => setOperation(''), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">🥞 Stack Visualizer</h2>
              <p className="text-orange-100">LIFO: Last In, First Out</p>
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
                className="mb-6 p-4 bg-orange-50 border-2 border-orange-200 rounded-xl text-orange-700 font-semibold text-center"
              >
                {operation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stack Visualization */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-700">Current Stack:</h3>
              <div className="text-sm text-gray-500">
                Size: <span className="font-bold text-orange-600">{stack.length}</span>
              </div>
            </div>
            
            {/* Stack Container */}
            <div className="flex flex-col items-center justify-end min-h-[400px] bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl p-6 border-4 border-gray-300 relative">
              
              {/* Top Label */}
              {stack.length > 0 && (
                <div className="absolute top-4 right-4 text-sm font-semibold text-orange-600 flex items-center gap-2">
                  <span>↑ TOP</span>
                  {peekedValue !== null && (
                    <span className="px-3 py-1 bg-orange-100 rounded-full">
                      Peek: {peekedValue}
                    </span>
                  )}
                </div>
              )}

              {/* Empty State */}
              {stack.length === 0 && (
                <div className="text-center text-gray-400 my-auto">
                  <div className="text-6xl mb-4">📭</div>
                  <div className="text-xl font-semibold">Stack is Empty</div>
                  <div className="text-sm mt-2">Push some elements to get started!</div>
                </div>
              )}

              {/* Stack Elements */}
              <div className="flex flex-col-reverse gap-2 w-full max-w-md">
                <AnimatePresence>
                  {stack.map((value, index) => {
                    const isTop = index === stack.length - 1;
                    return (
                      <motion.div
                        key={`${value}-${index}`}
                        layout
                        initial={{ scale: 0, opacity: 0, y: -50 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          y: 0,
                          backgroundColor: (highlightTop && isTop) ? '#fed7aa' : '#ffffff'
                        }}
                        exit={{ scale: 0, opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className={`
                          relative w-full h-20 flex items-center justify-center
                          border-4 rounded-lg font-bold text-2xl shadow-lg
                          ${(highlightTop && isTop)
                            ? 'border-orange-400 bg-orange-50 text-orange-700 scale-105' 
                            : 'border-orange-300 bg-white text-gray-700'
                          }
                          transition-all duration-300
                        `}
                      >
                        {value}
                        
                        {/* Position Label */}
                        <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 font-mono">
                          [{index}]
                        </div>
                        
                        {/* Top Indicator */}
                        {isTop && (
                          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-orange-600">
                            TOP →
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Bottom Base */}
              <div className="w-full max-w-md h-2 bg-gray-400 rounded-full mt-4"></div>
            </div>

            {/* Stack Info */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 mt-6">
              <div>
                <span className="font-semibold">Type:</span> LIFO (Last In, First Out)
              </div>
              <div>
                <span className="font-semibold">Push/Pop Time:</span> O(1)
              </div>
              <div>
                <span className="font-semibold">Peek Time:</span> O(1)
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Stack Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🔧 Stack Operations</h4>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePush()}
                    placeholder="Value"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 outline-none"
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
                  disabled={stack.length === 0}
                  className="w-full px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Pop (Remove Top)
                </button>
                
                <button
                  onClick={handlePeek}
                  disabled={stack.length === 0}
                  className="w-full px-6 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Peek (View Top)
                </button>
              </div>
            </div>

            {/* Utility Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🛠️ Utilities</h4>
              
              <div className="space-y-3">
                <button
                  onClick={handleIsEmpty}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  isEmpty()
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  🔄 Reset Stack
                </button>
                
                {/* Info Display */}
                <div className="mt-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Size:</span>
                      <span className="font-bold text-orange-600">{stack.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Is Empty:</span>
                      <span className="font-bold">{stack.length === 0 ? '✅ Yes' : '❌ No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top Value:</span>
                      <span className="font-bold text-orange-600">
                        {stack.length > 0 ? stack[stack.length - 1] : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-700 mb-4">💡 Stack Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-orange-700 mb-1">LIFO Principle</div>
                <div className="text-gray-600">Last element pushed is the first to be popped</div>
              </div>
              <div>
                <div className="font-semibold text-red-700 mb-1">Top-Only Access</div>
                <div className="text-gray-600">Can only add/remove from the top of the stack</div>
              </div>
              <div>
                <div className="font-semibold text-purple-700 mb-1">Common Uses</div>
                <div className="text-gray-600">Function calls, undo/redo, expression evaluation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}