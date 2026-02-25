'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QueueVisualizerProps {
  initialQueue?: number[];
  onClose: () => void;
}

export default function QueueVisualizer({ 
  initialQueue = [10, 20, 30],
  onClose 
}: QueueVisualizerProps) {
  const [queue, setQueue] = useState<number[]>(initialQueue);
  const [inputValue, setInputValue] = useState('');
  const [highlightFront, setHighlightFront] = useState(false);
  const [highlightRear, setHighlightRear] = useState(false);
  const [operation, setOperation] = useState<string>('');
  const [peekedValue, setPeekedValue] = useState<{ type: string; value: number } | null>(null);

  // Enqueue - Add to rear
  const handleEnqueue = () => {
    if (!inputValue) return;
    const newValue = parseInt(inputValue);
    setOperation(`Enqueuing ${newValue} to rear...`);
    setQueue([...queue, newValue]);
    setInputValue('');
    setHighlightRear(true);
    setTimeout(() => {
      setHighlightRear(false);
      setOperation('');
    }, 1500);
  };

  // Dequeue - Remove from front
  const handleDequeue = () => {
    if (queue.length === 0) {
      setOperation('Queue is empty! Cannot dequeue.');
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    const frontValue = queue[0];
    setOperation(`Dequeuing ${frontValue} from front...`);
    setHighlightFront(true);
    
    setTimeout(() => {
      setQueue(queue.slice(1));
      setHighlightFront(false);
      setOperation('');
    }, 1000);
  };

  // Front - Look at first element
  const handleFront = () => {
    if (queue.length === 0) {
      setOperation('Queue is empty! No front element.');
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    const frontValue = queue[0];
    setPeekedValue({ type: 'front', value: frontValue });
    setOperation(`Front of queue: ${frontValue}`);
    setHighlightFront(true);
    
    setTimeout(() => {
      setHighlightFront(false);
      setPeekedValue(null);
      setOperation('');
    }, 2000);
  };

  // Rear - Look at last element
  const handleRear = () => {
    if (queue.length === 0) {
      setOperation('Queue is empty! No rear element.');
      setTimeout(() => setOperation(''), 2000);
      return;
    }
    
    const rearValue = queue[queue.length - 1];
    setPeekedValue({ type: 'rear', value: rearValue });
    setOperation(`Rear of queue: ${rearValue}`);
    setHighlightRear(true);
    
    setTimeout(() => {
      setHighlightRear(false);
      setPeekedValue(null);
      setOperation('');
    }, 2000);
  };

  // Check if empty
  const handleIsEmpty = () => {
    if (queue.length === 0) {
      setOperation('✅ Queue is EMPTY (true)');
    } else {
      setOperation(`❌ Queue is NOT empty (false) - Contains ${queue.length} elements`);
    }
    setTimeout(() => setOperation(''), 2000);
  };

  // Reset
  const handleReset = () => {
    setQueue(initialQueue);
    setOperation('Queue reset!');
    setTimeout(() => setOperation(''), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">🎫 Queue Visualizer</h2>
              <p className="text-teal-100">FIFO: First In, First Out</p>
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
                className="mb-6 p-4 bg-teal-50 border-2 border-teal-200 rounded-xl text-teal-700 font-semibold text-center"
              >
                {operation}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Queue Visualization */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-700">Current Queue:</h3>
              <div className="text-sm text-gray-500">
                Size: <span className="font-bold text-teal-600">{queue.length}</span>
              </div>
            </div>
            
            {/* Queue Container */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border-4 border-gray-300 min-h-[300px] flex items-center justify-center relative">
              
              {/* Direction Labels */}
              <div className="absolute top-4 left-4 text-sm font-semibold text-red-600 flex items-center gap-2">
                ← DEQUEUE (OUT)
              </div>
              <div className="absolute top-4 right-4 text-sm font-semibold text-green-600 flex items-center gap-2">
                ENQUEUE (IN) →
              </div>

              {/* Peek Value Display */}
              {peekedValue && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-teal-100 border-2 border-teal-400 rounded-full text-teal-700 font-semibold">
                  {peekedValue.type === 'front' ? 'Front' : 'Rear'}: {peekedValue.value}
                </div>
              )}

              {/* Empty State */}
              {queue.length === 0 && (
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">📭</div>
                  <div className="text-xl font-semibold">Queue is Empty</div>
                  <div className="text-sm mt-2">Enqueue some elements to get started!</div>
                </div>
              )}

              {/* Queue Elements */}
              <div className="flex gap-3 items-center max-w-full overflow-x-auto px-4">
                <AnimatePresence mode="popLayout">
                  {queue.map((value, index) => {
                    const isFront = index === 0;
                    const isRear = index === queue.length - 1;
                    return (
                      <motion.div
                        key={`${value}-${index}`}
                        layout
                        initial={{ scale: 0, opacity: 0, x: 100 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1,
                          x: 0,
                          backgroundColor: 
                            (highlightFront && isFront) ? '#99f6e4' : 
                            (highlightRear && isRear) ? '#a7f3d0' : 
                            '#ffffff'
                        }}
                        exit={{ scale: 0, opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, type: 'spring' }}
                        className="relative flex-shrink-0"
                      >
                        {/* Queue Element */}
                        <div className={`
                          w-24 h-24 flex items-center justify-center
                          border-4 rounded-xl font-bold text-2xl shadow-lg
                          ${(highlightFront && isFront)
                            ? 'border-teal-400 bg-teal-50 text-teal-700 scale-110' 
                            : (highlightRear && isRear)
                            ? 'border-green-400 bg-green-50 text-green-700 scale-110'
                            : 'border-teal-300 bg-white text-gray-700'
                          }
                          transition-all duration-300
                        `}>
                          {value}
                        </div>
                        
                        {/* Position Label */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-400 font-mono">
                          [{index}]
                        </div>
                        
                        {/* Front Indicator */}
                        {isFront && (
                          <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-red-600 whitespace-nowrap">
                            ← FRONT
                          </div>
                        )}
                        
                        {/* Rear Indicator */}
                        {isRear && (
                          <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 text-sm font-semibold text-green-600 whitespace-nowrap">
                            REAR →
                          </div>
                        )}

                        {/* Arrow to next element */}
                        {index < queue.length - 1 && (
                          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">
                            →
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Queue Info */}
            <div className="flex justify-center gap-8 text-sm text-gray-600 mt-8">
              <div>
                <span className="font-semibold">Type:</span> FIFO (First In, First Out)
              </div>
              <div>
                <span className="font-semibold">Enqueue/Dequeue Time:</span> O(1)
              </div>
              <div>
                <span className="font-semibold">Front/Rear Access:</span> O(1)
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Queue Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🔧 Queue Operations</h4>
              
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
                    placeholder="Value"
                    className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-teal-500 outline-none"
                  />
                  <button
                    onClick={handleEnqueue}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    Enqueue
                  </button>
                </div>
                
                <button
                  onClick={handleDequeue}
                  disabled={queue.length === 0}
                  className="w-full px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Dequeue (Remove Front)
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleFront}
                    disabled={queue.length === 0}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Front
                  </button>
                  <button
                    onClick={handleRear}
                    disabled={queue.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Rear
                  </button>
                </div>
              </div>
            </div>

            {/* Utility Operations */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-4">🛠️ Utilities</h4>
              
              <div className="space-y-3">
                <button
                  onClick={handleIsEmpty}
                  className="w-full px-6 py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition"
                >
                  isEmpty()
                </button>
                
                <button
                  onClick={handleReset}
                  className="w-full px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  🔄 Reset Queue
                </button>
                
                {/* Info Display */}
                <div className="mt-4 p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Size:</span>
                      <span className="font-bold text-teal-600">{queue.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Is Empty:</span>
                      <span className="font-bold">{queue.length === 0 ? '✅ Yes' : '❌ No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Front Value:</span>
                      <span className="font-bold text-red-600">
                        {queue.length > 0 ? queue[0] : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rear Value:</span>
                      <span className="font-bold text-green-600">
                        {queue.length > 0 ? queue[queue.length - 1] : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Concepts */}
          <div className="mt-8 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6">
            <h4 className="font-bold text-gray-700 mb-4">💡 Queue Concepts</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-teal-700 mb-1">FIFO Principle</div>
                <div className="text-gray-600">First element enqueued is the first to be dequeued</div>
              </div>
              <div>
                <div className="font-semibold text-cyan-700 mb-1">Two-End Access</div>
                <div className="text-gray-600">Add at rear, remove from front - like a real line</div>
              </div>
              <div>
                <div className="font-semibold text-blue-700 mb-1">Common Uses</div>
                <div className="text-gray-600">Task scheduling, BFS algorithm, printer queues</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}