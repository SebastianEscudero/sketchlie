import React, { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

interface FeedbackDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const FeedbackDialog = ({
    isOpen,
    setIsOpen,
}: FeedbackDialogProps) => {
    const [feedbackType, setFeedbackType] = useState("");
    const [feedbackText, setFeedbackText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const templateId = 'template_p883b7d';
    const emailId = "service_vdo9107";
    const publicKey = "tdGS-ea0-bienpHeq";

    useEffect(() => {
        emailjs.init(publicKey);
    }, []);

    const handleSubmit = useCallback(() => {
        setIsSubmitting(true);

        const templateParams = {
            feedback_type: feedbackType,
            feedback_message: feedbackText,
            to_email: "seba.escuderoleiva@gmail.com"
        };

        emailjs.send(emailId, templateId, templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                toast.success("Feedback submitted successfully!");
                setFeedbackType("");
                setFeedbackText("");
                setIsOpen(false);
            }, (error) => {
                console.error("Email error:", error);
                toast.error("There was an error submitting your feedback. Please try again.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }, [feedbackType, feedbackText, setIsOpen, emailId, templateId]);

    const handleTextareaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedbackText(e.target.value);
    }, []);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-full max-w-[80%] md:max-w-[55%] max-h-[85%] xl:max-w-[30%] overflow-y-auto">
                <DialogTitle>Give us your feedback!</DialogTitle>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="feedback-type">Feedback Type</Label>
                        <Select value={feedbackType} onValueChange={setFeedbackType}>
                            <SelectTrigger id="feedback-type">
                                <SelectValue placeholder="Select feedback type" />
                            </SelectTrigger>
                            <SelectContent className="hover:cursor-pointer">
                                <SelectItem value="bug" className="hover:cursor-pointer">Bug Report</SelectItem>
                                <SelectItem value="feature" className="hover:cursor-pointer">Feature Request</SelectItem>
                                <SelectItem value="general" className="hover:cursor-pointer">General Feedback</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="feedback-text">Your Feedback</Label>
                        <Textarea
                            id="feedback-text"
                            placeholder="Tell us what you think..."
                            value={feedbackText}
                            onChange={handleTextareaChange}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button 
                        variant="auth" 
                        onClick={handleSubmit} 
                        disabled={isSubmitting || !feedbackType || !feedbackText}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};