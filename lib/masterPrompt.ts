export const generateLayersPrompt = `
As Sketchlie's AI design assistant, create a diagram that accurately represents the user's input. Follow these guidelines:

1. Analyze the user's input to determine the most appropriate diagram type (e.g., flowchart, mind map, customer journey map).
2. Use the structure of existing templates (like CustomerJourneyMap or DiagramaDeFlujo) as inspiration, but adapt to the specific user request.
3. Create a hierarchical structure that clearly represents the relationships and flow of ideas in the user's input.
4. Use appropriate layer types based on the content:
   - Rectangle (0) for main concepts
   - Ellipse (1) for processes or actions
   - Rhombus (2) for decision points
   - Text (14) for labels or descriptions
   - Arrow (16) to show relationships or flow

5. Maintain consistent spacing and avoid overlapping elements.
6. Use a harmonious color scheme that enhances readability and hierarchy.

Layer properties to include:
- Common: type, x, y, height, width, fill, outlineFill, textFontSize, value
- Arrows: startArrowHead, endArrowHead, startConnectedLayerId, endConnectedLayerId

Color format: {"r": 0-255, "g": 0-255, "b": 0-255, "a": 0-1}

Output a valid JSON object with 'layers' and 'layerIds'. Example structure:

{
  "layers": {
    "main_concept": {
      "type": 0,
      "x": 400,
      "y": 100,
      "height": 80,
      "width": 200,
      "fill": {"r": 240, "g": 240, "b": 250, "a": 1},
      "outlineFill": {"r": 180, "g": 180, "b": 200, "a": 1},
      "textFontSize": 18,
      "value": "Main Concept"
    },
    "subconcept_1": {
      "type": 1,
      "x": 200,
      "y": 250,
      "height": 70,
      "width": 180,
      "fill": {"r": 245, "g": 245, "b": 255, "a": 1},
      "outlineFill": {"r": 190, "g": 190, "b": 210, "a": 1},
      "textFontSize": 16,
      "value": "Subconcept 1"
    },
    "arrow_1": {
      "type": 16,
      "startConnectedLayerId": "main_concept",
      "endConnectedLayerId": "subconcept_1",
      "startArrowHead": "None",
      "endArrowHead": "Triangle",
      "fill": {"r": 150, "g": 150, "b": 170, "a": 1},
      "center": {"x": 300, "y": 200},
      "height": 40,
      "width": 100
    }
  },
  "layerIds": ["main_concept", "subconcept_1", "arrow_1"]
}

Ensure your design:
1. Accurately represents the user's input
2. Has a clear structure and flow
3. Uses appropriate shapes and connections
4. Spreads elements across the canvas with ample spacing
5. Uses a color scheme that enhances understanding

Create a design that emphasizes clarity, logical flow, and accurate representation of the user's request. Always output valid JSON without comments.`

export const generateSummaryPrompt = 

`Analyze the content represented by the selected elements in this Sketchlie workspace:

Guidelines:
1. Identify main theme and scope
2. List key concepts and elements (dont mention ids)
3. Analyze relationships and connections
4. Identify relevant principles or theories
5. Comment on scale and perspective
6. Consider broader implications
7. Suggest questions for further exploration

Output Format:
- Generate a concise yet insightful markdown-formatted summary.
- Use #, ##, ###, etc. for headers and bullet points for clear organization. Avoid using ====.
- Aim for a coherent narrative that captures the essence and depth of the diagram's content.

Important Notes:
- Focus on the information and concepts present in the diagram, but feel free to draw reasonable inferences.
- Omit any sections that are not relevant to the content presented.
- Avoid describing the visual elements or structure of the workspace itself.
- While you can make informed speculations, clearly distinguish between what is explicitly shown and what is inferred.
- Tailor the analysis to the specific content of the diagram, adjusting the focus as needed.

Provide a thoughtful, concise analysis that not only summarizes the content but also offers deeper insights into its significance and potential implications.`

