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
          "bg-green text-white w-[35%] lg:w-[14%] h-[2.5rem] rounded-lg text-lg",
          disable && "opacity-50 cursor-not-allowed"
        )}
      >
        {loading ? "Loading..." : label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apa kamu yakin akan mendaftar?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className=" border-red-200 text-red-200 hover:bg-white hover:text-red-200">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            className="bg-green text-white hover:bg-green"
          >
            Daftar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
