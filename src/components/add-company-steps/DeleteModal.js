import React from "react";
import CloseIcon from "../ui/icons/Close";

export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-[400px] mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <CloseIcon />
        </button>

        {/* Content */}
        <div className="px-6 py-6">
          <h2 className="text-[20px] font-[600] text-gray-900 mb-3">
            Delete application?
          </h2>

          <p className="text-[14px] text-gray-600 mb-8 leading-[1.4]">
            Proceeding will remove all current data and uploaded documents
            associated with this application.
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-[14px] font-[500] text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[12px] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2.5 text-[14px] font-[500] text-white bg-red-500 hover:bg-red-600 rounded-[12px] transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
