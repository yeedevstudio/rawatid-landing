import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle2 } from "lucide-react";

export default function SuccessDialog({ open, onOpenChange, onClose }) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-6 h-6 text-green" />
          </div>
          <AlertDialogTitle className="text-xl font-semibold text-green">
            Registrasi Berhasil!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600 mt-2">
            Registrasi Anda berhasil! Saat ini sedang ditinjau dan tim kami akan
            segera menghubungi!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center mt-4">
          <AlertDialogAction
            onClick={onClose}
            className="bg-green text-white hover:bg-greenHover w-full sm:w-auto min-w-[120px]"
          >
            Tutup
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
