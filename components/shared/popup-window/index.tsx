import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

interface PointDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
}

const PointDialog: React.FC<PointDialogProps> = ({ open, onClose, title, description }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="custom-dialog"
                style={{
                    maxWidth: "400px",
                    margin: "auto",
                    borderRadius: "12px",
                    padding: "20px",
                }}
            >
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <p style={{ marginBottom: "20px" }}>{description}</p>

                <DialogFooter>
                    <button
                        onClick={onClose}
                        className="btn"
                        style={{
                            padding: "10px 20px",
                            borderRadius: "8px",
                            backgroundColor: "#2f2f30",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Close
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default PointDialog;
