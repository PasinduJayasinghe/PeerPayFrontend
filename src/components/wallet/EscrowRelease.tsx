import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { escrowService } from '../../services/escrowService';
import { toast } from 'sonner';

interface EscrowReleaseProps {
  isOpen: boolean;
  onClose: () => void;
  escrowId: string;
  jobTitle: string;
  studentName: string;
  amount: number;
  platformFee: number;
  studentId: string;
  onSuccess?: () => void;
}

const EscrowRelease: React.FC<EscrowReleaseProps> = ({
  isOpen,
  onClose,
  escrowId,
  jobTitle,
  studentName,
  amount,
  platformFee,
  studentId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const studentReceives = amount - platformFee;

  const handleRelease = async () => {
    if (!confirmed) {
      toast.error('Please confirm that the work is satisfactory');
      return;
    }

    try {
      setLoading(true);

      await escrowService.releaseEscrow({
        escrowId,
        releaseTo: studentId,
        notes: `Payment released for job: ${jobTitle}`,
      });

      toast.success('Payment released to student successfully!');
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error('Escrow release error:', error);
      toast.error(error.response?.data?.message || 'Failed to release payment');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Release Payment</h2>
                <p className="text-green-100 text-sm">Complete the job and pay the student</p>
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
          {/* Job Summary */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Job Completion</h3>
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

          {/* Payment Details */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Payment Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Escrowed Amount</span>
                <span className="text-lg font-semibold text-gray-900">
                  ${amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Platform Fee</span>
                <span className="text-lg font-semibold text-red-600">
                  -${platformFee.toFixed(2)}
                </span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                <span className="text-gray-900 font-semibold text-lg">Student Receives</span>
                <span className="text-2xl font-bold text-green-600">
                  ${studentReceives.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-900">
                <p className="font-semibold mb-2">Important Notice:</p>
                <ul className="space-y-1 ml-4 list-disc">
                  <li>Once released, this action cannot be undone</li>
                  <li>Funds will be transferred to the student's wallet immediately</li>
                  <li>Make sure you have reviewed and approved the completed work</li>
                  <li>If there are issues, contact our support before releasing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Confirmation Checkbox */}
          <div className="flex items-start gap-3 bg-gray-50 rounded-lg p-4">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="confirm" className="text-sm text-gray-700 cursor-pointer">
              I confirm that <strong>{studentName}</strong> has completed the work satisfactorily
              for "<strong>{jobTitle}</strong>" and I approve the release of{' '}
              <strong>${studentReceives.toFixed(2)}</strong> to their wallet. I understand this
              action is final and cannot be reversed.
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
              onClick={handleRelease}
              disabled={loading || !confirmed}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Release ${studentReceives.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowRelease;
