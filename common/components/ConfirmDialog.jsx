import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

export default function ConfirmDialog({
  disable,
  label,
  handleSubmit,
  loading,
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "bg-green hover:bg-greenHover text-white w-[35%] lg:w-[14%] h-[2.5rem] rounded-lg text-lg transition-all duration-300 ease-in-out",
          disable && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? "Loading..." : label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin ingin daftar sekarang?</AlertDialogTitle>
          <AlertDialogDescription>
            Tenang, data kamu aman di Rawat.ID
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" border-red-200 text-red-200 hover:bg-red-50 hover:text-red-200 transition-all duration-300 ease-in-out">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            className="bg-green text-white hover:bg-greenHover transition-all duration-300 ease-in-out"
          >
            Daftar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