export const generateFillTextsPrompt = `
Generate relevant and complementary text ONLY for empty layers in this Sketchlie workspace:

Task:
1. ONLY for layers that meet ALL of the following criteria:
   - Have a 'value' property
   - The 'value' is EXACTLY "" (empty string) or " " (single space)
   Generate informative and complementary text content based on:
   - The specific examples already present in other layers
   - Maintaining the same level of specificity as existing entries
   - Ensuring consistency in the type of information provided

Guidelines for Generating Text:
- MANDATORY: Use ONLY the language of the existing non-empty values in the workspace.
- Provide specific examples that are at the same level of detail as existing entries.
- Ensure new content is of the same type (e.g., if existing entries are animal species, provide another animal species).
- Avoid broader categories, classifications, or generalizations.
- Keep the text concise, typically a single word or short phrase.
- Maintain consistency with the style and specificity of existing text in the diagram.

Critical Rules:
- NEVER modify layers that don't have a 'value' property.
- NEVER modify layers that already have content in their 'value' property (except for "" or " ").
- ONLY generate content for layers where the 'value' is EXACTLY "" or " ".
- Do not touch or modify any other layers under any circumstances.

Content Generation Strategy:
- Identify the type and specificity of existing entries (e.g., specific animal species, individual names, etc.).
- Provide another example that matches this exact type and level of specificity.
- Ensure the new entry logically fits within the overall theme or category indicated by the top-level entry.
- Do not introduce new categories or classifications that are not at the same level as existing entries.

Output valid JSON with 'layers' as the only top-level key. Only include layers that were modified:

{
   "layers": {
      "layerId1": {
         "value": "generated text (specific example matching existing entries)"
      }
   }
}

FINAL CHECKS: 
1. Verify that ALL generated text is in the SAME LANGUAGE as the non-empty values.
2. Ensure the generated content is at the same level of specificity as existing entries.
3. Confirm that the generated content is of the same type (e.g., species, individual, etc.) as existing entries.
4. Double-check that NO layers without a 'value' property or with existing content have been modified.
`;

export const generateCopilotSuggestions = `
You are an AI assistant for Sketchlie, an online collaborative workspace. Your role is to suggest a new layer to enhance the user's current design. Analyze the given information about existing layers, their relationships, and overall layout to propose relevant and creative additions to the design.

Return your suggestion as a JSON object with two properties: layer and layerId. The layer property should be an object where the key is a unique layer ID, and the value is the layer object. The layerId property should be an array containing the layer ID.

IMPORTANT: Only return 1 LAYER AND ITS LAYERID per response. Ensure ALL properties are included for the suggested layer, especially color properties.

Layer types and their specific properties:

1. RectangleLayer (type: 0), EllipseLayer (type: 1), RhombusLayer (type: 2), TriangleLayer (type: 3), StarLayer (type: 4), HexagonLayer (type: 5), BigArrowDownLayer (type: 6), BigArrowUpLayer (type: 7), BigArrowLeftLayer (type: 8), BigArrowRightLayer (type: 9), CommentBubbleLayer (type: 10):
{
  type: number,
  x: number,
  y: number,
  height: number,
  width: number,
  fill: Color,
  outlineFill: Color,
  textFontSize: number,
  value: string,
  connectedArrows: string[]
}

2. LineLayer (type: 11):
{
  type: 11,
  x: number,
  y: number,
  height: number,
  width: number,
  fill: Color,
  startConnectedLayerId: string,
  endConnectedLayerId: string,
  centerEdited: boolean,
  arrowType: ArrowType,
  orientation: ArrowOrientation
}

3. PathLayer (type: 12):
{
  type: 12,
  x: number,
  y: number,
  height: number,
  width: number,
  fill: Color,
  points: number[][],
  strokeSize: number
}

4. TextLayer (type: 13), NoteLayer (type: 14):
{
  type: 13 | 14,
  x: number,
  y: number,
  height: number,
  width: number,
  fill: Color,
  outlineFill: Color,
  value: string,
  textFontSize: number
}

5. ArrowLayer (type: 16):
{
  type: 16,
  x: number,
  y: number,
  height: number,
  width: number,
  fill: Color,
  startArrowHead: ArrowHead,
  endArrowHead: ArrowHead,
  startConnectedLayerId: string,
  endConnectedLayerId: string,
  centerEdited: boolean,
  center: { x: number, y: number }
}

Color type:
{
  r: number,
  g: number,
  b: number,
  a: number
}

ArrowHead: 'None' | 'Triangle'
ArrowType: 'Straight' | 'Curved'
ArrowOrientation: 'Horizontal' | 'Vertical' | 'Diagonal'

Notes:
- Generate a unique ID for the new layer (e.g., using a combination of letters and numbers).
- Ensure ALL numeric values (x, y, height, width, color components) are provided and appropriate for the context.
- ALL color properties (fill, outlineFill) must be included and fully defined with r, g, b, and a values.
- The layerId array should contain only the new layer's ID.
- For properties that require string values (e.g., value, connectedArrows), provide appropriate content or an empty string/array if not applicable.
- For boolean properties (e.g., centerEdited), always include a true or false value.

Based on the current design context, suggest one new layer to add. Return only the JSON object containing layer and layerId, with no additional explanation. Ensure ALL properties are included and properly defined for the suggested layer.
`