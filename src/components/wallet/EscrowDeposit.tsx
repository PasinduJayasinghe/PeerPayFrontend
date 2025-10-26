import React, { useState } from 'react';
import { X, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { escrowService } from '../../services/escrowService';
import { toast } from 'sonner';

interface EscrowDepositProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
  jobAmount: number;
  employerId: string;
  studentId: string;
  studentName: string;
  onSuccess?: () => void;
}

const EscrowDeposit: React.FC<EscrowDepositProps> = ({
  isOpen,
  onClose,
  jobId,
  jobTitle,
  jobAmount,
  employerId,
  studentId,
  studentName,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  // Calculate platform fee (5%)
  const platformFeeRate = 0.05;
  const platformFee = jobAmount * platformFeeRate;
  const totalAmount = jobAmount + platformFee;

  const handleDeposit = async () => {
    if (!agreed) {
      toast.error('Please agree to the escrow terms');
      return;
    }

    try {
      setLoading(true);
      
      await escrowService.createEscrow({
        jobId,
        employerId,
        studentId,
        amount: jobAmount,
        notes: `Escrow deposit for job: ${jobTitle}`,
      });

      toast.success('Funds deposited to escrow successfully!');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Escrow deposit error:', error);
      toast.error(error.response?.data?.message || 'Failed to deposit funds');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Secure Escrow Deposit</h2>
                <p className="text-purple-100 text-sm">Protected payment for your job</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Job Details */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Job Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Job Title:</span>
                <span className="font-semibold text-gray-900">{jobTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Student:</span>
                <span className="font-semibold text-gray-900">{studentName}</span>
              </div>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Payment Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Job Payment</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${jobAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Platform Fee (5%)</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${platformFee.toFixed(2)}
                </span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-gray-900 font-semibold text-lg">Total to Deposit</span>
                <span className="text-2xl font-bold text-purple-600">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How Escrow Works</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">1.</span>
                    <span>You deposit ${totalAmount.toFixed(2)} into secure escrow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">2.</span>
                    <span>Student completes the work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">3.</span>
                    <span>You review and approve the work</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">4.</span>
                    <span>Funds are released to the student</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-3 text-sm text-blue-800 bg-blue-100 rounded p-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>
                Your funds are held securely until you approve the work. If there's a dispute,
                our team will help resolve it fairly.
              </span>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
            />
            <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
              I agree to deposit <strong>${totalAmount.toFixed(2)}</strong> into escrow for this
              job. I understand that these funds will be held securely and released to the student
              upon successful completion and my approval of the work. I have read and agree to the{' '}
              <a href="/terms" className="text-purple-600 hover:underline">
                escrow terms and conditions
              </a>
              .
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              disabled={loading || !agreed}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Deposit ${totalAmount.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowDeposit;
