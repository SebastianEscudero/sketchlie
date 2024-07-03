import { currentUser } from "@/lib/auth";
import { groqFillTexts, groqGenerateLayers, groqGenerateSummary } from "@/lib/sketchlie-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        const userId = user?.id;

        if (!userId || !user) {
            return new NextResponse("Unauthorized no log in", {status: 401})
        }

        const body = await req.json();

        // generate layers 
        if (body.type === "generation") {
            const userInput = body.inputValue;
            const chatCompletion = await groqGenerateLayers(userInput, userId);
            return new NextResponse(chatCompletion.choices[0]?.message?.content || "", {status: 200});  

        // generate summary
        } else if (body.type === "summary") {
            const selectedLayers = body.selectedLayers;
            const title = body.title;
            const chatCompletion = await groqGenerateSummary(selectedLayers, title, userId);
            return new NextResponse(chatCompletion.choices[0]?.message?.content || "", {status: 200});

        // fill texts
        } else if (body.type === "fillTexts") {
            const selectedLayers = body.selectedLayers;
            const title = body.title;
            const chatCompletion = await groqFillTexts(selectedLayers, title, userId);
            return new NextResponse(chatCompletion.choices[0]?.message?.content || "", {status: 200});
        } else {
            return new NextResponse("Invalid type", {status: 400});
        }

    } catch (error) {
        console.log("[Sketchlie AI Error]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}