// ================================
// MAI MENTOR – AI GIẢ LẬP THÔNG MINH (OFFLINE)
// Phương pháp Socratic – KHÔNG GIẢI NGAY
// ================================

export interface MentorResponse {
  text: string;
  suggestedActions: string[];
}

type Topic =
  | "interest"
  | "installment"
  | "startup"
  | "budget"
  | "unknown";

/**
 * ENTRY POINT – chỉ phân tích câu hỏi học sinh
 */
export function getMentorResponse(prompt: string): MentorResponse {
  const cleanPrompt = prompt.trim();
  const topic = detectTopic(cleanPrompt);

  switch (topic) {
    case "interest":
      return interestFlow(cleanPrompt);
    case "installment":
      return installmentFlow(cleanPrompt);
    case "startup":
      return startupFlow(cleanPrompt);
    case "budget":
      return budgetFlow(cleanPrompt);
    default:
      return genericFlow(cleanPrompt);
  }
}

/* ======================
   1. NHẬN DIỆN CHỦ ĐỀ
====================== */

function detectTopic(text: string): Topic {
  const t = text.toLowerCase();

  if (t.includes("lãi") || t.includes("lãi suất") || t.includes("kép"))
    return "interest";

  if (t.includes("trả góp") || t.includes("vay"))
    return "installment";

  if (t.includes("bán") || t.includes("lợi nhuận") || t.includes("kinh doanh"))
    return "startup";

  if (t.includes("chi tiêu") || t.includes("tiết kiệm"))
    return "budget";

  return "unknown";
}

/* ======================
   2. KỊCH BẢN SƯ PHẠM
   (KHÔNG LẶP – CÓ PHÂN CẤP)
====================== */

/**
 * LÃI SUẤT – LÃI ĐƠN / LÃI KÉP
 */
function interestFlow(prompt: string): MentorResponse {
  // Câu hỏi còn chung chung
  if (prompt.length < 25) {
    return {
      text: `
Chị thấy em mới nhắc tới **lãi suất** thôi 😊  

Vậy mình làm rõ thêm nhé:
❓ Em đang nói tới **gửi tiết kiệm**, **vay tiền**, hay **đầu tư**?

👉 Chọn đúng tình huống thì hướng giải sẽ rất khác.
`,
      suggestedActions: [
        "Gửi tiết kiệm ngân hàng",
        "Vay tiền – trả góp",
        "Đầu tư sinh lời"
      ]
    };
  }

  // Câu hỏi đã cụ thể hơn
  return {
    text: `
Giờ bài toán đã rõ hơn rồi 👍  

Chị hỏi em 3 câu mấu chốt:
1️⃣ Số tiền ban đầu là bao nhiêu?  
2️⃣ Lãi suất tính theo **tháng hay năm**?  
3️⃣ Sau mỗi kỳ, tiền lãi được **rút ra hay nhập vào vốn**?

👉 Trả lời được 3 câu này, em sẽ tự phân biệt được **lãi đơn** hay **lãi kép**.
`,
    suggestedActions: [
      "Xác định vốn ban đầu",
      "Xác định lãi suất",
      "Xác định số kỳ tính lãi"
    ]
  };
}

/**
 * TRẢ GÓP – VAY VỐN
 */
function installmentFlow(_: string): MentorResponse {
  return {
    text: `
Ta chưa cần tính ngay đâu 😊  

Chị muốn em suy nghĩ:
🔹 Khoản tiền vay ban đầu là bao nhiêu?  
🔹 Mỗi kỳ em trả **tiền gốc**, **tiền lãi**, hay **cả hai**?  
🔹 Tổng thời gian vay là bao lâu?

👉 Khi hiểu rõ **dòng tiền ra mỗi kỳ**, bài toán sẽ rất dễ.
`,
    suggestedActions: [
      "Xác định số tiền vay",
      "Xác định lãi suất",
      "Xác định thời gian vay"
    ]
  };
}

/**
 * KHỞI NGHIỆP – LỢI NHUẬN
 */
function startupFlow(_: string): MentorResponse {
  return {
    text: `
Bài toán này gắn với thực tế khởi nghiệp 🌱  

Trước khi tính toán, em hãy:
📌 Liệt kê các **chi phí ban đầu**  
📌 Xác định **giá bán mỗi sản phẩm**  
📌 Tự hỏi: *lợi nhuận = doanh thu – chi phí*, đúng không?

👉 Em liệt kê chi phí trước, chị sẽ cùng em đi tiếp.
`,
    suggestedActions: [
      "Liệt kê chi phí",
      "Xác định giá bán",
      "Tính lợi nhuận"
    ]
  };
}

/**
 * QUẢN LÍ CHI TIÊU – TIẾT KIỆM
 */
function budgetFlow(_: string): MentorResponse {
  return {
    text: `
Quản lí chi tiêu là kỹ năng rất quan trọng 💡  

Chị gợi ý em:
📝 Mỗi tháng em có những **nguồn thu nào**?  
📝 Khoản chi nào là **bắt buộc**, khoản nào có thể giảm?  
📝 Em muốn tiết kiệm bao nhiêu mỗi tháng?

👉 Khi chia được **nhóm chi tiêu**, em đã đi đúng hướng rồi.
`,
    suggestedActions: [
      "Xác định thu nhập",
      "Phân loại chi tiêu",
      "Đặt mục tiêu tiết kiệm"
    ]
  };
}

/**
 * TRƯỜNG HỢP CHUNG – DẪN NHẬP TƯ DUY
 */
function genericFlow(_: string): MentorResponse {
  return {
    text: `
Chị chưa vội giải giúp em đâu nhé 😊  

Trước tiên, em hãy:
🔹 Đọc kỹ đề bài  
🔹 Gạch chân các số liệu quan trọng  
🔹 Tự hỏi: *bài toán đang yêu cầu điều gì?*

👉 Em gửi lại **các dữ kiện chính**, chị sẽ cùng em phân tích tiếp.
`,
    suggestedActions: [
      "Xác định dữ kiện",
      "Xác định yêu cầu bài toán",
      "Chia nhỏ vấn đề"
    ]
  };
}
