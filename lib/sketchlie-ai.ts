import Groq from "groq-sdk";
import { generateCopilotSuggestions, generateFillTextsPrompt, generateLayersPrompt, generateSummaryPrompt } from "./masterPrompt";
import jsPDF from "jspdf";

export async function groqGenerateLayers(userInput: string, userId: string) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: generateLayersPrompt,
            },
            {
                role: "user",
                content: userInput,
            },
        ],
        model: "llama3-8b-8192",
        user: userId,
        stream: false,
        response_format: { type: "json_object" },
    });
}

export async function groqGenerateSummary(selectedLayers: any, title: string, userId: string) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const content = `Selected Layers: ${selectedLayers} Board Title: ${title}`
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: generateSummaryPrompt,
            },
            {
                role: "user",
                content: content,
            },
        ],
        temperature: 0.2,
        model: "llama3-8b-8192",
        user: userId,
        stream: false,
        response_format: { type: "text"},
    });
}

export async function groqFillTexts(selectedLayers: any, title: string, userId: string) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const content = `Selected Layers: ${selectedLayers} Board Title: ${title}`
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: generateFillTextsPrompt,
            },
            {
                role: "user",
                content: content,
            },
        ],
        temperature: 0.2,
        model: "llama3-8b-8192",
        user: userId,
        stream: false,
        response_format: { type: "json_object"},
    });
}

export async function groqSketchlieCopilot(selectedLayers: any, title: string, userId: string) {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const content = `Selected Layers: ${selectedLayers} Board Title: ${title}`
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: generateCopilotSuggestions,
            },
            {
                role: "user",
                content: content,
            },
        ],
        temperature: 0.2,
        model: "llama3-8b-8192",
        user: userId,
        stream: false,
        response_format: { type: "json_object"},
    });
}

export const downloadTextAsPdf = (text: string, title: string) => {

    const doc = new jsPDF();
    const lines = text.split('\n');
    let y = 10;

    for (const line of lines) {
        if (y > 280) { // if y exceeds 280 points, add a new page
            doc.addPage();
            y = 10; // reset y to the top of the new page
        }

        let processedLine;
        let headerMultiplier = 5;
        let multiplier = 8;
        let mainHeaderMultiplier = 12;
        if (line.includes('**')) {
            const boldParts = line.split('**');
            for (let i = 0; i < boldParts.length; i++) {
                doc.setFont('helvetica', i % 2 === 0 ? 'normal' : 'bold');
                const splitLine = doc.splitTextToSize(boldParts[i], 180);
                doc.text(splitLine, 10, y);
                y += multiplier * splitLine.length;
            }
        } else if (line.startsWith('* ') || line.startsWith('+ ')) {
            doc.setFont('helvetica', 'normal');
            processedLine = `• ${line.slice(2)}`;
            const splitLine = doc.splitTextToSize(processedLine, 180);
            doc.text(splitLine, 10, y);
            y += multiplier * splitLine.length;
        } else if (line.startsWith('# ')) {
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            processedLine = line.slice(2);
            const splitLine = doc.splitTextToSize(processedLine, 180);
            doc.text(splitLine, 10, y);
            y += mainHeaderMultiplier * splitLine.length;
            doc.setFontSize(12); // reset font size
        } else if (line.startsWith('## ')) {
            doc.setFontSize(16);
            doc.setFont('helvetica', 'bold');
            processedLine = line.slice(3);
            const splitLine = doc.splitTextToSize(processedLine, 180);
            doc.text(splitLine, 10, y);
            y += headerMultiplier * splitLine.length;
            doc.setFontSize(12); // reset font size
        } else if (line.startsWith('### ')) {
            doc.setFontSize(14);
            doc.setFont('helvetica', 'bold');
            processedLine = line.slice(4);
            const splitLine = doc.splitTextToSize(processedLine, 180);
            doc.text(splitLine, 10, y);
            y += 12 * splitLine.length;
            doc.setFontSize(12); // reset font size
        } else {
            doc.setFont('helvetica', 'normal');
            processedLine = line;
            const splitLine = doc.splitTextToSize(processedLine, 180);
            doc.text(splitLine, 10, y);
            y += headerMultiplier * splitLine.length;
        }
    }

    doc.save(`${title}.pdf`);
}