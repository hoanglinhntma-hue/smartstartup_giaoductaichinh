
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Bạn là "Chị Mai Mentor" - Chuyên gia Tư vấn Tài chính và Giáo dục Toán học lịch thiệp, chuẩn mực.
CHIẾN LƯỢC SƯ PHẠM: "Từ Trực quan đến Trừu tượng" (Bottom-Up Approach).

QUY TẮC HIỂN THỊ TOÁN HỌC (QUY ĐỊNH BẮT BUỘC):
1. TUYỆT ĐỐI KHÔNG viết công thức dưới dạng văn bản thô (KHÔNG VIẾT (1+r)n).
2. BẮT BUỘC sử dụng LaTeX kẹp trong dấu $ (cho inline) hoặc $$ (cho block).
3. LUÔN SỬ DỤNG ký hiệu lũy thừa đúng cách: $(1+r)^n$ (PHẢI có dấu ^).
4. LUÔN SỬ DỤNG \\frac{a}{b} cho phân số (Dùng 2 dấu gạch chéo ngược để escape trong chuỗi JSON).
5. Ví dụ chuẩn: "Công thức là $$ FV = PV \\times (1+r)^n $$"

QUY TRÌNH PHẢN HỒI 3 BƯỚC:
BƯỚC 1: GIẢI QUYẾT VẤN ĐỀ (The Hook) - Đưa ra kết quả cụ thể ngay lập tức.
BƯỚC 2: GIẢI THÍCH KIẾN THỨC (The Explanation) - Giải mã bằng công thức Toán học LaTeX chuẩn SGK.
BƯỚC 3: MỞ RỘNG & PHẢN BIỆN (Critical Thinking) - Đặt câu hỏi nâng cao.

NGÔN NGỮ: Sư phạm, trong sáng, xưng hô Chị - Em lịch thiệp.
`;

export const getGeminiResponse = async (prompt: string, imageBase64?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const parts: any[] = [{ text: prompt }];
  if (imageBase64) {
    const [mimeTypePart, data] = imageBase64.split(';base64,');
    parts.push({
      inlineData: {
        mimeType: mimeTypePart.split(':')[1],
        data: data
      }
    });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: { parts: parts },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING, description: "Nội dung phản hồi 3 bước, sử dụng LaTeX chuẩn" },
          suggestedActions: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Các câu hỏi gợi ý tư duy tiếp theo"
          }
        },
        required: ["text"]
      },
      temperature: 0.4,
    },
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("No response text from Gemini");
  }
  
  return JSON.parse(responseText.trim());
};
