import React, { useEffect, useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  Download
} from 'lucide-react';
import { escrowService } from '../../services/escrowService';
import type { Transaction, PaginatedResponse } from '../../types';
import { toast } from 'sonner';

interface TransactionHistoryProps {
  userId: string;
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ userId }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterType, setFilterType] = useState<string>('all');

  const fetchTransactions = async (page: number = 1) => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Transaction> = await escrowService.getTransactions(
        userId,
        page,
        10
      );
      
      // Handle both paginated and array responses
      if ('items' in response) {
        setTransactions(response.items);
        setTotalPages(response.totalPages);
      } else if (Array.isArray(response)) {
        setTransactions(response);
        setTotalPages(1);
      }
      
      setCurrentPage(page);
    } catch (error: any) {
      console.error('Failed to fetch transactions:', error);
      toast.error(error.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(1);
  }, [userId]);

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'Credit':
      case 'Release':
        return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
      case 'Debit':
      case 'Withdrawal':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />;
      case 'Escrow':
        return <Clock className="w-5 h-5 text-orange-500" />;
      case 'Refund':
        return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'Credit':
      case 'Release':
        return 'text-green-600';
      case 'Debit':
      case 'Withdrawal':
        return 'text-red-600';
      case 'Escrow':
        return 'text-orange-600';
      case 'Refund':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAmountPrefix = (type: Transaction['type']) => {
    return ['Credit', 'Release', 'Refund'].includes(type) ? '+' : '-';
  };

  const filteredTransactions = filterType === 'all' 
    ? transactions 
    : transactions.filter(t => t.type.toLowerCase() === filterType.toLowerCase());

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 text-purple-600 border-2 border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
          onClick={() => toast.info('Export feature coming soon!')}
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filter:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['all', 'credit', 'debit', 'escrow', 'release', 'refund', 'withdrawal'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterType === type
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No transactions found</p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              key={transaction.transactionId}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0 p-2 bg-white rounded-full">
                {getTransactionIcon(transaction.type)}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {transaction.description}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </span>
                  {transaction.relatedEntityType && (
                    <>
                      <span className="text-gray-300">•</span>
                      <span className="text-xs text-gray-500 capitalize">
                        {transaction.relatedEntityType}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                  {getAmountPrefix(transaction.type)}${transaction.amount.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500">
                  Balance: ${transaction.balance.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => fetchTransactions(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => fetchTransactions(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
