import React, { useEffect, useState } from 'react';
import { Wallet, DollarSign, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { escrowService } from '../../services/escrowService';
import type { WalletBalance as WalletBalanceType } from '../../types';
import { toast } from 'sonner';

interface WalletBalanceProps {
  userId: string;
  userRole: 'student' | 'employer';
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ userId, userRole }) => {
  const [balance, setBalance] = useState<WalletBalanceType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBalance = async () => {
    try {
      setRefreshing(true);
      const data = await escrowService.getWalletBalance(userId);
      setBalance(data);
    } catch (error: any) {
      console.error('Failed to fetch wallet balance:', error);
      toast.error(error.response?.data?.message || 'Failed to load wallet balance');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [userId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!balance) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500 text-center">No wallet data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Wallet className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Wallet Balance</h2>
            <p className="text-sm text-gray-600">
              Last updated: {new Date(balance.lastUpdated).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={fetchBalance}
          disabled={refreshing}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh balance"
        >
          <RefreshCw className={`w-5 h-5 text-gray-600 ${refreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Main Balance */}
      <div className="bg-white rounded-lg p-6 mb-4 shadow-sm">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-gray-600 text-sm">Available Balance</span>
          {balance.availableBalance > 0 && (
            <TrendingUp className="w-4 h-4 text-green-500" />
          )}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {balance.currency} {balance.availableBalance.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2">Funds ready to withdraw</p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Escrowed Balance */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-orange-500" />
            <span className="text-sm text-gray-600">In Escrow</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {balance.currency} {balance.escrowedBalance.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {userRole === 'student' ? 'Pending completion' : 'Held for jobs'}
          </p>
        </div>

        {/* Total Earnings (Student) / Total Spent (Employer) */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            {userRole === 'student' ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Total Earnings</span>
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">Total Spent</span>
              </>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {balance.currency}{' '}
            {userRole === 'student'
              ? balance.totalEarnings.toFixed(2)
              : balance.totalSpent.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">All time</p>
        </div>

        {/* Total Balance */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">Total Balance</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {balance.currency}{' '}
            {(balance.availableBalance + balance.escrowedBalance).toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">Available + Escrowed</p>
        </div>
      </div>

      {/* Actions */}
      {userRole === 'student' && balance.availableBalance > 0 && (
        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md">
            Withdraw Funds
          </button>
          <button className="px-6 py-3 border-2 border-purple-300 text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
            View History
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletBalance;
