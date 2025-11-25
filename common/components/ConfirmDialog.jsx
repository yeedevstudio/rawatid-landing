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
  validate,
}) {
  const [open, setOpen] = React.useState(false);

  const handleTriggerClick = (e) => {
    if (disable) {
      e.preventDefault();
      return;
    }
    
    if (validate) {
      const isValid = validate();
      if (!isValid) {
        e.preventDefault();
        return;
      }
    }
    
    setOpen(true);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div
        onClick={handleTriggerClick}
        className={cn(
          "bg-green hover:bg-greenHover text-white w-[35%] lg:w-[14%] h-[2.5rem] rounded-lg text-lg transition-all duration-300 ease-in-out flex items-center justify-center cursor-pointer",
          disable && "opacity-50 cursor-not-allowed pointer-events-none"
        )}
      >
        {loading ? "Loading..." : label}
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah data Anda sudah benar?</AlertDialogTitle>
          <AlertDialogDescription>
            Tim Rawat.ID akan menghubungi Anda berdasarkan kontak dilampirkan.
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
