import type {
  ApiResponse,
  ClassApplicationFormData,
  ClassApplicationResponse,
  OrderInquiryFormData,
  OrderInquiryResponse,
} from '../types';

const MOCK_DELAY_MS = 700;
const INVALID_PHONE = '010-0000-0000';
const INVALID_FORM_ERROR = '양식을 다시 확인해주세요';

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const generateReceptionNumber = (prefix: 'ORD' | 'CLASS', now: Date): string => {
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const seq = String(Math.floor(Math.random() * 999) + 1).padStart(3, '0');
  return `${prefix}-${yyyy}${mm}${dd}-${seq}`;
};

export const submitOrderInquiry = async (
  data: OrderInquiryFormData
): Promise<ApiResponse<OrderInquiryResponse>> => {
  await delay(MOCK_DELAY_MS);

  if (data.phone === INVALID_PHONE) {
    return { success: false, error: INVALID_FORM_ERROR };
  }

  const now = new Date();
  return {
    success: true,
    data: {
      receptionNumber: generateReceptionNumber('ORD', now),
      submittedAt: now.toISOString(),
    },
  };
};

export const submitClassApplication = async (
  data: ClassApplicationFormData
): Promise<ApiResponse<ClassApplicationResponse>> => {
  await delay(MOCK_DELAY_MS);

  if (data.phone === INVALID_PHONE) {
    return { success: false, error: INVALID_FORM_ERROR };
  }

  const now = new Date();
  return {
    success: true,
    data: {
      receptionNumber: generateReceptionNumber('CLASS', now),
      classId: data.classId,
      submittedAt: now.toISOString(),
    },
  };
};
